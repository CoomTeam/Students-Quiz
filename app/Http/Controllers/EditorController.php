<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Result;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EditorController extends Controller
{
    public function index() {
		$questions = Question::all();
		return view('voyager/editor', ['questions' => $questions]);
	}

	public function getAllQuestions() {
		$questions = Question::select('id', 'text', 'order')->orderBy('order')->get();
		return $questions;
	}

	public function getQuestion() {
		$id = request('id');
		$question = Question::where('id', $id)->with('answers' , 'answers.results:id,name')->first();
		$formatted = [
			'text' => $question->text,
			'id' => $question->id,
			'order' => $question->order,
			'answers' => []
		];

		foreach ($question->answers as $answer) {
			$formatted['answers'][] = [
				'id' => $answer->id,
				'text' => $answer->text,
			];
		}

		// foreach ($question->answers as $answer) {
		// 	$coefs = [];

		// 	foreach ($answer->results as $result) {
		// 		$coefs[] = [
		// 			'value' => $result->pivot->coefficient,
		// 			'name' => $result->name,
		// 			'id' => $result->id,
		// 		];
		// 	}

		// 	$formatted['answers'][] = [
		// 		'id' => $answer->id,
		// 		'text' => $answer->text,
		// 		'coefs' => $coefs,
		// 	];
		// }

		return $formatted;
	}

	public function getAnswer() {

		$id = request('id');
		$answer = Answer::where('id', $id)->with('results:id,name')->first();

		$formatted = [
			'id' => $answer->id,
			'text' => $answer->text,
			'coefs' => [],
		];

		$coefs = [];

		foreach ($answer->results as $result) {
			$coefs[] = [
				'value' => $result->pivot->coefficient,
				'name' => $result->name,
				'id' => $result->id,
			];
		}

		$formatted['coefs'] = $coefs;

		return $formatted;
	}

	public function newQuestion() {
		$order = Question::count();
		$question = new Question;
		$question->text = "New question?";
		$question->order = $order;
		$question->save();
		$id = $question->id;
		return ['id' => $question->id];
	}

	public function newAnswer() {
		$id = request('id');

		$question = Question::where('id', $id)->with('answers' , 'answers.results:id,name')->first();
		$answer = new Answer;
		$answer->text = "";
		$question->answers()->save($answer);

		$results = Result::all();
        foreach ($results as $result) {
			$answer->results()->attach($result, ['coefficient' => 1]);
		}

		return ['id' => $answer->id];
	}

	public function save() {

		// (1) Save question
		$question_id = request('question_id');
		$question_text = request('question_text', '');

		$question = Question::find($question_id);
		$question->text = $question_text;
		$question->save();

		// Stop if not with answer
		$with_answer = request('with_answer', false);
		if (!$with_answer) {
			return $this->msg('Only question saved');
		}

		// (2) Save answer
		$answer_id = request('answer_id');
		$answer_text = request('answer_text', '');

		$answer = Answer::find($answer_id);
		$answer->text = $answer_text;
		$answer->save();

		// (3) Save coefficients
		$answer_coefs = request('answer_coefs');
		foreach($answer->results as $result) {
			if (!array_key_exists($result->id, $answer_coefs)) $this->msg('allo garazh');; // error
			$result->pivot->coefficient = $answer_coefs[$result->id];
			$result->pivot->save();
		}

		return $this->msg('All saved');

	}

	private function msg($text) {
		return ['msg' => $text];
	}

	public function saveAnswer() {
		$edited = request('answer');

		$answer = Answer::where('id', $edited['id'])->with('results')->first();
		$answer->text = $edited['text']; // cant be null ""

		$coefs = [];

		foreach($edited['coefs'] as $coef) {
			$coefs[$coef['id']] = $coef['value'];
		}

		foreach($answer->results as $result) {
			$result->pivot->coefficient = $coefs[$result->id];
			$result->pivot->save();
		}

		$answer->save();

		return [];
	}

	public function saveQuestion() {
		$edited = request('question');

		$question = Question::find($edited['id']);
		$question->text = $edited['text'];
		$question->save();

		return [];
	}

	public function deleteAnswer() {
		$id = request('id');

		$answer = Answer::find($id);
		$answer->delete();

		return [];
	}

	public function deleteQuestion() {
		$id = request('id');

		$question = Question::find($id);
		$deletedOrder = $question->order;
		$question->delete();

		$questions = Question::all('order', 'id');

		foreach ($questions as $question) {
			if ($question->order > $deletedOrder) {
				$question->order = $question->order - 1;
				$question->save();
			}
		}

		return [];
	}

	public function export() {
		$questions = Question::with('answers', 'answers.results:id')->get();
		$results = Result::all();
		$json = [
			'questions' => $questions,
			'results' => $results,
		];

		$json = json_encode($json);

		return view('voyager.export', ['json' => $json]);

	}

	public function import() {
		$quiz = request('quiz');

		Result::all()->each(function ($one) {
			$one->delete();
		});

		Answer::all()->each(function ($one) {
			$one->delete();
		});

		Question::all()->each(function ($one) {
			$one->delete();
		});

		// Import results
		foreach ($quiz['results'] as $result) {
			$this->importResult($result);
		}

		// Import questions PLUS answers PLUS coefficients
		foreach ($quiz['questions'] as $question) {
			$this->importQuestion($question);

			foreach ($question['answers'] as $answer) {
				$this->importAnswer($answer);
			}
		}

		if (env('DB_CONNECTION') === 'pgsql') {
			$lastAnswer = Answer::orderBy('id','desc')->first();
			DB::statement('alter sequence answers_id_seq restart with '.(intval($lastAnswer->id)+1));

			$lastQuestion = Question::orderBy('id','desc')->first();
			DB::statement('alter sequence questions_id_seq restart with '.(intval($lastQuestion->id)+1));

			$lastResult = Result::orderBy('id','desc')->first();
			DB::statement('alter sequence results_id_seq restart with '.(intval($lastResult->id)+1));
		}

		return [];
	}

	private function importResult($result) {
		$new = new Result;
		$new->id = $result['id'];
		$new->name = $result['name'];
		$new->description = $result['description'];
		$new->url = $result['url'];
		$new->created_at = $result['created_at'];
		$new->updated_at = $result['updated_at'];
		$new->save();
	}

	private function importQuestion($question) {
		$new = new Question;
		$new->id = $question['id'];
		$new->text = $question['text'];
		$new->order = $question['order'];
		$new->created_at = $question['created_at'];
		$new->updated_at = $question['updated_at'];
		$new->save();
	}

	private function importAnswer($answer) {
		$ans = new Answer;
		$ans->id = $answer['id'];
		$ans->text = $answer['text'];
		$ans->question_id = $answer['question_id'];
		$ans->created_at = $answer['created_at'];
		$ans->updated_at = $answer['updated_at'];
		$ans->save();

		// Coefficients
		foreach($answer['results'] as $result) {
			$ans->results()->attach(
				$result['pivot']['result_id'],
				['coefficient' => $result['pivot']['coefficient']],
			);
		}

	}

	function indexImport() {
		return view('voyager.import');
	}

	function test() {
		return [];
	}

}

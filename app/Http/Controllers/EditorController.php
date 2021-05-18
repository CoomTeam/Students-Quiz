<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Result;

class EditorController extends Controller
{
    public function index() {
		$questions = Question::all();
		return view('editor', ['questions' => $questions]);
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
			$coefs = [];

			foreach ($answer->results as $result) {
				$coefs[] = [
					'value' => $result->pivot->coefficient,
					'name' => $result->name,
					'id' => $result->id,
				];
			}

			$formatted['answers'][] = [
				'id' => $answer->id,
				'text' => $answer->text,
				'coefs' => $coefs,
			];
		}
		// lazy loading is not so bad
		// foreach($question->answers as $answer) {
		// 	foreach($answer->results as $result) {
		// 		$result->coef = $result->pivot->coefficient;
		// 	}
		// }



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

		return [];
	}

	public function saveAnswer() {
		$edited = request('answer');

		$answer = Answer::where('id', $edited['id'])->with('results')->first();
		$answer->text = $edited['text'];

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

		$questions = Question::all('order');

		foreach ($questions as $question) {
			if ($question->order > $deletedOrder) {
				$question->order--;
				$question->order->save();
			}
		}

		return [];
	}

}

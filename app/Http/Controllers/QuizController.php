<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Result;

// Controls the quiz: getting the quiz page, the question, the result, submitting answer, going back, restarting.
class QuizController extends Controller
{
    // Gives a page of quiz - an empty page without questions or results -> those are loaded by a separate request
    public function index(Request $request) {
        // If there is no session for the quiz play, then set it
        // And thus begins the quiz
        if ( is_null(session('on_question')) ) {
            $this->resetQuizSession();
        }

        // This page has a JS script with client-side quiz logic
        return view('quiz');
    }

    // Returns current question or result
    public function current() {
        $onQuestion = session('on_question');
        $totalQuestions = Question::count();

        // Return result if answered all (note: first onQuestion was zero, so ===)
        if ($onQuestion === $totalQuestions) {
            $answerIDs = session('answers');
            return $this->generateResultResponse($answerIDs);
        }

        // Return question if there are questions left to answer
        if ($onQuestion < $totalQuestions) {
            return $this->generateQuestionResponse($onQuestion);
        }

        // this should never happen
        $this->resetQuizSession();
		return $this->generateQuestionResponse(0);
    }

    // Submits the answer, then same as `current`
    public function answer(Request $request) {
        $onQuestion = session('on_question');
        $answerID = request('answer');

        // Check if user answer is valid, and it is of the current question
        $answer = Answer::findOrFail($answerID); // should be try/catch
        if ($answer->question->order !== $onQuestion) {
            // error
            dd('answer error ' . $answerID);
        }

        $request->session()->push('answers', $answerID);
        $request->session()->increment('on_question', 1);

        return $this->current();
    }

    // Unsibmits last answer, then same as `current`
    public function back() {

        $onQuestion = session('on_question');
        if ($onQuestion === 0) {
            // error on client side actually
            return $this->current();
        }

        $onQuestion--;
        session([ 'on_question' => $onQuestion ]);

        $answers = session('answers');
        array_pop($answers);
        session([ 'answers' => $answers ]);


        return $this->current();
    }

    // Starts quiz from beginning, then same as `current`
    public function restart() {
        $this->resetQuizSession();
        return $this->current();
    }

    private function generateQuestionResponse($onQuestion) {
        return [
            'type' => 'question',
            'content' => $this->buildQuestion($onQuestion),
        ];
    }

    private function generateResultResponse($answerIDs) {
        return [
            'type' => 'result',
            'content' => $this->buildResult($answerIDs),
        ];
    }

    // Based on the question order, created JSON of that question
    private function buildQuestion($order) {
        $question = Question::where('order', $order)->with('answers')->first();

        $buildedAnswers = [];
        foreach($question->answers as $answer) {
            $buildedAnswers[] = [
                'text' => $answer->text,
                'id' => $answer->id,
            ];
        }

        $buildedQuestion = [
            'text' => $question->text,
            'order' => $question->order,
            'answers' => $buildedAnswers,
        ];

        return $buildedQuestion;
    }

    // Based on the answers, calculates most appropriate result and creates JSON of it
    private function buildResult($answerIDs) {
        $answers = Answer::find($answerIDs);

        $results = [];

        foreach($answers as $answer) {
            foreach($answer->results as $result) {
                if (!array_key_exists($result->id, $results)) {
                    $results[$result->id] = 0;
                }
                $results[$result->id] += $result->pivot->coefficient;
            }
        }

        $max = max($results);
        $id = array_search($max, $results); // can be improved
        $result = Result::find($id);

        $buildedResult = [
            'name' => $result->name,
            'description' => $result->description,
        ];

        return $buildedResult;
    }

    // A session data to start the quiz with
    private function resetQuizSession() {
        session([ 'on_question' => 0 ]);
        session([ 'answers' => [] ]);
    }
}

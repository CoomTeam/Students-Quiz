<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Result;

class QuizController extends Controller
{
    public function index(Request $request) {
        // If quiz is runned first time, set the session
        if ( is_null(session('on_question')) ) {
            echo
            $this->resetQuizSession();
        }

        return view('quiz');
    }

    public function answer(Request $request) {
        $onQuestion = session('on_question');
        $answerID = request('answer');

        $answer = Answer::find($answerID);
        if ($answer->question->order !== $onQuestion) {
            // error, user submited the answer not of his question
            $this->resetQuizSession();
            return $this->current();
        }
    
        $request->session()->push('answers', $answerID);
        $request->session()->increment('on_question', 1);

        return $this->current();
    }

    public function current() {
        $onQuestion = session('on_question');
        $totalQuestions = Question::count();

        if ($onQuestion === $totalQuestions) {
            $answerIDs = session('answers');
            return $this->generateResultResponse($answerIDs);
        }

        if ($onQuestion < $totalQuestions) {
            return $this->generateQuestionResponse($onQuestion);
        }

        dd('error onQ>tQ', $onQuestion, $totalQuestions);
    }

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
        ];
    
        return $buildedResult;
    }

    private function resetQuizSession() {
        session([ 'on_question' => 0 ]);
        session([ 'answers' => [] ]);
    }
}

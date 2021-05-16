<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class EditorController extends Controller
{
    public function index() {
		$questions = Question::all();
		return view('editor', ['questions' => $questions]);
	}

	public function getAllQuestions() {
		$questions = Question::select('id', 'text')->get();
		return $questions;
	}

	public function getQuestion() {
		$id = request('id');
		$question = Question::where('id', $id)->with('answers')->first();

		return $question;
	}
}

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
}

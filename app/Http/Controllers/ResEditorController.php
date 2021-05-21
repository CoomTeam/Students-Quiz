<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Result;

class ResEditorController extends Controller
{
    public function index() {
		return view('results');
	}

	public function getAllResults() {
		$results = Result::select('id', 'name')->get();
		return $results;
	}

	public function getResult() {
		$id = request('id');
		$result = Result::find($id);

        return $result;
	}
 
	public function newResult() {
		$result = new Result;
		$result->name = "Pokemon";
		$result->description = 'The little yellow dude';
		$result->save();

        $answers = Answer::all();
        foreach ($answers as $answer) {
			$result->answers()->attach($answer, ['coefficient' => 1]);
		}

		return ['id' => $result->id];
	}

	public function saveResult() {
		$id = request('id');
		$name = request('name');
		$desc = request('description');

		$result = Result::find($id);
		$result->name = $name;
        $result->description = $desc;
		$result->save();

		return [];
	}

	public function deleteResult() {
		$id = request('id');

		$result = Result::find($id);
		$result->delete();

		return [];
	}
}

<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Result;

class ResEditorController extends Controller
{
	/**
	 * Return view page
	 */
    public function index() {
		return view('voyager/results');
	}


	/**
	 * Used for the results list
	 */
	public function getAllResults() {
		$results = Result::select('id', 'name')->get();
		return $results;
	}

	/**
	 * Used for rendering the selected result
	 */
	public function getResult() {
		$id = request('id');
		$result = Result::find($id);

        return $result;
	}

	/**
	 * Created new result and pops it back to the client
	 */
	public function newResult() {
		$result = new Result;
		$result->name = "Pokemon";
		$result->description = 'The little yellow dude';
		$result->url= 'Sample';
		$result->save();

        $answers = Answer::all();
        foreach ($answers as $answer) {
			$result->answers()->attach($answer, ['coefficient' => 1]);
		}

		return ['id' => $result->id];
	}

	/**
	 * Updates the result
	 */
	public function saveResult() {
		$id = request('id');
		$name = request('name');
		$desc = request('description');
		$url = request('url');

		// dd(request('url'));

		$result = Result::find($id);
		$result->name = $name;
        $result->description = $desc;
		$result->url = $url;
		$result->save();

		return [];
	}

	/**
	 * Delete the result
	 */
	public function deleteResult() {
		$id = request('id');

		$result = Result::find($id);
		$result->delete();

		return [];
	}
}

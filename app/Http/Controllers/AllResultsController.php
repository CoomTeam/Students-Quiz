<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;

class AllResultsController extends Controller
{
    public function index() {
        $results = Result::select('id', 'name', 'description', 'url')->get();
        return view('allresults', ['results' => $results]);
    }
}

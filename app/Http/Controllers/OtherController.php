<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;

class OtherController extends Controller
{
    public function allResults() {
        $results = Result::select('id', 'name', 'description', 'url')->get();
        return view('allresults', ['results' => $results]);
    }
}

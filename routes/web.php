<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AllResultsController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\TypesController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\ResEditorController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Home page
Route::get('/', function () {
  return view('home');
});

// Result prototype -> THINK WHAT TO DO
Route::get('/result', function () {
  return view('result');
});

// All result page
Route::get('/all-results', [AllResultsController::class, 'index']);


/******** QUIZ ********/

// Gives a page of quiz - an empty page without questions or results -> those are loaded by a separate request
Route::get('/quiz', [QuizController::class, 'index']);
// Returns current question or result
Route::post('/quiz/current', [QuizController::class, 'current']);
// Submits the answer, then same as `current`
Route::post('/quiz/answer', [QuizController::class, 'answer']);
// Unsibmits last answer, then same as `current`
Route::post('/quiz/back', [QuizController::class, 'back']);
// Starts quiz from beginning, then same as `current`
Route::post('/quiz/restart', [QuizController::class, 'restart']);


/******** SESSION ********/

// Gives a dump of your session
Route::get('/ses', function (Request $request) {
  return $request->session()->all();
});

// Clears your session, redirects to /ses (to see a clear dump)
Route::get('/delses', function (Request $request) {
  $request->session()->invalidate();
  return redirect('/ses');
});

/******** Cookies ********/

Route::get('/cookies', function () {
	return view('cookies');
});

Route::group(['prefix' => 'quiz-panel'], function () {
	Route::group(['prefix' => 'admin'], function () {
		Voyager::routes();

		/******** EDITOR ********/
		Route::post('/quiz-editor/getAllQuestions', [EditorController::class, 'getAllQuestions'])->middleware('admin.user');
		Route::post('/quiz-editor/getQuestion', [EditorController::class, 'getQuestion'])->middleware('admin.user');
		Route::post('/quiz-editor/getAnswer', [EditorController::class, 'getAnswer'])->middleware('admin.user');
		Route::post('/quiz-editor/newQuestion', [EditorController::class, 'newQuestion'])->middleware('admin.user');
		Route::post('/quiz-editor/newAnswer', [EditorController::class, 'newAnswer'])->middleware('admin.user');
		Route::post('/quiz-editor/save', [EditorController::class, 'save'])->middleware('admin.user');
		Route::post('/quiz-editor/deleteAnswer', [EditorController::class, 'deleteAnswer'])->middleware('admin.user');
		Route::post('/quiz-editor/deleteQuestion', [EditorController::class, 'deleteQuestion'])->middleware('admin.user');
		Route::get('/quiz-editor/export', [EditorController::class, 'export'])->middleware('admin.user');
		Route::post('/quiz-editor/import', [EditorController::class, 'import'])->middleware('admin.user');
		Route::get('/quiz-editor/import', [EditorController::class, 'indexImport'])->middleware('admin.user');
		Route::get('/quiz-editor', [EditorController::class, 'index'])->middleware('admin.user');

		/******** Result Editor ********/
		Route::post('/results-editor/getAllResults', [ResEditorController::class, 'getAllResults'])->middleware('admin.user');
		Route::post('/results-editor/getResult', [ResEditorController::class, 'getResult'])->middleware('admin.user');
		Route::post('/results-editor/newResult', [ResEditorController::class, 'newResult'])->middleware('admin.user');
		Route::post('/results-editor/saveResult', [ResEditorController::class, 'saveResult'])->middleware('admin.user');
		Route::post('/results-editor/deleteResult', [ResEditorController::class, 'deleteResult'])->middleware('admin.user');
		Route::get('/results-editor', [ResEditorController::class, 'index'])->middleware('admin.user');
	});
});


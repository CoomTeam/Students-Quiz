<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OtherController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\ResEditorController;



// Home page
Route::view('/', 'home');

// Cookies page
Route::view('/cookies', 'cookies');

// All result page
Route::get('/all-results', [OtherController::class, 'allResults']);

// Quiz
Route::prefix('quiz')->group(function() {
	Route::get('/', [QuizController::class, 'index']);
	Route::post('/current', [QuizController::class, 'current']);
	Route::post('/answer', [QuizController::class, 'answer']);
	Route::post('/back', [QuizController::class, 'back']);
	Route::post('/restart', [QuizController::class, 'restart']);
});

// Admin
Route::prefix('quiz-panel/admin')->group(function() {
	Voyager::routes();

	/******** EDITOR ********/
	Route::prefix('quiz-editor')->middleware('admin.user')->group(function () {
		Route::post('getAllQuestions', [EditorController::class, 'getAllQuestions']);
		Route::post('getQuestion', [EditorController::class, 'getQuestion']);
		Route::post('getAnswer', [EditorController::class, 'getAnswer']);
		Route::post('newQuestion', [EditorController::class, 'newQuestion']);
		Route::post('newAnswer', [EditorController::class, 'newAnswer']);
		Route::post('save', [EditorController::class, 'save']);
		Route::post('deleteAnswer', [EditorController::class, 'deleteAnswer']);
		Route::post('deleteQuestion', [EditorController::class, 'deleteQuestion']);
		Route::get('export', [EditorController::class, 'export']);
		Route::post('import', [EditorController::class, 'import']);
		Route::get('import', [EditorController::class, 'indexImport']);
		Route::get('/', [EditorController::class, 'index']);
	});


	/******** Result Editor ********/
	Route::prefix('results-editor')->middleware('admin.user')->group(function () {
		Route::post('/getAllResults', [ResEditorController::class, 'getAllResults']);
		Route::post('getResult', [ResEditorController::class, 'getResult']);
		Route::post('newResult', [ResEditorController::class, 'newResult']);
		Route::post('saveResult', [ResEditorController::class, 'saveResult']);
		Route::post('deleteResult', [ResEditorController::class, 'deleteResult']);
		Route::get('/', [ResEditorController::class, 'index']);
	});

});


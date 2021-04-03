<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\IndexController;
use App\Http\Controllers\TypesController;
use App\Http\Controllers\QuizController;
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

Route::resource('/', IndexController::class);
Route::resource('/types', TypesController::class);

Route::get('/question', function () {
  return view('question');
});

Route::get('/result', function () {
  return view('result');
});

// Quiz

Route::get('/quiz', [QuizController::class, 'index']);
Route::post('/quiz/answer', [QuizController::class, 'answer']);
Route::post('/quiz/back', [QuizController::class, 'back']);
Route::post('/quiz/restart', [QuizController::class, 'restart']);
Route::post('/quiz/current', [QuizController::class, 'current']);

// Session

Route::get('/ses', function (Request $request) {
  return $request->session()->all();
});

Route::get('/delses', function (Request $request) {
  $request->session()->invalidate();
  return redirect('/ses');
});
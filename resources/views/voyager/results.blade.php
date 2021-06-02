@extends('voyager::master')

@section('content')

	<link rel="stylesheet" href="{{ asset('mix/main.css') }}">
	<script>document.body.classList.add('light');</script>

    <main class="editor">

		<div id="ResEdList"></div>

		<div class="ed-buttons">
			<button id="ResEdNew" class="button">New</button>
			<button id="ResEdSave" class="button">Save</button>
		</div>

		<div id="EdResult" class="hidden">
			<div class="ed-head">
				<h3>Edit result</h3>
				<button class="button" id="ResEdDelete">Delete</button>
			</div>
			<input id="ResEdNameInput" class="form__input" value="" type="text">
			<div class="ed-head">
				<h3>Edit Description</h3>
			</div>
            <input id="ResEdDescInput" class="form__input" value="" type="text">
		</div>

    </main>

    <script src="{{ asset('mix/resEditor.js') }}"></script>

@stop

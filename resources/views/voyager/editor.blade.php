@extends('voyager::master')

@section('content')

<!-- Background color fix for voyager -->
<style>
	html {
		background-color: #F9F9F9 !important;
	}

	.app-footer {
		display: none;
	}
</style>

<link rel="stylesheet" href="{{ asset('mix/main.css') }}">
<script>
	document.body.classList.add('light');
</script>

<main class="editor">

	<div id="EdQuestionList"></div>

	<div class="ed-buttons">
		<button id="EdNewQuestionBtn" class="button">New</button>
		<button id="EdSaveBtn" class="button" disabled>Save</button>
	</div>

	<div id="EdQuestion" class="hidden">
		<div class="ed-head">
			<h2>Edit question</h2>
			<button class="button" id="EdQuestionDeleteBtn">Delete</button>
		</div>

		<div id="EdQuestionInputWrap" class="ed-input-wrap">
			<input id="EdQuestionInput" value="">
		</div>

		<div id="EdAnswers"></div>
	</div>

	<div id="EdAnswerEditor" class="hidden">
		<div class="ed-head">
			<h2>Edit answer</h2>
			<button class="button" id="EdAnswerDeleteBtn">Delete</button>
		</div>

		<div id="EdAnswerInputWrap" class="ed-input-wrap">
			<input id="EdAnswerInput" value="">
		</div>

		<div id="EdCoefs"></div>
	</div>

</main>

<script src="{{ asset('mix/editor.js') }}"></script>

@stop

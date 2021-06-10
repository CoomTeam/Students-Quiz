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

	.editor {
		margin-top: 32px;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
		background-color: white;
		box-shadow: 0 0 32px -24px black;
	}
</style>

<link rel="stylesheet" href="{{ asset('mix/main.css') }}">
<script>
	document.body.classList.add('light');
</script>

<main class="editor">
	<h1>Quiz Export</h1>
	<div>
		<p>{{$json}}</p>
	</div>
</main>

@stop

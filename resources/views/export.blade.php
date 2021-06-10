@extends('voyager::master')

@section('content')

<link rel="stylesheet" href="{{ asset('mix/main.css') }}">
<script>document.body.classList.add('light');</script>

<main class="editor">
		<h1>Quiz export</h1>
		<div id="question">
			<p>{{$json}}</p>
		</div>
	</main>

@stop


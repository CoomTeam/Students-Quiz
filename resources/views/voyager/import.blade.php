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
	<h1>Quiz Import</h1>
	<textarea name="json" id="json" cols="50" rows="20"></textarea>
	<br>
	<button id="submit" class="button">Submit</button>
</main>

<script>
	function init() {
		const submit = document.getElementById('submit');
		const text = document.getElementById('json');

		submit.addEventListener('click', async () => {
			let value;

			try {
				value = JSON.parse(text.value);
			} catch (error) {
				console.error(error);
				alert('Invalid JSON! ❌')
				return;
			}

			try {
				await POST('/quiz-panel/admin/quiz-editor/import', {
					quiz: value
				});
			} catch (error) {
				console.log(JSON.parse(text.value));
				console.error(error);
				alert('Something went wrong on the server 😪')
				return;
			}

			alert('Quiz successfully imported! 😁')
		});
	}

	window.addEventListener('load', init);

	async function POST(url, body) {
		const csrf = document.querySelector('input[name="_token"]');
		const request = {
			method: 'POST',
			body: body ? JSON.stringify(body) : undefined,
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				'X-CSRF-Token': csrf.value
			}
		}

		const response = await fetch(url, request);
		const data = await response.json();

		return data;
	}
</script>

@stop

@extends('voyager::master')

@section('content')

<link rel="stylesheet" href="{{ asset('mix/main.css') }}">
<script>document.body.classList.add('light');</script>

    <main class="editor">
		<h1>Import json you got from /editor/export</h1>
		<textarea name="json" id="json" cols="50" rows="20"></textarea>
		<br>
		<button id="submit" class="button">Submit</button>
	</main>

	<script>

		function init() {
			const submit = document.getElementById('submit');
			const text = document.getElementById('json');
			const test = document.getElementById('test');
			test.addEventListener('click', async () => {
				const data = await POST('/test');
			});
			submit.addEventListener('click', async () => {
				console.log(JSON.parse(text.value));

				const data = await POST('/quiz-panel/admin/quiz-editor/import', {'quiz': JSON.parse(text.value)});
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


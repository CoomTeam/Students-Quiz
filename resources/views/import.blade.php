<x-layout>

    <main class="editor">
		<h1>Import json you got from /editor/export</h1>
		<textarea name="json" id="json" cols="50" rows="40"></textarea>
		<button id="submit" class="button">Submit</button>
	</main>

	<script>

		function init() {
			const submit = document.getElementById('submit');
			const text = document.getElementById('json');
			submit.addEventListener('click', async () => {
				console.log(JSON.parse(text.value));

				const data = await POST('/editor/import', {'quiz': JSON.parse(text.value)});
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

</x-layout>

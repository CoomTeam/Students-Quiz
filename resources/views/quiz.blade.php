<x-layout>

    <main class="quiz">
		<div id="question" class="hidden">
			<div class="top">
				<div id="question-title">Question 0</div>
				<div id="go-back">Back</div>
			</div>

			<h1 id="text"></h1>
			<div id="answers"></div>
		</div>


		<div id="result" class="hidden" style="display: none">
				<label>according to the test, you are a...</label>
				<div class="image"></div>
				<h1 class="type">Food Guy!</h1>
				<p class="description">You always bringing some food for your class mates</p>
		</div>
	</main>

    <script src="{{ asset('mix/quiz.js') }}"></script>
</x-layout>

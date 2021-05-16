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

		<div id="result" class="hidden">
				<label>according to the test, you are a...</label>
				<div id="student-image"></div>
				<h1 id="student-name"></h1>
				<p id="student-description"></p>
				<div id="restart" class="button">Try one more time!</div>
		</div>
	</main>

    <script src="{{ asset('mix/quiz.js') }}"></script>
</x-layout>

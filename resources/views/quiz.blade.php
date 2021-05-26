<x-layout>

	<link href="https://cdn.jsdelivr.net/npm/shareon@1/dist/shareon.min.css"
		  rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/shareon@1/dist/shareon.min.js"
			type="text/javascript"></script>

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

			<div class="shareon">
				<a class="facebook" data-title="Completed the quiz!"></a>
				<a class="linkedin"></a>
				<!-- FB App ID is required for the Messenger button to function -->
				<button class="twitter"></button>
				<button class="whatsapp"></button>
			</div>

		</div>
	</main>

    <script src="{{ asset('mix/quiz.js') }}"></script>
</x-layout>

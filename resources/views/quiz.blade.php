<x-layout>

	<!-- jQuery for HubSpot -->
	<script charset="utf-8" type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>

	<!-- HubSpot Form -->
	<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>

	<!-- Shareon buttons -->
	<link href="https://cdn.jsdelivr.net/npm/shareon@1/dist/shareon.min.css" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/shareon@1/dist/noinit/shareon.min.js" type="text/javascript"></script>


	<main class="quiz">
	<div class="animated-background"></div>
		<noscript>Enable JavaScript, to see this page!</noscript>

		<div id="question" class="hidden">
			<div class="top">
				<div id="question-title">Question 0</div>
				<div id="go-back">Back</div>
			</div>

			<h1 id="text"></h1>
			<div id="answers"></div>
		</div>

		<div id="form" class="hidden">
			<h2>Hey, we have your result! 😎</h2>

			<p>Fill out this form to see it:</p>
			<div id="hubspot-form"></div>
			<p>Or just wait <span id="waiting-time">20 secconds</span></p>
		</div>

		<div id="result" class="hidden">
			<label>according to the test, you are a... </label>
			<div id="student-image"></div>
			<h1 id="student-name"></h1>
			<p id="student-description"></p>

			<div class="shareon" data-url="{{ env('APP_URL') }}">
				<a class="facebook"></a>
				<a class="telegram"></a>
				<a class="twitter"></a>
				<a class="whatsapp"></a>
			</div>

			<div class="links">
				<a id="restart">Try one more time!</a>
				<span>&</span>
				<a id="all-results" href="/all-results">See all results!</a>
			</div>
		</div>

	</main>

	<script src="{{ asset('mix/quiz.js') }}"></script>
</x-layout>

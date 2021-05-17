<x-layout>

    <main class="editor">
		<div id="question-list"></div>
		<div class="editor-buttons">
			<button id="new-question-button" class="button">New question</button>
			<button id="save-button" class="button">Save</button>
		</div>
		<div id="question" class="editor-question hidden">
			<div class="top">
				<div id="question-title">Question 0</div>
				<div id="go-back" style="display: none;">Back</div>
			</div>

			<input id="text" value="Pariatur asperiores est quis quam. Facere quisquam eius eaque sunt reiciendis minima vel. Velit ut delectus quis cupiditate.?">
			<div id="answers"><button class="button answer">Incidunt vitae.</button><button class="button answer">Minus.</button><button class="button answer">Ea architecto.</button></div>
		</div>

		<div id="answer-editor" class="hidden">
			<h2>Edit answer</h2>
			<div id="answer-text">
				<input id="answer-text-input" type="text" value="Yes, I am fine!">
			</div>
			<div id="coefs" class="coefs">
				<div class="coef">
					<span class="coef-name">Zombie</span>
					<input type="range" min="1" max="100" value="50" class="coef-slider">
				</div>
				<div class="coef">
					<span class="coef-name">Zombie</span>
					<input type="range" min="1" max="100" value="50" class="coef-slider">
				</div>
				<div class="coef">
					<span class="coef-name">Zombie</span>
					<input type="range" min="1" max="100" value="50" class="coef-slider">
				</div>
			</div>
		</div>
	</main>

    <script src="{{ asset('mix/editor.js') }}"></script>
</x-layout>

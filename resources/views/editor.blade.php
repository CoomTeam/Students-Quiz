<x-layout>

    <main class="editor">
		<div class="custom-select">
			<select>
				<option value="0">Select question:</option>
				@foreach ($questions as $question)
					<option value="{{$question->id}}">{{$question->text}}</option>
				@endforeach
			</select>
		</div>
		<div id="question" class="editor-question hidden">
			<div class="top">
				<div id="question-title">Question 0</div>
				<div id="go-back" style="display: none;">Back</div>
			</div>

			<h1 id="text">Pariatur asperiores est quis quam. Facere quisquam eius eaque sunt reiciendis minima vel. Velit ut delectus quis cupiditate.?</h1>
			<div id="answers"><button class="button answer">Incidunt vitae.</button><button class="button answer">Minus.</button><button class="button answer">Ea architecto.</button></div>
		</div>
		<div class="coefs ">
			<div class="coefs-coefs">
				<div class="coef">
					<span class="coef-name">Zombie</span>
					<div class="coef-slider-wrap">
						<input type="range" min="1" max="100" value="50" class="coef-slider">
					</div>
				</div>
				<div class="coef">
					<span class="coef-name">Zombie</span>
					<div class="coef-slider-wrap">
						<input type="range" min="1" max="100" value="50" class="coef-slider">
					</div>
				</div>
				<div class="coef">
					<span class="coef-name">Zombie</span>
					<div class="coef-slider-wrap">
						<input type="range" min="1" max="100" value="50" class="coef-slider">
					</div>
				</div>
				<div class="coef">
					<span class="coef-name">Zombie</span>
					<div class="coef-slider-wrap">
						<input type="range" min="1" max="100" value="50" class="coef-slider">
					</div>
				</div>
				<div class="coef">
					<span class="coef-name">Zombie</span>
					<div class="coef-slider-wrap">
						<input type="range" min="1" max="100" value="50" class="coef-slider">
					</div>
				</div>
			</div>
			<button class="coef-save button">Save coefs</button>

		</div>
	</main>

    <script src="{{ asset('mix/editor.js') }}"></script>
</x-layout>

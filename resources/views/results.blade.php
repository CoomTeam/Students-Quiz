<x-layout>

    <main class="editor">

		<div id="ResEdList"></div>

		<div class="ed-buttons">
			<button id="ResEdNew" class="button">New</button>
			<button id="ResEdSave" class="button">Save</button>
		</div>

		<div id="EdResult" class="">
			<div class="ed-head">
				<h2>Edit result</h2>
				<button class="button" id="ResEdDelete">Delete</button>
			</div>

			<input id="ResEdNameInput" value="" type="text">
            <input id="ResEdDescInput" value="" type="text">
		</div>
        
    </main>

    <script src="{{ asset('mix/resEditor.js') }}"></script>

</x-layout>

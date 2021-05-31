<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Student Type Quiz</title>

	{{-- FONTS --}}
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Chango&family=Syne+Mono&display=swap" rel="stylesheet">

	{{-- JS --}}
	<script src="{{ asset('mix/app.js') }}"></script>

	{{-- CSS --}}
	<link rel="stylesheet" href="{{ asset('mix/main.css') }}">

	{{-- TEMP START --}}
	<style>
		#links {
			position: fixed;
			top: 15px;
			right: 20px;
			display: flex;
			z-index: 999999999;

		}

		#links a {
			text-decoration: none;
			color: rgb(217, 215, 230);
			font-weight: bold;
			margin-left: 10px;
		}
	</style>
	{{-- TEMP END --}}

</head>


<body class="light">


	<header>
		<a href="https://www.hz.nl">
			<img src="img/logo.svg" alt="HZ Logo" id='logo'>
		</a>
		{{-- <button id="darkmode-button">Dark</button> --}}
	</header>

	@csrf
	{{ $slot }}

	{{-- TEMP START --}}
	<div id="links">
		<input class="tgl tgl-ios" id="cb2" type="checkbox"/>
		<label class="tgl-btn" for="cb2"></label>
		<a href="/">Home</a>
		<a href="/quiz">Quiz</a>
		<a href="/editor">Editor</a>
		<a href="/resEditor">ResEditor</a>
		<a href="/editor/export">Export</a>
		<a href="/editor/import">Import</a>
	</div>
	{{-- TEMP END --}}

	<footer>
		<span>created by coom team</span>
	</footer>
	<script src="{{ asset('mix/darkmode.js') }}"></script>
</body>


</html>

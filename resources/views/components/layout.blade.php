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

<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-FLDWH16ZT6"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-FLDWH16ZT6');
	</script>
</head>


<body class="light">


	<header>
		<a href="https://www.hz.nl">
			<img src="img/logo.svg" alt="HZ Logo" id='logo'>
		</a>
{{--		 <button id="darkmode-button">Dark</button>--}}
	</header>

	@csrf
	{{ $slot }}

	{{-- TEMP START --}}
	<div id="links">
		<div>
			<img src="/img/moon.png" id="darkmodeIcon">
		</div>
	</div>
	{{-- TEMP END --}}

	<footer>
		<p>
			<span>© 2021 HZ University of Applied Sciences</span>
			<a style="letter-spacing: 2px;
			color: gray;
			font-size: 12px;
			text-align: center;
			margin-left:20px;" class="cookie-link" href="/cookies">Cookie Policy</a>
		</p>
		
	</footer>
	<script src="{{ asset('mix/darkmode.js') }}"></script>
</body>


</html>

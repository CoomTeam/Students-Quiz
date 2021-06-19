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

	{{-- CSS --}}
	<link rel="stylesheet" href="{{ asset('mix/main.css') }}">

	{{-- ICON --}}
	<link rel="icon" type="image/png" href="/img/favicon.png"/>

	{{-- Global site tag (gtag.js) - Google Analytics --}}
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-2583700-9"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-2583700-9');
	</script>
</head>


<body class="light">
	<header>
		<a href="https://www.hz.nl">
			<img src="img/logo.svg" alt="HZ Logo" id='logo'>
		</a>

		<div class="darkmode-switch">
			<img src="/img/moon.png" id="darkmodeIcon" alt="darkmode-icon">
		</div>
	</header>

	<script src="{{ asset('mix/darkmode.js') }}"></script>

	@csrf
	{{ $slot }}

	<footer>
		<div>
			<span>© 2021 HZ University of Applied Sciences</span>
			<a class="footer-link" href="/">Home</a>
			<a class="footer-link" href="/all-results">All Results</a>
			<a class="footer-link" href="/cookies">Cookie Policy</a>
		</div>
	</footer>
</body>


</html>

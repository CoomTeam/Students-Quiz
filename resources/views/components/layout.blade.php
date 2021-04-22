<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Complete the quiz</title>

    {{-- FONTS --}}
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Chango&family=Syne+Mono&display=swap" rel="stylesheet">

    {{-- JS --}}
    <script src="{{ asset('mix/js/app.js') }}"></script>

    {{-- CSS --}}
    <link rel="stylesheet" href="{{ asset('mix/css/main.css') }}">
    <link rel="stylesheet" href="{{ asset('mix/css/main.css') }}">

</head>
<body>

<header>
	<img src="{{ asset('img/logo-updated.svg') }}" alt="">
</header>


    @csrf

    {{ $slot }}

    <footer>
        <span>created by coom team</span>
    </footer>

</body>
</html>

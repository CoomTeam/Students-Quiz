<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Complete the quiz</title>
    <link rel="stylesheet" href="{{ asset('css/question.css') }}">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Chango&family=Syne+Mono&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <img src="{{ asset('img/logo-updated.svg') }}" alt="">
    </header>

    <main>
        <div class="question">
            <div class="q-number">Question 1</div>
            <div class="q-back">Back</div>
            {{-- <div class="q-image"></div> --}}
            <h2 class="q-text">Would you say you’re more of an extrovert or an introvert? What was the last TV show you binge-watched?</h2>
            <div class="answers">
                <button class="answer">Yes</button>
                <button class="answer">No</button>
                <button class="answer">Maybe</button>
                <button class="answer">I dont know</button>
            </div>
        </div>
    </main>

    <footer>
        <span>created by coom team</span>
    </footer>

</body>
</html>
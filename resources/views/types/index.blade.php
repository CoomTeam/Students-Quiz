@extends('common.master')

@section('content')
    <div id="par1">
        <p>
            <br><br><br>
            Welcome to the HZ student quiz
            <br>
            <br>
            Take this test to find out what type of student you are!
        </p>
    </div>

    <div id="par2">
        <br><br><br><br>
        <button id="takeTestButton">
            Take Test!
        </button>
        <br><br><br><br><br><br>
    </div>

    <div id="indexBox">
        <div class="column">
            <img src="man.png" alt="test" class="logo">
            text
            <br><br><br><br><br><br><br><br><br><br><br><br>
        </div>

        <div class="column">
            <img src="man.png" alt="test" class="logo">
            description
            <br><br><br><br><br><br><br><br><br><br><br><br>
        </div>

        <div class="column">
            <img src="man.png" alt="test" class="logo">
            placeholder
            <br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
    </div>

    <div id="par3">
        <br><br><br>
        <form action="/types", method="get">
            <button id="viewTypesButton">
                View all types
            </button>
        </form>


    </div>
@endsection

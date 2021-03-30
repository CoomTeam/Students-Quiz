<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Welcome!</title>
	<link rel="stylesheet" href="welcome.app.css">
</head>

<body>

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
        <button id="takeTestButton" onclick="window.location.assign('/question')">
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

</body>
</html>

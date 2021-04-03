
function render_question(question) {
    let divQuestion = createElem('div', 'question');
    let divNumber = createElem('div', 'q-number', divQuestion);
    let divBack = createElem('div', 'q-back', divQuestion);
    let divText = createElem('div', 'q-text', divQuestion);
    let divAnswers = createElem('div', 'answers', divQuestion);

    let answers = question.answers;

    answers.forEach(answer => {
        let divAnswer = createElem('button', 'answer', divAnswers);
        divAnswer.innerText = answer.text;
        divAnswer.addEventListener('click', onAnswerClick);
        divAnswer.setAttribute('data-id', answer.id);
    });

    divNumber.innerText = `Question ${question.order + 1}`;
    divBack.innerText = "Back";
    divBack.addEventListener('click', back);
    if (question.order === 0) {
        // divBack.remove();
    }
    divText.innerText = question.text;

    console.log(divQuestion);

    putQuestionInto = document.getElementsByTagName('main')[0];
    putQuestionInto.innerHTML = '';
    putQuestionInto.appendChild(divQuestion);
}

function render_result(result) {
    let divResult = createElem('div', 'result');
    divResult.innerText = result.name;
    
    let divBack = createElem('div', 'r-back', divResult);
    divBack.innerText = "Back";
    divBack.addEventListener('click', back);

    let divRestart = createElem('div', 'r-restart', divResult);
    divRestart.innerText = "Restart";
    divRestart.addEventListener('click', restart);

    putResultInto = document.getElementsByTagName('main')[0];
    putResultInto.innerHTML = '';
    putResultInto.appendChild(divResult);

}

function createElem(elemName, className, putInto = null) {
    let elem = document.createElement(elemName);
    elem.className = className;

    if (putInto) {
        putInto.appendChild(elem);
    }

    return elem;
}

function restart() {
    fetch('/quiz/restart', {
        // Adding method type
       method: "POST",

       // Adding headers to the request
       headers: {
           "X-CSRF-Token": document.querySelector('input[name="_token"]').value
       }
   })
   .then(response => response.json())
   .then(data => {
       console.log(data);
       processResponse(data);
    });
}

function back() {
    fetch('/quiz/back', {
        // Adding method type
       method: "POST",

       // Adding headers to the request
       headers: {
           "X-CSRF-Token": document.querySelector('input[name="_token"]').value
       }
   })
   .then(response => response.json())
   .then(data => {
       console.log(data);
       processResponse(data);
    });
}

// When answer is clicked, submit answer, get new answer or result, and put it to DOM
function onAnswerClick(event) {
    console.log(event);
    let divAnswer = event.currentTarget;
    let answer_id = parseInt(divAnswer.getAttribute('data-id'));
    console.log(document.querySelector('input[name="_token"]').value);
    fetch('/quiz/answer', {
         // Adding method type
        method: "POST",
        
        // Adding body or contents to send
        body: JSON.stringify({
            answer: answer_id
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-CSRF-Token": document.querySelector('input[name="_token"]').value
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        processResponse(data);
    });
}

function current() {
    fetch('/quiz/current', {
        // Adding method type
       method: "POST",

       // Adding headers to the request
       headers: {
           "Content-type": "application/json; charset=UTF-8",
           "X-CSRF-Token": document.querySelector('input[name="_token"]').value
       }
   })
   .then(response => response.json())
   .then(data => {
       console.log(data);
       processResponse(data);
    });
}

function processResponse(response) {
    if (response?.type === 'question') {
        render_question(response.content);
    } else if (response?.type === 'result') {
        render_result(response.content);
    } else {
        console.error('error');
    }
}

function onload() {
    // document.getElementsByClassName('answer')[0].addEventListener('click', onAnswerClick);
    current();
}

window.addEventListener('load', onload);


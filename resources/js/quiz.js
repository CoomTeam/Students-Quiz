
/**
 * Puts question JSON (server response) into DOM
 * 
 * @param {*} question 
 */
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

/**
 * Puts result JSON (server response) into DOM
 * 
 * @param {Object} result
 */
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

/**
 * Creates an element a class name and puts it into another element
 * 
 * @param {string} elemName Name of tag ('div', 'p')
 * @param {string} className Class string ("dark solid")
 * @param {HTMLElement} putInto Parent
 * @returns 
 */
function createElem(elemName, className, putInto = null) {
    let elem = document.createElement(elemName);
    elem.className = className;

    if (putInto) {
        putInto.appendChild(elem);
    }

    return elem;
}

/**
 * 1. Sends POST request to restart the quiz
 * 2. Updates the quiz (with new aka first question)
 */
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

/**
 * 1. Sends POST request to unsubmit last answer
 * 2. Updates the quiz (with new but actually previous question)
 */
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

/**
 * Triggers when an answer is clicked
 * 1. Sends POST request to submit the answer
 * 2. Updates the quiz (with new question or result)
 */
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

/**
 * Updates the quiz (with new question or result)
 */
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

/**
 * Decides what to do with a server response (to update the quiz)
 * 
 * Maybe also should validate the response, check for errors
 */
function processResponse(response) {
    if (response?.type === 'question') {
        render_question(response.content);
    } else if (response?.type === 'result') {
        render_result(response.content);
    } else {
        console.error('error');
    }
}

/**
 * Update the quiz when the page is just loaded
 */
function onload() {
    current();
}

window.addEventListener('load', onload);


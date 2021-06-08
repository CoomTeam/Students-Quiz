/**
 * @typedef ServerResponse Response from the server.
 * @property {"question" | "result"} type Type of response.
 * @property {Question} content Respone content.
 */

/**
 * @typedef Question Question response.
 * @property {string} text Question text.
 * @property {number} order Question order.
 * @property {Answer[]} answers Possible answers.
 */

/**
 * @typedef Answer Possible answer for question.
 * @property {string} text Answer text.
 * @property {number} id Answer ID.
 */

/**
 * @typedef Result Quiz result.
 * @property {string} name Student type.
 */

/**
 * Quiz initalization
 */
async function init() {

	// Listen for go back & restart buttons
	document.getElementById('go-back').addEventListener('click', goBack);
	document.getElementById('restart').addEventListener('click', restartQuiz);

	// Get current question or result
	const data = await POST('/quiz/current');

	// Render response
	RENDER(data);
}

/**
 * Process and render response from the server
 * @param {ServerResponse} response Server response
 */
function RENDER(response) {
	if (response.type === 'question') renderQuestion(response.content);
	if (response.type === 'result') renderResult(response.content);
	console.log(response); // TODO: Remove
}

/**
 * Render question element
 * @param {Question} question Question content received from the server
 */
function renderQuestion(question) {
	const title = document.getElementById('question-title');
	const text = document.getElementById('text');
	const answers = document.getElementById('answers');

	// Update values
	title.innerText = 'Question ' + question.order;
	text.innerText = question.text;

	// Remove old answers
	answers.innerHTML = '';

	// Render answers
	question.answers.forEach((answer) => {
		const answerElement = document.createElement('button');
		answerElement.className = 'button answer';
		answerElement.innerText = answer.text;
		answerElement.addEventListener('click', () => sendAnswer(answer.id));

		answers.appendChild(answerElement);
	});

	// Disable "Back" button if its a first question
	document.getElementById('go-back').style.display = question.order === 0 ? 'none' : 'block';

	hideResult();
	showQuestion();
}

/**
 * Render result element
 * @param {Result} result Result content received from the server
 */
function renderResult(result) {
	const image = document.getElementById('student-image');
	const name = document.getElementById('student-name');
	const description = document.getElementById('student-description');

	// Update values
	image.style.backgroundImage = `url("/img/man.png")`; // TODO
	name.innerText = result.name;
	description.innerText = 'You always bringing some food for your class mates'; // TODO

	// Remove old answers
	answers.innerHTML = '';

	// For sharing
	document.title = 'Student Type Quiz: Im a "' + result.name + '"! Which one are you?';
	shareon();

	showResult();
	hideQuestion();
}


/**
 * Go to previous question
 */
async function goBack() {
	hideResult();
	hideQuestion();

	const data = await POST('/quiz/back');
	RENDER(data);
}

/**
 * Send answer to the server.
 * @param {number} id Answer id.
 */
async function sendAnswer(id) {
	hideResult();
	hideQuestion();

	const data = await POST('/quiz/answer', {answer: id});
	RENDER(data);
}

/**
 * Restart quiz
 */
async function restartQuiz() {
	document.title = 'Student Type Quiz';
	hideResult();
	hideQuestion();

	const data = await POST('/quiz/restart');
	RENDER(data);
}

/** Show question modal */
function showQuestion() {
	document.getElementById('question').className = '';
}

/** Hide question modal */
function hideQuestion() {
	document.getElementById('question').className = 'hidden';
}

/** Show result modal */
function showResult() {
	document.getElementById('result').className = '';
}

/** Hide result modal */
function hideResult() {
	document.getElementById('result').className = 'hidden';
}

/**
 * Send request to the server
 * @param {string} url URL to send requets
 * @param {object} body Data to send (Optional)
 * @returns Response in JSON format
 */
async function POST(url, body) {
	const request = {
		method: 'POST',
		body: body ? JSON.stringify(body) : undefined,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			'X-CSRF-Token': document.querySelector('input[name="_token"]').value
		}
	}

	const response = await fetch(url, request);
	const data = await response.json();

	return data;
}


// Initialize on page load
window.addEventListener('load', init);

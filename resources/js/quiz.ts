import { POST } from './utils';

localStorage.setItem('form-submited', 'true');

// Libraries declaration
declare function shareon(): void;
declare namespace hbspt {
	namespace forms {
		function create(config: any): void;
	}
};

interface QuestionServerResponse {
	type: 'question';
	content: Question;
}

interface ResultServerResponse {
	type: 'result';
	content: Result;
}

interface Question {
	text: string;
	order: number;
	answers: Answer[];
}

interface Answer {
	id: number;
	text: string;
}

interface Result {
	name: string;
	url: string;
	description: string;
}

// Amount of secconds to wait
const waitingTime = 30;

// Amount of time left before showing the result
let secondsToShow = waitingTime;

// Countdown timer for showing result
let countdownTimer: number;

/**
 * Quiz initalization
 */
async function init(): Promise<void> {

	// HubSpot Setup
	hbspt.forms.create({
		target: '#hubspot-form',
		region: 'na1',
		portalId: '2034076',
		formId: '5615ba28-acdd-418e-a456-9ca21b62d766',
		onFormSubmitted: () => {
			localStorage.setItem('form-submited', 'true');
			hideForm();
			hideQuestion();
			showResult();
		}
	});

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
 * @param response Server response
 */
function RENDER(response: QuestionServerResponse | ResultServerResponse): void {
	if (response.type === 'question') renderQuestion(response.content);
	if (response.type === 'result') renderResult(response.content);
}

/**
 * Render question element
 * @param question Question content received from the server
 */
function renderQuestion(question: Question): void {
	const title = document.getElementById('question-title');
	const text = document.getElementById('text');
	const answers = document.getElementById('answers');

	// Update values
	title.innerText = `Question ${question.order + 1}`;
	text.innerText = question.text;

	// Remove old answers
	answers.innerHTML = '';

	// Remove background zoom
	document.querySelector('.animated-background').classList.remove('zoomed');

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
 * @param result Result content received from the server
 */
function renderResult(result: Result): void {
	const image = document.getElementById('student-image');
	const name = document.getElementById('student-name');
	const description = document.getElementById('student-description');

	// Update values
	image.style.backgroundImage = `url(${result.url})`;
	name.innerText = result.name;
	description.innerText = result.description;

	// Make background zoomed
	document.querySelector('.animated-background').classList.add('zoomed');

	// For sharing
	document.title = `Student Type Quiz: Im a "${result.name}"! Which one are you?`;
	shareon();

	// Show HubSpot form if its not submited
	if (localStorage.getItem('form-submited') === 'true') {
		showResult();
		hideQuestion();
	} else {
		showForm();
		hideResult();
		hideQuestion();

		setTimeout(() => {
			const hubspotIFrame = document.querySelector<HTMLIFrameElement>('iframe.hs-form-iframe').contentWindow.document;
			const hubspotResultField = hubspotIFrame.querySelector<HTMLInputElement>('[name="studenttypequizresult"]');
			if (hubspotResultField) hubspotResultField.value = result.name;
		}, 1000);
	}
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
 * @param id Answer id.
 */
async function sendAnswer(id: number): Promise<void> {
	hideResult();
	hideQuestion();

	const data = await POST('/quiz/answer', { answer: id });
	RENDER(data);
}

/**
 * Restart quiz
 */
async function restartQuiz(): Promise<void> {
	document.title = 'Student Type Quiz';
	hideForm();
	hideResult();
	hideQuestion();

	const data = await POST('/quiz/restart');
	RENDER(data);
}

/** Show form modal */
function showForm(): void {

	// Reset timer
	secondsToShow = waitingTime;
	setWaitingTime(secondsToShow);

	// Set timer
	countdownTimer = window.setInterval(() => {
		secondsToShow -= 1;
		setWaitingTime(secondsToShow);

		if (secondsToShow <= 0) {
			hideForm();
			hideQuestion();
			showResult();
		}
	}, 1000);

	document.getElementById('form').className = '';
}

/** Hide form modal */
function hideForm(): void {
	clearInterval(countdownTimer);
	document.getElementById('form').className = 'hidden';
}

/** Show question modal */
function showQuestion(): void {
	document.getElementById('question').className = '';
}

/** Hide question modal */
function hideQuestion(): void {
	document.getElementById('question').className = 'hidden';
}

/** Show result modal */
function showResult(): void {
	document.getElementById('result').className = '';
}

/** Hide result modal */
function hideResult(): void {
	document.getElementById('result').className = 'hidden';
}

/**
 * Update time on page timer
 * @param {number} seconds
 */
function setWaitingTime(seconds: number): void  {
	document.getElementById('waiting-time').innerText = `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
}

// Initialize on page load
window.addEventListener('load', init);

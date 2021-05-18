///////////////////////////////////////////

interface Option {
	text: string,
	callback: () => any,
}

interface Question {
	text?: string,
	id?: number,
	order?: number,
	answers: Answer[],
}

interface Answer {
	text?: string,
	id?: number,
	coefs?: Coef[],
}

interface Coef {
	name?: string,
	id?: string,
	value: number,
}

class Select {
	private elSelect: HTMLElement;
	private elSelection: HTMLElement;
	private elOptions: HTMLElement;
	private defaultText: string;

	constructor (elContainer: HTMLElement, text: string, options: Option[] = []) {
		this.defaultText = text;
		this.elSelect = createElem('div', 'select', elContainer);
		this.elSelection = createElem('div', 'select-selection', this.elSelect);
		this.setDefault();
		this.elOptions = createElem('div', 'select-options hidden', this.elSelect);
		this.elSelect.addEventListener('click', (ev) => {
			ev.stopPropagation();
			this.toggle();
		});
		document.addEventListener('click', () => this.close());
	}

	updateOptions (options: Option[]) {
		this.elOptions.innerHTML = '';
		options.forEach(option => {
			const elOption = createElem('div', 'select-option', this.elOptions);
			elOption.innerText = option.text;
			elOption.addEventListener('click', () => this.onOptionClick(option));
		});
	}

	onOptionClick(option: Option) {
		this.elSelection.innerText = option.text;
		option.callback();
	}

	toggle() {
		this.elOptions.classList.toggle('hidden');
	}

	close() {
		this.elOptions.classList.add('hidden');
	}

	setDefault() {
		this.elSelection.innerText = this.defaultText;
	}

}

class QuestionSelect extends Select {
	updateQuestions(questions: Question[]) {
		const options = questions.map((question) => {
			const option = {
				text: `(${question.order}) ${question.text}`,
				callback: () => onQuestionSelect(question.id),
			}
			return option;
		});
		super.updateOptions(options);
	}
}

///////////////////////////////////////////

let QUESTION: Question;
let selectedAnswer: number = -1;
let questionList: QuestionSelect;
let isQuestionSaved: boolean = true;
let isAnswerSaved: boolean = true;

async function init() {
	let elQuestionList = document.getElementById('EdQuestionList');
	questionList = new QuestionSelect(elQuestionList, 'Select question:');

	on('click', 'EdNewQuestionBtn', () => newQuestion());
	on('click', 'EdSaveBtn', () => save());
	on('click', 'EdAnswerDeleteBtn', () => deleteAnswer());
	on('click', 'EdQuestionDeleteBtn', () => deleteQuestion());

	await plantQuestionList();
}

window.addEventListener('load', init);


/*** "When" stuff ***/

// When question is chosen from select menu
function onQuestionSelect(id: number) {
	changeQuestion(async () => {
		return id;
	});
}

// When 'new question' button is pressed
function newQuestion() {
	changeQuestion(async () => {
		const data = await POST('/editor/newQuestion');
		const id = data.id;
		await plantQuestionList();
		return id;
	});
}

// When 'new answer' button is pressed
function newAnswer() {
	changeQuestion(async () => {
		const id = QUESTION.id;
		await POST('/editor/newAnswer' , {'id': id});
		return id;
	});
}

// When answer is clicked
function onAnswerSelect(index: number) {
	changeAnswer(() => {
		return index;
	});
}

function deleteAnswer() {
	const answerID = QUESTION.answers[selectedAnswer].id;
	changeQuestion(async () => {
		await POST('/editor/deleteAnswer' , {'id': answerID});
		return QUESTION.id;
	});
}

function deleteQuestion() {
	const questionID = QUESTION.id;
	changeQuestion(async () => {
		questionList.setDefault();
		await POST('/editor/deleteQuestion' , {'id': questionID});
		await plantQuestionList();
		return -1;
	});
}

/*** "Wrappers" stuff ***/

// wrapper for functions that change question
async function changeQuestion(wrapped: () => number | Promise<number>, checkSave = true) {
	// Prevent from losing unsaved changes
	if (checkSave && (!isQuestionSaved || !isAnswerSaved)) {
		pleaseSave();
		return;
	}
	// Hide everything
	hideQuestion();
	hideAnswerEditor();
	// Set no answer is yet selected
	selectedAnswer = -1;
	// Do the stuff in wrapped()
	let questionID = await wrapped();
	// Load the question and show it
	if (questionID !== -1) {
		await plantQuestion(questionID);
		showQuestion();
	}
}

async function changeAnswer(wrapped: () => number | Promise<number>, checkSave = true) {
	if (checkSave && !isAnswerSaved) {
		pleaseSave();
		return;
	}

	hideAnswerEditor();
	let answer_id = await wrapped();
	if (answer_id !== -1) {
		await plantAnswerEditor(answer_id);
		showAnswerEditor();
	}
}


/*** "Planters" stuff */

// Update the list of questions (from server)
async function plantQuestionList() {
  	const questions = await POST('/editor/getAllQuestions');
	questionList.updateQuestions(questions);
}

// Load and render question of given ID (from server)
async function plantQuestion(id: number) {
	// Get question
	QUESTION = await POST('/editor/getQuestion', {'id': id});

	// Get elements
	const text = document.getElementById('EdQuestionInput') as HTMLInputElement;
	const answers = document.getElementById('EdAnswers');

	// Update question values
	text.value = QUESTION.text;

	// Setup editor for question text
	text.addEventListener('input', () => {
		QUESTION.text = text.value;
		isQuestionSaved = false;
	});

	// Remove all answers
	answers.innerHTML = '';

	// Render actual answers
	QUESTION.answers.forEach((answer , index) => {
		const answerElement = createElem('button', 'button answer', answers);
		answerElement.innerText = answer.text;
		answerElement.addEventListener('click', () => onAnswerSelect(index));
	});

	// Render "new answer" button
	const newAnswerElement = createElem('button', 'button answer', answers);
	newAnswerElement.innerText = 'ADD NEW';
	newAnswerElement.addEventListener('click', () => newAnswer());
}

// Render answer of given index from QUESTION.answers[]
async function plantAnswerEditor(index: number) {
	console.log('planted answer editor');
	const answer = QUESTION.answers[index];
	selectedAnswer = index;

	const elAnsText = document.getElementById('EdAnswerInputWrap');
	elAnsText.innerHTML = '';
	const elAnsTextInput = createElem('input', '', elAnsText) as HTMLInputElement;
	elAnsTextInput.id = 'EdAnswerInput';
	elAnsTextInput.type = "text";
	elAnsTextInput.value = answer.text;
	console.log(elAnsTextInput);

	const ansEls = document.getElementsByClassName('answer');
	const ansEl = ansEls[index] as HTMLDivElement;

	elAnsTextInput.addEventListener('input', () => {
		answer.text = elAnsTextInput.value;
		ansEl.innerText = elAnsTextInput.value
		isAnswerSaved = false;
	});

	const elCoefs = document.getElementById('EdCoefs');
	elCoefs.innerHTML = '';
	answer.coefs.forEach(coef => {
		const elCoef = createElem('div', 'coef', elCoefs);
		const elCoefName = createElem('span', 'coef-name', elCoef);
		elCoefName.innerText = coef.name;

		const elCoefSlider = createElem('input', 'coef-slider', elCoef) as HTMLInputElement;
		elCoefSlider.setAttribute('min', '1');
		elCoefSlider.setAttribute('max', '100');
		elCoefSlider.setAttribute('type', 'range');
		elCoefSlider.value = coef.value.toString();

		elCoefSlider.addEventListener('input', () => {
			console.log(coef.value, elCoefSlider.value, index);

			coef.value = parseInt(elCoefSlider.value);
			isAnswerSaved = false;

			console.log(coef);
			console.log(QUESTION.answers[index].coefs);
		});
	});
}

/*** Hide&Show stuff ***/

function showAnswerEditor() { document.getElementById('EdAnswerEditor').classList.remove('hidden'); }
function hideAnswerEditor() { document.getElementById('EdAnswerEditor').classList.add('hidden'); }
function showQuestion() { console.log('q shown'); document.getElementById('EdQuestion').className = ''; }
function hideQuestion() { console.log('q hidden'); document.getElementById('EdQuestion').className = 'hidden'; }


/*** Saving stuff ***/

function pleaseSave() {
	alert('You have unsaved changes. Action denied');
}

async function save() {
	if (isAnswerSaved && isQuestionSaved) {
		alert('nothing to save');
		return;
	}

	let sa = selectedAnswer
	changeAnswer(async () => {

		await changeQuestion(async () => {

			await saveQuestion();

			if (!isAnswerSaved) {
				selectedAnswer = sa;
				await saveAnswer();
			}

			return QUESTION.id;

		}, false);

		return selectedAnswer;

	}, false);
}

async function saveAnswer() {
	await POST('/editor/saveAnswer', {answer: QUESTION.answers[selectedAnswer]});
	isAnswerSaved = true;
}

async function saveQuestion() {
	const question = {
		id: QUESTION.id,
		text: QUESTION.text,
	};

	await POST('/editor/saveQuestion', {question: question});
	isQuestionSaved = true;
}


/*** Other stuff ***/

async function POST(url: string, body = undefined) {
	const csrf = document.querySelector('input[name="_token"]') as HTMLInputElement;
	const request = {
		method: 'POST',
		body: body ? JSON.stringify(body) : undefined,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			'X-CSRF-Token': csrf.value
		}
	}

	const response = await fetch(url, request);
	const data = await response.json();

	return data;
}

function createElem(elemName: string, className: string, putInto: HTMLElement = null): HTMLElement {
	let elem = document.createElement(elemName);
	elem.className = className;

	if (putInto) {
		putInto.appendChild(elem);
	}

	return elem;
}

// barely used
function on(type: string, id: string, listener: () => any) {
	let element = document.getElementById(id);
	element.addEventListener(type, listener);
}

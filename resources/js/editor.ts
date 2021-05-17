/////////////////////////////// slider
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

	constructor (elContainer: HTMLElement, text: string, options: Option[] = []) {
		this.elSelect = createElem('div', 'select', elContainer);
		this.elSelection = createElem('div', 'select-selection', this.elSelect);
		this.elSelection.innerText = text;
		this.elOptions = createElem('div', 'select-options hidden', this.elSelect);
		this.elSelect.addEventListener('click', (ev) => {
			ev.stopPropagation();
			this.toggle();
		});
		document.addEventListener('click', close);
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

}

class QuestionSelect extends Select {
	updateQuestions(questions: Question[]) {
		const options = questions.map((question) => {
			const option = {
				text: question.text,
				callback: () => onQuestionSelect(question.id),
			}
			return option;
		});
		super.updateOptions(options);
	}
}

function createElem(elemName: string, className: string, putInto: HTMLElement = null): HTMLElement {
	let elem = document.createElement(elemName);
	elem.className = className;

	if (putInto) {
		putInto.appendChild(elem);
	}

	return elem;
}

///////////////////////////////////////////

let QUESTION: Question;
let UNEDITED: Question;
let isQuestionSaved: boolean = true;
let isAnswerSaved: boolean = true;
let questionList: QuestionSelect;
let selectedAnswer: number = -1;


async function init() {
	let elQuestionList = document.getElementById('question-list');
	questionList = new QuestionSelect(elQuestionList, 'Select question:');

	let elNewQuestion = document.getElementById('new-question-button');
	elNewQuestion.addEventListener('click', () => newQuestion());

	let elSave = document.getElementById('save-button');
	elSave.addEventListener('click', () => save());

	await plantQuestionList();
}

async function onQuestionSelect(id: number) {
	if (!beforeQuestionUpdate()) return;

	hideQuestion();
	await plantQuestion(id);
	selectedAnswer = -1;
	showQuestion();
}

async function newQuestion() {
	if (!beforeQuestionUpdate()) return;

	hideQuestion();
  	const data = await POST('/editor/newQuestion');
	const id = data.id;
	await plantQuestionList();
	await plantQuestion(id);
	selectedAnswer = -1;
	showQuestion();
}

async function newAnswer() {
	if (!beforeQuestionUpdate) return;

	const id = QUESTION.id;
	hideQuestion();
	await POST('/editor/newAnswer' , {'id': id});
	await plantQuestion(id);
	console.log(12);

}

async function plantQuestionList() {
  	const questions = await POST('/editor/getAllQuestions');
	questionList.updateQuestions(questions);
}

async function plantQuestion(id: number) {
	QUESTION = await POST('/editor/getQuestion', {'id': id});
	UNEDITED = JSON.parse(JSON.stringify(QUESTION));
	renderQuestion(QUESTION);
	console.log(QUESTION);
}

function beforeQuestionUpdate() {
	if (!isQuestionSaved || !isAnswerSaved) {
		pleaseSave();
		return false;
	}
	hideQuestion();
	hideAnswerEditor();
	return true;
}

function beforeAnswerEditorUpdate() {
	if (!isAnswerSaved) {
		pleaseSave();
		return false;
	}
	hideAnswerEditor();
	return true;
}

async function displayAnswerEditor(index: number) {

	if (!beforeAnswerEditorUpdate()) return;

	hideAnswerEditor();

	selectedAnswer = index;

	const answer = QUESTION.answers[index];


	const elAnsInput = document.getElementById('answer-text-input') as HTMLInputElement;
	elAnsInput.value = answer.text;

	elAnsInput.addEventListener('change', () => {
		answer.text = elAnsInput.value;
		isAnswerSaved = false;
	});

	const elCoefs = document.getElementById('coefs');
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

		elCoefSlider.addEventListener('change', () => {
			coef.value = parseInt(elCoefSlider.value);
			isAnswerSaved = false;
		});

		console.log(coef, coef.value.toString());
	});


	showAnswerEditor();
}

function pleaseSave() {
	alert('You have unsaved changes. Action denied');
}

function showAnswerEditor() {
	document.getElementById('answer-editor').classList.remove('hidden');
}

function hideAnswerEditor() {
	document.getElementById('answer-editor').classList.add('hidden');
}



async function save() {
	if (isAnswerSaved && isQuestionSaved) {
		console.log('nothing to save');
		return;
	}

	hideQuestion();
	hideAnswerEditor();

	if (!isAnswerSaved) {
		await saveAnswer();
	}

	if (!isQuestionSaved) {
		await saveQuestion();
	}


	isAnswerSaved = true;
	isQuestionSaved = true;
	if (selectedAnswer != -1) displayAnswerEditor(selectedAnswer);
	plantQuestionList();
	plantQuestion(QUESTION.id);
	showAnswerEditor();
	showQuestion();
}

async function saveAnswer() {
	console.log(QUESTION.answers[selectedAnswer], selectedAnswer);
	await POST('/editor/saveAnswer', {answer: QUESTION.answers[selectedAnswer]});
}

async function saveQuestion() {
	const question = {
		id: QUESTION.id,
		text: QUESTION.text,
	};

	await POST('/editor/saveQuestion', {question: question});
}




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

function renderQuestion(question: Question) {
	question = QUESTION;
	const title = document.getElementById('question-title');
	const text = document.getElementById('text') as HTMLInputElement;
	const answers = document.getElementById('answers');

	// Update values
	title.innerText = 'Question ' + question.order;
	text.value = question.text;

	text.addEventListener('change', () => {
		QUESTION.text = text.value;
		isQuestionSaved = false;
	});

	// Remove old answers
	answers.innerHTML = '';

	// Render answers
	question.answers.forEach((answer , index) => {
		const answerElement = document.createElement('button');
		answerElement.className = 'button answer';
		answerElement.innerText = answer.text;
		answerElement.addEventListener('click', () => displayAnswerEditor(index));

		answers.appendChild(answerElement);
	});

	const newAnswerElement = document.createElement('button');
	newAnswerElement.className = 'button answer';
	newAnswerElement.innerText = 'ADD NEW';
	newAnswerElement.addEventListener('click', () => newAnswer());


	answers.appendChild(newAnswerElement);

}



function showQuestion() {
	document.getElementById('question').className = '';
}

/** Hide question modal */
function hideQuestion() {
	document.getElementById('question').className = 'hidden';
}

window.addEventListener('load', init);

import { POST, createElem, on } from './utils';

// When page is loaded
function init() {

	QUESTION_LIST = new QuestionSelect(
		document.getElementById('EdQuestionList')
	);

	chooseQuestion(-1);

	on('click', 'EdNewQuestionBtn', () => newQuestion());
	on('click', 'EdSaveBtn', () => save());
	on('click', 'EdAnswerDeleteBtn', () => deleteAnswer());
	on('click', 'EdQuestionDeleteBtn', () => deleteQuestion());

}

window.addEventListener('load', init);




/* Global vars (start) */

let CHOSEN_QUESTION = -1;
let CHOSEN_ANSWER = -1;
let NEED_SAVE = false;

let QUESTION_LIST: QuestionSelect;

/* Global vars (end) */





/* Types (start) */

interface Question {
	text: string;
	id: number;
	order: number;
	answers: Answer[];
}

interface Answer {
	text: string;
	id: number;
	coefs: Coef[];
}

interface Coef {
	name: string;
	id: string;
	value: number;
}

/* Types (end) */


/* Select (start) */


class QuestionSelect {
	private elSelect: HTMLElement;
	private elSelection: HTMLElement;
	private elOptions: HTMLElement;
	private defaultText = 'Select Question:';

	public constructor(container: HTMLElement) {

		this.elSelect = createElem('div', 'select', container);
		this.elSelection = createElem('div', 'select-selection', this.elSelect);
		this.elOptions = createElem('div', 'select-options hidden', this.elSelect);

		this.setDefault();

		// Open/close when selection is clicked
		this.elSelect.addEventListener('click', (ev) => {
			ev.stopPropagation();
			this.elOptions.classList.toggle('hidden');
		});

		// Close when outside is clicked
		document.addEventListener('click', () => this.elOptions.classList.add('hidden'));
	}

	/**
	 * Update select with new options (questions) provided
	 *
	 * @param questions Questions from server (id, text, order)
	 */
	public update(questions: Question[]) {

		// Set selection to default
		this.setDefault();

		// Remove old options
		this.elOptions.innerHTML = '';

		// Make new options
		questions.forEach(question => {

			const optionEl = createElem('div', 'select-option', this.elOptions);
			const text = this.makeText(question);

			optionEl.innerText = text;
			optionEl.dataset.id = question.id.toString();
			optionEl.addEventListener('click', () => onQuestionSelect(question.id));

		});

		this.selectSelected();
	}

	/**
	 * If there is chosen question, show it as selected
	 */
	public selectSelected() {

		if (CHOSEN_QUESTION === -1) return;

		const questions = Array.from(document.getElementsByClassName('select-option')) as HTMLElement[];

		// Find question to select
		const question = questions.find(
			question => CHOSEN_QUESTION.toString() === question.dataset.id
		);

		// Select it
		this.elSelection.innerText = question.innerText;
	}

	/**
	 * Combine question order and text to an extremely beautiful string
	 *
	 * @param question Question
	 * @returns Formatted string
	 */
	private makeText(question: Question): string {
		return `(${question.order}) ${question.text}`;
	}

	/**
	 * Set selection to defalut text (like "Select Question:")
	 */
	private setDefault() {
		this.elSelection.innerText = this.defaultText;
	}

}

/* Select (end) */





/** It loads what chosen from server (start) */

/**
 * Load CHOSEN_QUESTION FROM SERVER
 */
async function loadQuestion() {

	// Get question
	const question = await POST('/quiz-panel/admin/quiz-editor/getQuestion', { 'id': CHOSEN_QUESTION }) as Question;

	// Get elements
	const input = document.getElementById('EdQuestionInput') as HTMLInputElement;
	const answers = document.getElementById('EdAnswers');

	// Update question values
	input.value = question.text;

	// When changed
	input.addEventListener('input', setNeedToSave);

	// - old answers
	answers.innerHTML = '';

	// + new answers
	question.answers.forEach((answer) => {

		// Answer button
		const answerElement = createElem('button', 'button answer', answers);
		answerElement.innerText = answer.text;
		answerElement.dataset.id = answer.id.toString();

		// Answer callback (when answer button clicked)
		answerElement.addEventListener('click', () => onAnswerSelect(answer.id));

	});

	// New answer button
	const newAnswerElement = createElem('button', 'button answer add-new', answers);
	newAnswerElement.innerText = 'ADD NEW';

	// New answer callback
	newAnswerElement.addEventListener('click', () => newAnswer());

}



/**
 * Load CHOSEN_ANSWER FROM SERVER
 */
async function loadAnswer() {
	const answer = await POST('/quiz-panel/admin/quiz-editor/getAnswer', { 'id': CHOSEN_ANSWER }) as Answer;

	const inputWrap = document.getElementById('EdAnswerInputWrap');
	inputWrap.innerHTML = '';

	const inputEl = createElem('input', '', inputWrap) as HTMLInputElement;
	inputEl.id = 'EdAnswerInput';
	inputEl.type = 'text';
	inputEl.value = answer.text;

	inputEl.addEventListener('input', setNeedToSave);

	const coefsWrap = document.getElementById('EdCoefs');
	coefsWrap.innerHTML = '';

	answer.coefs.forEach(coef => {
		const coefEl = createElem('div', 'coef', coefsWrap);
		const coefNameEl = createElem('span', 'coef-name', coefEl);
		coefNameEl.innerText = coef.name;


		const coefSliderEl = createElem('input', 'coef-slider', coefEl) as HTMLInputElement;
		coefSliderEl.dataset.id = coef.id;
		coefSliderEl.setAttribute('min', '1');
		coefSliderEl.setAttribute('max', '100');
		coefSliderEl.setAttribute('type', 'range');
		coefSliderEl.value = coef.value.toString();

		const outputEl = createElem('output', '', coefEl) as HTMLInputElement;
		coefSliderEl.addEventListener('input', () => {
			outputEl.value = coefSliderEl.value;
		});

		coefSliderEl.addEventListener('input', setNeedToSave);
	});

}

/** It loads what chosen from server (end) */





/** When buttons clicked (start) */

/**
 * Select question to show
 * (when QUESTION FROM LIST is clicked)
 */
async function onQuestionSelect(id: number) {
	// If something was changed, stop, and show error
	if (NEED_SAVE) return pleaseSave();
	// Hide everything
	before_question();
	// CHOSEN_QUESTION = id
	chooseQuestion(id);
	// Update list with selected option
	QUESTION_LIST.selectSelected();
	// Load selected question
	await loadQuestion();
	// Unhide question
	after_question();
}

/**
 * Select answer to show
 * !!! this is not chooseAnswer()
 * (when ANSWER BUTTON INSIDE QUESTION is clicked)
 */
async function onAnswerSelect(id: number) {
	// If something was changed, stop, and show error
	if (NEED_SAVE) return pleaseSave();
	// Hide answer
	before_answer();
	// CHOSEN_ANSWER = id
	chooseAnswer(id);
	// Load selected answer
	await loadAnswer();
	// Unhide answer
	after_answer();
}

/**
 * Create new answer
 * (when NEW ANSWER is clicked)
 */
async function newAnswer() {
	// If something was changed, stop, and show error
	if (NEED_SAVE) return pleaseSave();
	// Hide everything
	before_question();
	// Hey server, make new question
	const resp = await POST('/quiz-panel/admin/quiz-editor/newAnswer', { 'id': CHOSEN_QUESTION }) as Answer;
	// Get updated question (with new answer)
	await loadQuestion();
	// CHOSEN_ANSWER = resp.id
	chooseAnswer(resp.id);
	// Load selected answer
	await loadAnswer();
	// Unhide question
	after_question();
	// Unhide answer
	after_answer();
}

/**
 * Create new question, choose it, load it
 * (when NEW QUESTION is clicked)
 */
async function newQuestion() {
	if (NEED_SAVE) return pleaseSave();
	before_question();

	const resp = await POST('/quiz-panel/admin/quiz-editor/newQuestion') as Question;
	await chooseQuestion(resp.id);
	await loadQuestion();
	after_question();
}

/**
 * Delete chosen question, choose -1
 * (when DELETE QUESTION is clicked)
 */
async function deleteQuestion() {
	if (NEED_SAVE) return pleaseSave();
	before_question();
	await POST('/quiz-panel/admin/quiz-editor/deleteQuestion', { id: CHOSEN_QUESTION });
	await chooseQuestion(-1);
}

/**
 * Delete chosen answer
 * (when DELETE ANSWER is clicked)
 */
async function deleteAnswer() {
	if (NEED_SAVE) return pleaseSave();
	before_question();
	await POST('/quiz-panel/admin/quiz-editor/deleteAnswer', { id: CHOSEN_ANSWER });
	chooseAnswer(-1);
	await loadQuestion();
	after_question();
}

/**
 * Save everything that chosen (even if no changes)
 * (when SAVE is clicked)
 */
async function save() {

	if (CHOSEN_QUESTION === -1) {
		// Definetely no need to save then
		return;
	}

	// Hide everything
	before_question();

	// Define what can request hold
	const req: {
		with_answer?: unknown,
		answer_id?: number,
		answer_text?: string,
		answer_coefs?: { id: number, value: number }[],
		question_id?: number,
		question_text?: string,
	} = {};

	// In case answer is chosen, save it
	if (CHOSEN_ANSWER !== -1) {
		const text = document.getElementById('EdAnswerInput') as HTMLInputElement;
		const sliders = Array.from(document.getElementsByClassName('coef-slider')) as HTMLInputElement[];
		req.with_answer = 'Yeah boy, it is';
		req.answer_id = CHOSEN_ANSWER;
		req.answer_text = text.value;

		const coefs = [];
		sliders.forEach(slider => {
			coefs[slider.dataset.id] = slider.value;
		});

		req.answer_coefs = coefs;
	}

	const text = document.getElementById('EdQuestionInput') as HTMLInputElement;
	req.question_id = CHOSEN_QUESTION;
	req.question_text = text.value;

	// Tell server to save gathered req
	await POST('/quiz-panel/admin/quiz-editor/save', req);

	// Refresh question, just in case
	await loadQuestion();

	// Dont choose any answer (no huge logic behind that decision)
	chooseAnswer(-1);

	// mmmm.. This is to update the question list, just choose the same question
	await chooseQuestion(CHOSEN_QUESTION);

	// Unhide question
	after_question();

	// Disable "Please Save!"
	unsetNeedToSave();

}

/** When buttons clicked (end) */





/** Choose CHOSEN_QUESTION, CHOSEN_ANSWER (start) */

/**
 * Set CHOSEN_ANSWER and do related stuff
 *
 * @param id Answer ID or -1
 */
function chooseAnswer(id: number) {

	CHOSEN_ANSWER = id;
	if (CHOSEN_ANSWER === -1) return;

	// Below: Give the selected answer element an outline

	const answers = Array.from(document.getElementsByClassName('answer')) as HTMLElement[];

	//  Unselect the selected
	answers.forEach(answer =>
		answer.classList.remove('selected')
	);

	// Find answer to choose
	const answer = answers.find(
		answer => id.toString() === answer.dataset.id
	);

	// Unselect it
	answer.classList.add('selected');
}

/**
 * Set CHOSEN_QUESTION, and do related stuff
 *
 * @param id Question ID or -1
 */
async function chooseQuestion(id: number) {
	CHOSEN_QUESTION = id;
	QUESTION_LIST.update(
		await POST('/quiz-panel/admin/quiz-editor/getAllQuestions') as Question[]
	);
}

/** Choose CHOSEN_QUESTION, CHOSEN_ANSWER (end) */





/** Help for saving (start) */

function pleaseSave() {
	alert('Please, save your changes');
}

function setNeedToSave() {
	toggleDisabled('EdSaveBtn', false);
	NEED_SAVE = true;
}

function unsetNeedToSave() {
	toggleDisabled('EdSaveBtn', true);
	NEED_SAVE = false;
}

function toggleDisabled(id: string, state: boolean) {
	const btn = document.getElementById(id) as HTMLButtonElement;
	btn.disabled = state;
}

/** Help for saving (end) */





/** Animation (start) */

function before_question() {
	hide('EdQuestion');
	hide('EdAnswerEditor');
}

function before_answer() {
	hide('EdAnswerEditor');
}

function after_question() {
	show('EdQuestion');
}

function after_answer() {
	show('EdAnswerEditor');
}

function hide(id: string) {
	document.getElementById(id).classList.add('hidden');
}

function show(id: string) {
	document.getElementById(id).classList.remove('hidden');
}

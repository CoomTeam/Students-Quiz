import { POST, createElem } from './utils';

//Used in ResultSelect class
interface Option {
	text: string,
	callback: () => any,
}

//Used in ResultSelect class
interface Result {
	id?: number,
	name?: string,
	description?: string,
}

class ResultSelect {
	private elSelect: HTMLElement;
	private elSelection: HTMLElement;
	private elOptions: HTMLElement;
	private defaultText: string;

	//Adding list element to the result editor page
	constructor (elContainer: HTMLElement, text: string) {
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

	/**
	 *
	 * Update result list
	 *
	 * @param results Array of results from the server
	 */
    updateResults(results: Result[]) {
		const options = results.map((result) => {
			const option = {
				text: result.name,
				callback: () => renderResult(result.id),
			}
			return option;
		});
		this.updateOptions(options);
	}

	/**
	 *
	 * Update the select with new options
	 *
	 * @param options Array of new options
	 */
	updateOptions (options: Option[]) {
		this.elOptions.innerHTML = '';
		options.forEach(option => {
			const elOption = createElem('div', 'select-option', this.elOptions);
			elOption.innerText = option.text;
			elOption.addEventListener('click', () => this.onOptionClick(option));
		});
	}

	/**
	 *
	 *
	 * This is called when user clicks on the option
	 * Executes the callback of the option
	 *
	 * @param option
	 */
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

let resultList: ResultSelect;

// Of the result
let selectedID: number;


function init() {

	// Set up buttons
	const saveBtn = document.getElementById('ResEdSave');
    const newBtn = document.getElementById('ResEdNew');
    const deleteBtn = document.getElementById('ResEdDelete');
    saveBtn.addEventListener('click', saveResult);
    newBtn.addEventListener('click', newResult);
    deleteBtn.addEventListener('click', deleteResult);

	// Set up the result list
    const listContainer = document.getElementById('ResEdList')
    resultList = new ResultSelect(listContainer, 'Select result:');
    updateResultList();

}

window.addEventListener('load', init);

/**
 * Get results from server
 * Then put them into list
 */
async function updateResultList() {

    let results = await POST('/quiz-panel/admin/results-editor/getAllResults');
    resultList.updateResults(results);

}

/**
 *
 * Get result from the server
 * Render to input fields
 *
 * @param id ID of the result to fetch
 */
async function renderResult(id: number) {

	let result = await POST('/quiz-panel/admin/results-editor/getResult', {'id': id});
	showResultEditor();

    const nameInput = document.getElementById('ResEdNameInput') as HTMLInputElement;
    const descInput = document.getElementById('ResEdDescInput') as HTMLInputElement;
	const urlInput = document.getElementById('ResEdImgInput') as HTMLInputElement;


    nameInput.value = result.name;
    descInput.value = result.description;
	urlInput.value = result.url;


    selectedID = id;
}


/**
 *
 * Save the changes of input fields to the server
 * And reload the page
 */

async function saveResult() {
    const nameInput = document.getElementById('ResEdNameInput') as HTMLInputElement;
    const descInput = document.getElementById('ResEdDescInput') as HTMLInputElement;
	const urlInput = document.getElementById('ResEdImgInput') as HTMLInputElement;

    await POST('/quiz-panel/admin/results-editor/saveResult', {
        'id': selectedID,
        'name':nameInput.value,
        'description':descInput.value,
		'url':urlInput.value
    });

	location.reload();
}

/**
 * Ask server to create new result
 * Render that result
 */
async function newResult() {
    const data = await POST('/quiz-panel/admin/results-editor/newResult');
    renderResult(data.id);
}

/**
 * Delete the selected result
 */
async function deleteResult(){
    await POST('/quiz-panel/admin/results-editor/deleteResult', {
        'id': selectedID,
    });

    location.reload();
}


function showResultEditor() {
	const rshow  = document.getElementById('EdResult');
	rshow.className = '';
}

function hideResultEditor() {
	const rshow  = document.getElementById('EdResult');
	rshow.className = 'hidden';
}

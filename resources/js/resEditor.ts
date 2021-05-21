///////////////////////////////////////////

interface Option {
	text: string,
	callback: () => any,
}

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

let resultList: ResultSelect;
let selectedID: number;

function init() {
    const listContainer = document.getElementById('ResEdList')
    resultList = new ResultSelect(listContainer, 'Select result:');
    const saveBtn = document.getElementById('ResEdSave');
    const newBtn = document.getElementById('ResEdNew');
    const deleteBtn = document.getElementById('ResEdDelete');

    saveBtn.addEventListener('click', saveResult);
    newBtn.addEventListener('click', newResult);
    deleteBtn.addEventListener('click', deleteResult);

    updateResultList();
    
}

window.addEventListener('load', init);

async function updateResultList() {

    let results = await POST('/resEditor/getAllResults');
    resultList.updateResults(results);

    console.log(results);
}

async function renderResult(id: number) {
    let result = await POST('/resEditor/getResult', {'id': id});
    console.log(result);

    const nameInput = document.getElementById('ResEdNameInput') as HTMLInputElement;
    const descInput = document.getElementById('ResEdDescInput') as HTMLInputElement;

    nameInput.value = result.name;
    descInput.value = result.description;

    selectedID = id;
}

async function saveResult() {
    const nameInput = document.getElementById('ResEdNameInput') as HTMLInputElement;
    const descInput = document.getElementById('ResEdDescInput') as HTMLInputElement;

    await POST('/resEditor/saveResult', {
        'id': selectedID,
        'name':nameInput.value,
        'description':descInput.value,
    });

    location.reload();
}

async function newResult() {
    const data = await POST('/resEditor/newResult');
    renderResult(data.id);
}

async function deleteResult(){
    await POST('/resEditor/deleteResult', {
        'id': selectedID,
    });

    updateResultList();
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

/**
 * Send request to the server
 * @param url URL to send requets
 * @param body Data to send (Optional)
 * @returns Response in JSON format
 */
export async function POST(url: string, body?: Record<string, unknown>): Promise<unknown> {
	const request = {
		method: 'POST',
		body: body ? JSON.stringify(body) : undefined,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			'X-CSRF-Token': document.querySelector<HTMLInputElement>('input[name="_token"]').value
		}
	};

	const response = await fetch(url, request);
	const data = await response.json();

	return data;
}

/**
 * Create element, give it class, put it into other
 * @param elemName Tag name (like div, section)
 * @param className Class to give
 * @param putInto Element to put into
 * @returns Created element
 */
export function createElem(elemName: string, className: string, putInto: HTMLElement = null): HTMLElement {
	const elem = document.createElement(elemName);
	elem.className = className;

	if (putInto) {
		putInto.appendChild(elem);
	}

	return elem;
}


/**
 * Assign event listener of GIVEN type to the element with GIVEN id
 * @param type Event type
 * @param id Element ID
 * @param callback Function
 */
export function on(type: string, id: string, callback: () => void): void {
	const element = document.getElementById(id);
	element.addEventListener(type, callback);
}

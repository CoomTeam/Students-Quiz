/////////////////////////////// slider

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
			  s.selectedIndex = i;
			  h.innerHTML = this.innerHTML;
			  y = this.parentNode.getElementsByClassName("same-as-selected");
			  yl = y.length;
			  for (k = 0; k < yl; k++) {
				  y[k].removeAttribute("class");
				}
				this.setAttribute("class", "same-as-selected");
				onQuestionSelect(i);
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


///////////////////////////////////////////

async function onQuestionSelect(id) {
	hideQuestion();
	const question = await POST('/editor/getQuestion', {'id': id});
	renderQuestion(question);
	console.log(question);

}

async function init() {
	const questions = await POST('/editor/getAllQuestions');
	console.log(questions);
}

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

	showQuestion();
}

function showQuestion() {
	document.getElementById('question').className = '';
}

/** Hide question modal */
function hideQuestion() {
	document.getElementById('question').className = 'hidden';
}

window.addEventListener('load', init);

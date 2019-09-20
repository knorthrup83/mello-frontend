var $boardContainer = document.querySelector('.container');

var board = new Board();

function handleListCreate() {
	var listTitle = prompt('New list title') || '';

	if (listTitle.trim()) {
		board.addList(listTitle);
		renderBoard();
	}
}

function handleCardCreate(event) {
	var $listContainer = event.target.parentNode;
	var listId = Number($listContainer.getAttribute('data-id'));

	var cardText = prompt('New card text') || "";

	if (cardText.trim()) {
		board.addCard(listId, cardText);
		renderBoard();
	}
}

function handleListEdit(event) {
	var $listContainer = event.target.parentNode.parentNode;
	var listId = Number($listContainer.getAttribute('data-id'));

	var listTitle = prompt('New list title') || '';

	if (listTitle.trim()) {
		board.editList(listId, listTitle); 
		renderBoard();
	}
}

function handleCardEdit(event) {
	var cardId = Number(event.target.getAttribute('data-id'));

	var cardText = prompt('New card text') || '';

	if (cardText.trim()) {
		board.editCard(cardId, cardText);
		renderBoard();
	}
}

function renderBoard() {
	$boardContainer.innerHTML = '';
	board.lists.forEach(function(list, index) {
	  	var $listContainer = document.createElement('div');
	  	$listContainer.className = 'list';
	  	$listContainer.setAttribute('data-id', list.id);

		var $header = document.createElement('header');


		var $headerButton = document.createElement('button');
		$headerButton.textContent = list.title;
		$headerButton.addEventListener('click', handleListEdit);

		var $cardUl = document.createElement('ul');

		list.cards.forEach(function(card) {
			var $cardLi = document.createElement('li');

			var $cardButton = document.createElement('button');
			$cardButton.textContent = card.text;
			$cardButton.setAttribute('data-id', card.id);
			$cardButton.addEventListener('click', handleCardEdit);

			$cardLi.appendChild($cardButton);
			$cardUl.appendChild($cardLi);
		});

		var $addCardButton = document.createElement('button');
		$addCardButton.textContent = 'Add a card..';
		$addCardButton.addEventListener('click', handleCardCreate);

		$header.appendChild($headerButton);
		$listContainer.appendChild($header);
		$listContainer.appendChild($cardUl);
		$listContainer.appendChild($addCardButton);
		$boardContainer.appendChild($listContainer);
	});

	var $addListContainer = document.createElement('div');
	$addListContainer.className = 'list add';

	var $addListButton = document.createElement('button');
	$addListButton.textContent = '+ Add another list';
	$addListButton.addEventListener('click', handleListCreate);

	$addListContainer.appendChild($addListButton);
	$boardContainer.appendChild($addListContainer);
}

renderBoard();

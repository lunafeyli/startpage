const url = 'duckduckgo.com/?q=&t=h_&ia=web'

const SearchBar = {
	searchBar: document.querySelector("#bar"),

	search() {
		let searchTearm = SearchBar.searchBar.value
		Utils.goToLink(`https://www.duckduckgo.com/?q=${searchTearm}&t=h_&ia=web`)
	}
}

const ClassroomLinks = {
	linkButtons: document.querySelectorAll('.classroom-link'),

	urls: {
		portugues:'https://classroom.google.com/u/1/c/MjY0ODY1MjAzMTAw',
		matematica:'https://classroom.google.com/u/1/c/MjY0MTQxOTk5MDk4',
		ciencias:'https://classroom.google.com/u/1/c/MjYzMTMxODc5MzM2',
		geografia:'https://classroom.google.com/u/1/c/MjYzMTE3NjA2OTcx',
		historia:'https://classroom.google.com/u/1/c/MjYzMTM2MDk3NjE1',
		artes:'https://classroom.google.com/u/1/c/MjY1MDk4NzQ3NDIz',
		edFisica:'https://classroom.google.com/u/1/c/MjY1MTIyNDQwNDE2',
		ingles:'https://classroom.google.com/u/1/c/MjY1MTAwNzA2NTMz',
		espanhol:'https://classroom.google.com/u/1/c/MjY1MDk0MjQ2MjU4'
	},

	prepareListener() {
		ClassroomLinks.linkButtons.forEach( e => {
			e.addEventListener('click', element => {
				let clicked = element.path[1]
				let materia = clicked.classList[1]
				let url = ClassroomLinks.urls[materia]
				Utils.goToLink(url)
			} )
		} )
	}
}

const Utils = {
	goToLink(link) {
		window.location.replace(link);
	}
}

const App = {
	init() {
		SearchBar.searchBar.addEventListener( 'keydown', element => {
			if (element.key == "Enter") {
				SearchBar.search()
			}
		} )
		ClassroomLinks.prepareListener()
	}
}

App.init()
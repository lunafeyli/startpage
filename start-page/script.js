const url = "duckduckgo.com/?q=&t=h_&ia=web"

const Storage = {
	get() {
		return JSON.parse(localStorage.getItem("startpage:sidebarlinks")) || []
	},
	set(links) {
		localStorage.setItem("startpage:sidebarlinks", JSON.stringify(links))
	}
}

const SearchBar = {
	searchBar: document.querySelector("#bar"),

	search() {
		let searchTearm = SearchBar.searchBar.value
		Utils.goToLink(`https://www.duckduckgo.com/?q=${searchTearm}&t=h_&ia=web`)
	}
}

const ClassroomLinks = {
	linkButtons: document.querySelectorAll(".classroom-link"),

	urls: {
		portugues:"https://classroom.google.com/u/1/c/MjY0ODY1MjAzMTAw",
		matematica:"https://classroom.google.com/u/1/c/MjY0MTQxOTk5MDk4",
		ciencias:"https://classroom.google.com/u/1/c/MjYzMTMxODc5MzM2",
		geografia:"https://classroom.google.com/u/1/c/MjYzMTE3NjA2OTcx",
		historia:"https://classroom.google.com/u/1/c/MjYzMTM2MDk3NjE1",
		artes:"https://classroom.google.com/u/1/c/MjY1MDk4NzQ3NDIz",
		edFisica:"https://classroom.google.com/u/1/c/MjY1MTIyNDQwNDE2",
		ingles:"https://classroom.google.com/u/1/c/MjY1MTAwNzA2NTMz",
		espanhol:"https://classroom.google.com/u/1/c/MjY1MDk0MjQ2MjU4"
	},

	prepareListener() {
		ClassroomLinks.linkButtons.forEach( e => {
			e.addEventListener("click", element => {
				let clicked = element.path[1]
				let materia = clicked.id
				let url = ClassroomLinks.urls[materia]
				Utils.goToLink(url)
			} )
		} )
	}
}

const SideBarLinks = {
	all: Storage.get(),
	addLinkInputName: document.querySelector(".add-link-input#name"),
	addLinkInputUrl: document.querySelector(".add-link-input#url"),

	addLink() {
		let name = SideBarLinks.addLinkInputName.value
		let url = SideBarLinks.addLinkInputUrl.value

		SideBarLinks.all.push(
			{
				name,
				url
			}
		)

		App.reload()
	},
	removeLink() {},
	onAddArea() {
		document.querySelector(".add-link").classList.toggle('on')
		SideBarLinks.addLinkInputName.value = ""
		SideBarLinks.addLinkInputUrl.value = "http://"
	}
}

const DOM = {
	linksContainer: document.querySelector(".side-links"),
	addLinkElement(element) {
		let li = document.createElement("li")
		li.classList.add("link")
		li.id = element.name
		li.innerHTML = DOM.innerHtmlLink(element)

		DOM.linksContainer.appendChild(li)
	},
	innerHtmlLink(element) {
		let html = `
		<span class="icon"></span>
		<span class="title">${element.name}</span>
		`

		return html
	},
	clearLinksContainer() {
		DOM.linksContainer.innerHTML = ""
	}
}

const Utils = {
	goToLink(link) {
		window.location.href = `${link}`;
	}
}

const App = {
	init() {
		DOM.clearLinksContainer()
		SideBarLinks.all.forEach( element => DOM.addLinkElement(element))
		SearchBar.searchBar.addEventListener( "keydown", element => {
			if (element.key == "Enter") {
				SearchBar.search()
			}
		} )
		SideBarLinks.addLinkInputName.addEventListener( "keydown", element => {
			if (element.key == "Enter" && SideBarLinks.addLinkInputName.value != "" && SideBarLinks.addLinkInputUrl.value != "http://") {
				SideBarLinks.addLink()
				document.querySelector(".add-link").classList.remove('on')
			}
		} )
		SideBarLinks.addLinkInputUrl.addEventListener( "keydown", element => {
			if (element.key == "Enter" && SideBarLinks.addLinkInputName.value != "" && SideBarLinks.addLinkInputUrl.value != "http://") {
				SideBarLinks.addLink()
				document.querySelector(".add-link").classList.remove('on')
			}
		} )
		ClassroomLinks.prepareListener()
		Storage.set(SideBarLinks.all)
	},
	reload() {
		App.init()
	}
}

App.init()
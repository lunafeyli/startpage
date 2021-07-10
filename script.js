const Storage = {
	get: toGet => localStorage.getItem(`startpage:${toGet}`) || "",
	set() {
		localStorage.setItem(
			"startpage:sidebarlinks",
			JSON.stringify(SideBarLinks.all)
		);
		localStorage.setItem("startpage:searchMetode", SearchBar.actualMetode);
	},
};

const Form = {
	submit(event) {
		event.preventDefault();

		let form = event.target;

		let name = form[0].value,
			url = form[1].value,
			side = form.elements.side.value

		SideBarLinks.all.push({ name, url, side })

		Form.clearFilds(form)

		SideBarLinks.onAddArea()

		App.reload();
	},

	clearFilds(form) {
		form[0].value = ""
		form[1].value = ""
		form.elements.side.forEach( e => e.checked = false )
	}
}

const SearchBar = {
	searchBar: document.querySelector("#bar"),
	metodes: document.querySelector(".metodes"),
	actualMetode: Storage.get("searchMetode"),

	search(searchTearm) {
		let itsUrl = searchTearm.includes("https://");
		let url = SearchBar.generateUrl(searchTearm);

		if (searchTearm && !itsUrl) {
			Utils.goToLink(url);
		} else {
			Utils.goToLink(`${searchTearm}`);
		}
	},

	changeMetode(element) {
		SearchBar.actualMetode = element.dataset.metodeName;

		DOM.activateMetodeElement();

		Storage.set();
	},

	generateUrl(searchTearm) {
		let url = "";

		switch (SearchBar.actualMetode) {
			case "youtube":
				url = `https://www.youtube.com/results?search_query=${searchTearm}`;
				break;

			case "duck":
				url = `https://www.duckduckgo.com/?q=${searchTearm}&t=h_&ia=web`;
				break;

			case "google":
				url = `https://www.google.com.br/search?q=${searchTearm}`;
				break;

			default:
				break;
		}

		return url;
	},
};

/*const ClassroomLinks = {
	linkButtons: document.querySelectorAll(".classroom-link a"),

	urls: {
		portugues: "https://classroom.google.com/u/1/c/MjY0ODY1MjAzMTAw",
		matematica: "https://classroom.google.com/u/1/c/MjY0MTQxOTk5MDk4",
		ciencias: "https://classroom.google.com/u/1/c/MjYzMTMxODc5MzM2",
		geografia: "https://classroom.google.com/u/1/c/MjYzMTE3NjA2OTcx",
		historia: "https://classroom.google.com/u/1/c/MjYzMTM2MDk3NjE1",
		artes: "https://classroom.google.com/u/1/c/MjY1MDk4NzQ3NDIz",
		edFisica: "https://classroom.google.com/u/1/c/MjY1MTIyNDQwNDE2",
		ingles: "https://classroom.google.com/u/1/c/MjY1MTAwNzA2NTMz",
		espanhol: "https://classroom.google.com/u/1/c/MjY1MDk0MjQ2MjU4",
	},

	updateHref() {
		ClassroomLinks.linkButtons.forEach((e) => {
			e.href = ClassroomLinks.urls[e.id];
		});
	},
};*/

const SideBarLinks = {
	all: JSON.parse(Storage.get("sidebarlinks")) || [],
	addLinkInputName: document.querySelector(".add-link-input#name"),
	addLinkInputUrl: document.querySelector(".add-link-input#url"),

	removeLink(name) {
		let toRemove = SideBarLinks.all.filter((element) => element.name == name)[0];
		toRemove = SideBarLinks.all.indexOf(toRemove);

		SideBarLinks.all.splice(toRemove, 1);

		App.reload();
	},
	onAddArea() {
		document.querySelector(".add-link").classList.toggle("on");
		SideBarLinks.addLinkInputName.value = "";
		SideBarLinks.addLinkInputUrl.value = "http://";
	},
};

const Configs = {
	colorInput: document.querySelector("#color-input"),

	changeBackgroundColor() {
		document.body.style.backgroundColor = Configs.colorInput.value;
	},
};

const DOM = {
	linksContainerLeft: document.querySelector(".side-links#left"),
	linksContainerRight: document.querySelector(".side-links#right"),

	addLinkElement(element, side) {
		let li = document.createElement("li");
		li.classList.add("link");
		li.id = element.name;
		li.innerHTML = DOM.innerHtmlLink(element);

		let linksContainer = side == "left" ? DOM.linksContainerLeft : DOM.linksContainerRight

		linksContainer.appendChild(li);
	},

	innerHtmlLink(element) {
		let html = `
		<button class="delete-button" onclick="SideBarLinks.removeLink('${element.name}')"><img src="./assets/x.svg"></button>
		<span class="icon"></span>
		<a class="link" href="${element.url}">
			<span class="title">${element.name}
		</a>
		`;

		return html;
	},

	filterLinks() {
		let leftLinks = SideBarLinks.all.filter( e => e.side == "left" ),
			rightLinks = SideBarLinks.all.filter( e => e.side == "right" )

		leftLinks.forEach((element) => DOM.addLinkElement(element, "left"));
		rightLinks.forEach((element) => DOM.addLinkElement(element, "right"));
	},

	clearLinksContainer() {
		DOM.linksContainerLeft.innerHTML = "";
		DOM.linksContainerRight.innerHTML = "";
	},

	DOMListener() {
		SearchBar.metodes.addEventListener("click", (element) =>
			SearchBar.changeMetode(element.target)
		);
	},

	activateMetodeElement() {
		let metodesEl = document.querySelectorAll(".metode");
		metodesEl.forEach((el) => {
			el.classList.remove("active");
			if (el.dataset.metodeName == SearchBar.actualMetode) {
				el.classList.add("active");
			}
		});
	},
};

const Utils = {
	goToLink(link) {
		window.location.href = link;
	},
	clearLinks() {
		localStorage.setItem("startpage:sidebarlinks", JSON.stringify([]));
		SideBarLinks.all = [];
		App.reload();
	},
};

const App = {
	init() {
		DOM.clearLinksContainer();
		DOM.DOMListener();
		App.keyboardListener();
		DOM.filterLinks();
		//ClassroomLinks.updateHref();
		Storage.set(SideBarLinks.all);
		DOM.activateMetodeElement();
	},
	reload() {
		App.init();
	},
	keyboardListener() {
		SearchBar.searchBar.addEventListener("keydown", (element) => {
			if (element.key == "Enter")
				SearchBar.search(SearchBar.searchBar.value);
		});
	},
};

App.init();

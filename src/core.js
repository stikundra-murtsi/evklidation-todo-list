import { save } from "./loader.js";

// Удаление пункта
export function rm_element(list, element) {
	let rmel = document.getElementById(`list: ${list}, element: ${element}`);
	rmel.remove();

}

// Визуальное удаление пункта
function alt_rm_el(list, element) {
	rm_element(list, element);
	save();
}

// Удаление листа
export function rm_todo(list) {
	let todo = document.getElementById(`list: ${list}`);
	todo.remove();

}

// Визуальное удаление листа
function alt_rm_todo(list) {
	rm_todo(list);
	save();
}

// Переименовывание пункта
export function rename_element(list, element, new_name) {
	let text = document.getElementById(`text, list: ${list}, element: ${element}`);
	if (new_name == "" || new_name == null) {
		text.textContent = "Безымянный";
	}
	else {
		text.textContent = new_name;
	}

}

// Переименовывание листа
export function rename_list(list, new_name) {
	let text = document.getElementById(`title, list: ${list}`);
	if (new_name == "" || new_name == null) {
		text.textContent = "Безымянный";
	}
	else {
		text.textContent = new_name;
	}
	
}

// Визуальное переименование
// Листа
export function alt_rn_lst(list) {
	let name = prompt("Введите имя листа:");
	rename_list(list, name);
	save();
}

// Пункта
export function alt_rn_el(list, element) {
	let name = prompt("Введите имя пункта:");
	rename_element(list, element, name);
	save();
}

// Создание пункта
export function add_element(list) {
	let todo = document.getElementById(`elements, list: ${list}`); // Узнаем блок с пунктами
	let el_num = todo.dataset.elnum; // Узнаем коло-во пунктов
	el_num = Number(el_num); // Перевод коло-во пунктов в число
	todo.dataset.elnum = el_num + 1;
	
	// Блок настройки пункта
	let newel = document.createElement("div");
	todo.appendChild(newel);
	newel.classList.add("todo_element");
	newel.id = `list: ${list}, element: ${el_num}`;
	newel.dataset.num = el_num;

	// Блок настройки чекбокса
	let newel_check = document.createElement("input");
	newel.appendChild(newel_check);
	newel_check.type = "checkbox";
	newel_check.classList.add("check_todo");
	newel_check.dataset.num = el_num;

	// Блок настройки наименования пункта
	let newel_title = document.createElement("p");
	newel.appendChild(newel_title);
	newel_title.textContent = `Новый пункт`;
	newel_title.id = `text, list: ${list}, element: ${el_num}`;
	newel_title.ondblclick = () => alt_rn_el(list, el_num);
	
	// Блок настройки кнопки "Удалить"
	let newel_rmbtn = document.createElement("button");
	newel.appendChild(newel_rmbtn);
	newel_rmbtn.classList.add("create_todo_element");
	newel_rmbtn.classList.add("remove_todo_element");
	newel_rmbtn.textContent = "Удалить";
	newel_rmbtn.onclick = () => alt_rm_el(list, el_num);	
}

function alt_add_el(list) {
	add_element(list);
	save();
}

// Создание листа
export function create_todo() {
	let helper = document.getElementById("helper");
	let generaldiv = document.createElement("div");
	let list_num = helper.dataset.listnum;
	list_num = Number(list_num);
	helper.dataset.listnum = list_num + 1;

	generaldiv.classList.add("todo");
	helper.appendChild(generaldiv);
	generaldiv.id = `list: ${list_num}`;
	generaldiv.dataset.num = list_num;

	// Блок настройки названия листа
	let gendiv_title = document.createElement("p");
	generaldiv.appendChild(gendiv_title);
	gendiv_title.textContent = "Новый лист";
	gendiv_title.classList.add("todo_title");
	gendiv_title.id = `title, list: ${list_num}`;
	gendiv_title.ondblclick = () => alt_rn_lst(list_num);
	
	// Блок настройки области пунктов
	let gendiv_subdiv = document.createElement("div");
	generaldiv.appendChild(gendiv_subdiv);
	gendiv_subdiv.dataset.elnum = 0;
	gendiv_subdiv.id = `elements, list: ${list_num}`;

	// Блок настройки области кнопок
	let gendiv_btndiv = document.createElement("div");
	generaldiv.appendChild(gendiv_btndiv);
	gendiv_btndiv.classList.add("todo_buttons");

	// Блок настройки кнопки добавления пункта
	let btndiv_addbtn = document.createElement("button");
	gendiv_btndiv.appendChild(btndiv_addbtn);
	btndiv_addbtn.onclick = () => alt_add_el(list_num);
	btndiv_addbtn.classList.add("create_todo_element");
	btndiv_addbtn.textContent = "Добавить";

	// Блок настройки удаления листа
	let btndiv_rmbtn = document.createElement("button");
	gendiv_btndiv.appendChild(btndiv_rmbtn);
	btndiv_rmbtn.onclick = () => alt_rm_todo(list_num);
   btndiv_rmbtn.classList.add("create_todo_element");
	btndiv_rmbtn.classList.add("remove_todo_element");
   btndiv_rmbtn.textContent = "Удалить";
	
}

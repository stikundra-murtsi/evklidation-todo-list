import { create_todo, add_element, rename_list, rename_element, rm_todo } from "./core.js";

// Функция сохранения
export function save() {
	let lists = document.querySelectorAll(".todo"); // Узнаем все листы
	let all_lists_count = lists.length; // Узнаем коло-во всех листов
	let lists_save = []; // Формируем форму сохранения (Коло-во листов, все листы)
	
	// Узнаем все листы (the_list - это номер проверяемого листа)
	for (let the_list = 0; the_list < all_lists_count; the_list++) {
		let gen_div = document.getElementById(`list: ${the_list}`); // Узнаем главный div
		
		// Проверка: если главного div'а не существует - пропускаем иттерацию
		if (gen_div == null) {
			continue;
		}

		let sub_div = document.getElementById(`elements, list: ${the_list}`); // Узнаем div для пунктов
		let el_all = sub_div.querySelectorAll(".todo_element"); // Создаем массив со всеми пунктами
		let el_all_num = el_all.length; // Узнаем число пунктов
		
		// Узнаем название листа
		let list_text = document.getElementById(`title, list: ${the_list}`);
		let list_title = list_text.textContent;

		let all_elements = []; // Массив пунктов
		
		// Узнаем все пункты данного листа
		for (let el_num = 0; el_num < el_all_num; el_num++) {
			let the_el = el_all[el_num]; // Узнаем нужный нам объект пункта
			let the_real_num = the_el.dataset.num;

			// Узнаем название пункта
			let the_el_text = document.getElementById(`text, list: ${the_list}, element: ${the_real_num}`);
			let the_el_title = the_el_text.textContent;
			
			// Узнаем чекбокс данного пункта
			let checkbox = the_el.querySelector(".check_todo");
			let cheсked = checkbox.checked;
			
			// Создаем форму данных о пункте
			let element = {title: the_el_title, checked: cheсked};
			all_elements.push(element); // Загружаем данные в массив
		}
		
		// Создаем форму данных о листе
		let obj_list = {title: list_title, elements: all_elements};
		lists_save.push(obj_list); // Загружаем данные в массив
	}
	
	// Сохранение
	
	let save_json = JSON.stringify(lists_save); // Записываем форму сохранения в JSON формат
	localStorage.setItem("ToDo", save_json); // Сохраняем JSON-форму в локальное хранилище
	console.log("saved");
}

// Функция загрузки
function load() {

	// Удаление первоначальных листов
	let now_all_lists = document.querySelectorAll(".todo"); // Узнаем все листы в начальном пространстве
	
	// Само удаление
	for (let list_num = 0; list_num < now_all_lists.length; list_num++) {
		let helper = document.getElementById("helper"); // Узнаем хелпер в первоначальном пространстве
		helper.dataset.listnum = 0; // Обнуляем число листов в хелпере
		let this_list = now_all_lists[list_num]; // Узнаем данный лист
		let real_list_num = Number(this_list.dataset.num); // Узнаем реальное число данного листа
		rm_todo(real_list_num); // Удаляем данный лист
	}
	
	// Загрузка сохраненных листов
	let load_json = localStorage.getItem("ToDo"); // Получаем JSON файл листов из локального хранилища
	let lists = JSON.parse(load_json); // Парсинг JSON файла и получение массива с сохраненными листами

	// Создание новых листов на основе сохраненных данных
	for (let list_num = 0; list_num < lists.length; list_num++) {
		create_todo(); // Создаем пустышку
		let loaded_list = lists[list_num]; // Получаем загруженный лист 

		// Меняем титул листа
		rename_list(list_num, loaded_list.title)

		// Загрузка сохраненных пунктов
		let all_elements = loaded_list.elements; // Получаем все сохраненные пункты

		// Создание пунктов на основе сохраненных данных
		for (let el_num = 0; el_num < all_elements.length; el_num++) {
			add_element(list_num); // Создаем пустышку
			let loaded_el = all_elements[el_num]; // Получаем загруженный пункт
			let this_el = document.getElementById(`list: ${list_num}, element: ${el_num}`); // Узнаем данный пункт
			// Меняем титул
			rename_element(list_num, el_num, loaded_el.title);
			
			// Настраиваем чекбокс на основе сохраненного
			let checkbox_this_el = this_el.querySelector(".check_todo");
			checkbox_this_el.checked = loaded_el.checked;
		}
	}
	console.log("loaded");
}

load();

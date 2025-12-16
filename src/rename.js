export function rename(first_name) {
	return new Promise((resolve, reject) => {
		if (document.getElementById("rename_div")) {
			reject();
			return;
		}
		
		let helper = document.getElementById("head");

		let div = document.createElement("div");
		div.id = "rename_div";
		div.classList.add("rename");
		helper.appendChild(div);
		
		let div_text = document.createElement("p");
		div_text.textContent = "Переименовать:";
		div.appendChild(div_text);
		
		let div_input = document.createElement("input");
		div.appendChild(div_input);
		div_input.classList.add("rename_input");
		div_input.type = "text";
		div_input.value = first_name;
		div_input.focus();
		div_input.select();
		
		let div_btn_helper = document.createElement("div");
		div_btn_helper.classList.add("todo_buttons");
		div.appendChild(div_btn_helper);
		
		let div_button = document.createElement("button");
		div_button.textContent = "Переименовать";
		div_button.classList.add("create_todo_element");
		div_button.classList.add("remove_todo_element");
		div_btn_helper.appendChild(div_button);
		
		div_input.addEventListener("keydown", e => {
			if (e.key === "Enter") {
				e.preventDefault();
				div_button.click();
			}
		})

		div_button.onclick = () => {
			const value = div_input.value;
			div.remove();
			resolve(value);
		};
	});
}

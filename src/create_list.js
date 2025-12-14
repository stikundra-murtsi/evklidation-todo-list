import { create_todo } from "./core.js";
import { save } from "./loader.js";

function alt_create_todo() {
	create_todo();
	save();
}

let createbtn = document.getElementById("create_list");
createbtn.onclick = () => alt_create_todo();

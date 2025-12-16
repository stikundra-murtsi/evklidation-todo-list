const helper = document.getElementById("helper");

helper.addEventListener('change', (ev) => {
	let target = ev.target;

	if (target.tagName === 'INPUT' && target.type === 'checkbox') {
		let list_num = target.dataset.list;
		let el_num = target.dataset.num;
		list_num = Number(list_num);
		let list = document.getElementById(`elements, list: ${list_num}`);
		let element = document.getElementById(`list: ${list_num}, element: ${el_num}`);
		if (target.checked) {
			list.appendChild(element);
		} else {
			list.insertBefore(element, list.firstChild);
		}
	}
})

export function press_listener(el, callback) {
	let lasttap = 0;

	el.addEventListener('dblclick', (e) => { callback(e) });

	el.addEventListener('touchend', (e) => {
		const currentTime = new Date().getTime();
		const tapLength = currentTime - lasttap;

		if ( tapLength < 300 && tapLength > 0) {
			callback(e);
			e.preventDefault();
		}

		lasttap = currentTime
	});
}

let muhwhat = false;

// Мухамед...
function muhamed() {
	if (muhwhat == false) {
		muhwhat = true;
		let muh = document.getElementById("muhamed");
		let muh_audio = new Audio("sounds/muhamed.mp3");
		muh_audio.preload = "auto";

		muh.src = "img/muhamed.png"
		muh_audio.play();
		setTimeout(() => {
			muh.src = "img/dbg1.jpg";
			muh_audio.pause();
			muh_audio.currentTime = 0;
			muhwhat = false;
		}, 15000);
	}
}

let muher = document.getElementById("muhamed");
muher.onclick = () => muhamed();

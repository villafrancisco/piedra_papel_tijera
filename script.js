const play = document.getElementById('play');
const rondas = document.getElementById('rondas');
const mainimage = document.getElementById('main-image');
const options = document.getElementById('options');
const player = document.getElementById('player');
const fingers = document.getElementById('fingers');
const time = document.getElementById('time');
// const exit = document.getElementById('exit');
const modal = document.getElementById('modal');
const close = document.getElementById('close');
const detail = document.getElementById('detail');
const alert = document.getElementById('alert');
const numrounds = document.getElementById('numrounds');
const selectnumround = document.getElementById('select-numround');
// const replay = document.getElementById('replay');

let countrondas = '1';
const selection = ['piedra', 'papel', 'tijeras'];
let playerselection = '';
let numrondas = '1';

//Mostrar modal
const showModal = () => {
	modal.classList.add('modal--show');
};
//Ocultal modal
const hideModal = () => {
	modal.classList.remove('modal--show');
};

const resetPlay = () => {
	count = 3;
	time.innerHTML = count;
	playerselection = '';
	for (const finger of fingers.children) {
		finger.classList.remove('hide');
	}
};
const showResult = (text) => {
	const p = document.createElement('P');
	p.textContent = text;
	detail.append(p);
};
const win = () => {
	alert.innerHTML = '<p>Has ganado</p>';
	alert.classList.add('modal--show');
	setTimeout(() => {
		alert.innerHTML = '';
		alert.classList.remove('modal--show');
		//options.classList.remove('hide');
		//player.classList.add('hide');
	}, 2000);
	console.log('numero de rondas para jugar: ' + numrondas);
	console.log('numero de rondas jugadas : ' + countrondas);
	countrondas++;
	if (numrondas >= countrondas) {
		//volver a jugar
		console.log('volver a jugar');
		resetPlay();
		options.classList.add('hide');
		player.classList.remove('hide');

		countFunction();
	} else {
		//fin del juego
		console.log('fin del juego');
		options.classList.remove('hide');
		player.classList.add('hide');
	}
};
const lose = () => {
	alert.innerHTML = '<p>Has perdido</p>';
	alert.classList.add('modal--show');
	setTimeout(() => {
		alert.innerHTML = '';
		alert.classList.remove('modal--show');
		//options.classList.remove('hide');
		//player.classList.add('hide');
	}, 2000);
	console.log('numero de rondas para jugar: ' + numrondas);
	console.log('numero de rondas jugadas : ' + countrondas);
	countrondas++;
	if (numrondas >= countrondas) {
		//volver a jugar
		console.log('volver a jugar');
		resetPlay();
		options.classList.add('hide');
		player.classList.remove('hide');

		countFunction();
	} else {
		//fin del juego
		console.log('fin del juego');
		options.classList.remove('hide');
		player.classList.add('hide');
	}
};

const compareFingers = (playerfinger, pcfinger) => {
	if (playerfinger == '' || playerfinger == 'undefined') {
		//No ha elegido ninguna opcion el jugador

		alert.innerHTML = '<p>Se acabo el tiempo, has perdido</p>';
		alert.classList.add('modal--show');
		setTimeout(() => {
			alert.innerHTML = '';
			alert.classList.remove('modal--show');
			options.classList.remove('hide');
			player.classList.add('hide');
		}, 2000);
		countrondas++;
	} else {
		if (playerfinger == pcfinger) {
			//Han empatado vuelven a reintentar
			alert.innerHTML = '<p>Habéis empatado, vuelve a intentarlo</p>';
			alert.classList.add('modal--show');
			setTimeout(() => {
				alert.innerHTML = '';
				alert.classList.remove('modal--show');
				resetPlay();
				countFunction();
			}, 2000);

			// replay.classList.add('hide');
			// exit.classList.add('hide');
		} else {
			console.log(playerfinger);
			console.log(pcfinger);
			if (playerfinger == 'papel' && pcfinger == 'piedra') {
				win();
			} else if (playerfinger == 'papel' && pcfinger == 'tijeras') {
				lose();
			} else if (playerfinger == 'piedra' && pcfinger == 'papel') {
				lose();
			} else if (playerfinger == 'piedra' && pcfinger == 'tijeras') {
				win();
			} else if (playerfinger == 'tijeras' && pcfinger == 'papel') {
				win();
			} else if (playerfinger == 'tijeras' && pcfinger == 'piedra') {
				lose();
			}
		}
	}
};

const countFunction = () => {
	let count = 3;

	let c = setInterval(() => {
		if (count == 0) {
			clearInterval(c);
			let pcselection = Math.floor(Math.random() * 3) + 1;
			time.innerHTML = '';
			const img = document.createElement('IMG');
			img.setAttribute('src', 'images/' + selection[pcselection - 1] + '.png');
			time.append(img);

			compareFingers(playerselection, selection[pcselection - 1]);

			// compareFingers(playerselection, pcselection);
		} else {
			time.innerHTML = count;
			count = count - 1;
		}
	}, 1000);
};

fingers.addEventListener('click', (e) => {
	if (e.target.nodeName == 'IMG') {
		const elements = document.querySelectorAll('.fingers img:not(#' + e.target.id + ')');
		for (const element of elements) {
			element.classList.add('hide');
			playerselection = e.target.id;
		}
	}
});

play.addEventListener('click', (e) => {
	countrondas = 1;
	resetPlay();
	options.classList.add('hide');
	player.classList.remove('hide');

	countFunction();

	// replay.classList.add('hide');
	// exit.classList.add('hide');
});

// replay.addEventListener('click', (e) => {
// 	resetPlay();
// 	countFunction();
// 	replay.classList.add('hide');
// 	exit.classList.add('hide');
// });

close.addEventListener('click', (e) => {
	hideModal();
	detail.lastElementChild.innerHTML = '';
});

rondas.addEventListener('click', (e) => {
	numrounds.classList.add('modal--show');
});

selectnumround.addEventListener('change', (e) => {
	numrounds.classList.remove('modal--show');
	numrondas = e.target.value;
});

// exit.addEventListener('click', (e) => {
// 	options.classList.toggle('hide');
// 	player.classList.toggle('hide');
// });

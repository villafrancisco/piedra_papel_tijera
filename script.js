const btnplay = document.getElementById('play');
const rondas = document.getElementById('rondas');
const options = document.getElementById('options');
const player = document.getElementById('player');
const fingers = document.getElementById('fingers');
const time = document.getElementById('time');
const alert = document.getElementById('alert');
const numrounds = document.getElementById('numrounds');
const selectnumround = document.getElementById('select-numround');

const selection = ['piedra', 'papel', 'tijeras'];

let contadorrondas = '1';
let numrondaselegidas = '1';
let playerselection = '';
let pcselection = '';
let pointsplayer = 0;
let pointspc = 0;

//Inicializamos la cuenta atras y mostramos todas los dedos
const resetPlay = () => {
	count = 3;
	time.innerHTML = count;
	playerselection = '';
	for (const finger of fingers.children) {
		finger.classList.remove('hide');
	}
};
//Empezamos una nueva cuenta atras
const play = () => {
	resetPlay();
	options.classList.add('hide');
	player.classList.remove('hide');
	countFunction();
};
//Dibujamos la cuenta atras y la seleccion de los dedos de la máquina
const countFunction = () => {
	let count = 3;
	let c = setInterval(() => {
		if (count == 0) {
			clearInterval(c);
			pcselection = Math.floor(Math.random() * 3) + 1;
			time.innerHTML = '';
			const img = document.createElement('IMG');
			img.setAttribute('src', 'images/' + selection[pcselection - 1] + '.png');
			time.append(img);
			compareFingers(playerselection, selection[pcselection - 1]);
		} else {
			time.innerHTML = count;
			count = count - 1;
		}
	}, 1000);
};

//Comparamos los dedos del jugador con el de la máquina
const compareFingers = (playerfinger, pcfinger) => {
	if (playerfinger == pcfinger) {
		//Han empatado vuelven a reintentar
		alert.innerHTML = '<p>Habéis empatado, vuelve a intentarlo</p>';
		alert.classList.add('modal--show');
		setTimeout(() => {
			alert.innerHTML = '';
			alert.classList.remove('modal--show');
			play();
		}, 2000);
	} else {
		//Preguntamos quien ha ganado la jugada
		if ((playerfinger == 'papel' && pcfinger == 'piedra') || (playerfinger == 'piedra' && pcfinger == 'tijeras') || (playerfinger == 'tijeras' && pcfinger == 'papel')) {
			//gana la jugada el jugador
			pointsplayer++;
			alert.innerHTML = '<p>Has ganado</p>';
		} else if ((playerfinger == 'papel' && pcfinger == 'tijeras') || (playerfinger == 'piedra' && pcfinger == 'papel') || (playerfinger == 'tijeras' && pcfinger == 'piedra')) {
			//gana la jugada la máquina
			pointspc++;
			alert.innerHTML = '<p>Has perdido</p>';
		} else if (playerfinger == '' || playerfinger == 'undefined') {
			//gana la jugada la máquina
			pointspc++;
			alert.innerHTML = '<p>Se acabo el tiempo, has perdido</p>';
		}
		alert.classList.add('modal--show');
		//Este setTimeout es para que me deje ver durante unos segundos quien ha ganado la jugada
		setTimeout(() => {
			alert.innerHTML = '';
			alert.classList.remove('modal--show');

			contadorrondas++;
			//Si aún no hemos llegado al numero de rondas elegidas seguimos jugando
			if (numrondaselegidas >= contadorrondas) {
				//volver a jugar
				resetPlay();
				options.classList.add('hide');
				player.classList.remove('hide');

				countFunction();
			} else {
				//Hemos llegado al final de rondas
				//Si solo era una ronda, mostramos quien ha ganado
				if (numrondaselegidas == 1) {
					options.classList.remove('hide');
					player.classList.add('hide');
				} else {
					//Si era mas de una ronda, mostramos el resultado final

					let msj = '';
					if (pointsplayer > pointspc) {
						msj = '<p>Has ganado</p>';
					} else {
						msj = '<p>Has perdido</p>';
					}
					alert.innerHTML = msj + '<p>Resultado final:</><p>Jugador : ' + pointsplayer + '</p><p>Máquina : ' + pointspc + '</p>';
					alert.classList.add('modal--show');
					//Este setTimeout es para que me deje ver el resultado unos segundos
					setTimeout(() => {
						options.classList.remove('hide');
						player.classList.add('hide');
						alert.classList.remove('modal--show');
					}, 3000);
				}
			}
		}, 2000);
	}
};

//Mostramos solo los dedos que el jugador haya elegido
fingers.addEventListener('click', (e) => {
	if (e.target.nodeName == 'IMG') {
		const elements = document.querySelectorAll('.fingers img:not(#' + e.target.id + ')');
		for (const element of elements) {
			element.classList.add('hide');
			playerselection = e.target.id;
		}
	}
});

//Empezamos el juego, si el usuario no ha elegido el numero de rondas jugamos con 1 sola ronda
btnplay.addEventListener('click', (e) => {
	contadorrondas = 1;
	pointspc = 0;
	pointsplayer = 0;
	play();
});

//Mostramos para elegir el numero de rondas
rondas.addEventListener('click', (e) => {
	numrounds.classList.add('modal--show');
});

//Guardamos el numero de rondas que vamos a jugar
selectnumround.addEventListener('change', (e) => {
	numrounds.classList.remove('modal--show');
	numrondaselegidas = e.target.value;
});

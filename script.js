$(document).ready(function () {
	let memory = [];
	let p = 0;
	let x = 0;
	let startLoop;
	let code;
	for (let i = 0; i < 10; i++) {
		memory.push(0);
	}

	function init() {
		memory = [];
		p = 0;
		x = 0;
		startLoop = 0;
		code = '';
		for (let i = 0; i < 10; i++) {
			memory[i] = 0;
		}
		document.querySelector("#output").innerHTML = "";

	}

	function parseCharacter(c) {
		switch (c) {
			case '>':
				p++;
				x++;
				break;
			case '<':
				p--;
				x++;
				break;
			case '+':
				memory[p]++;
				x++;
				break;
			case '-':
				x++;
				memory[p]--;
				break;
			case '[':
				startLoop = p;
				if (memory[p] === 0) {
					// console.log(code.slice(x))
					x = code.slice(x).split("").findIndex(k => k == ']');
				} else {
					x++;
				}
				break;
			case ']':
				if (memory[p] === 0) {
					x++;
				} else {
					for (let i = x; i > 0; i--) {
						if (code[i] === '[') {
							x = i;
						}
					}
				}
				break;
			case '.':
				print(String.fromCharCode(memory[p]));
				console.log(memory[p])
				x++;
				break;

			// case ',':
			//   
			//   break;

			default:
				print("!");
				break;
		}
		console.log(memory);
	}


	function print(x) {
		document.getElementById("output").innerHTML += x;
	}

	$('#input').submit(function (event) {
		event.preventDefault();
		init();

		code = $('#main').val();
		code = code.replace(/[^+-.,\]\[<>]/g, "");

		console.log(code.replace(/(\r\n|\n|\r)/gm, ""));

		while (x !== code.length - 1) {
			parseCharacter(code[x])
		}

		// $('#main').val('');
		$('#main').focus();
	});

});

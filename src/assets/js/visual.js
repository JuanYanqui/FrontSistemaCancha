class Projeto {
	constructor(nome, href, id) {
		const liElemento = document.createElement("li");
		const linkElemento = document.createElement("a");
		liElemento.id = id;
		linkElemento.href = href;
		linkElemento.target = "_blank";
		linkElemento.innerText = nome;
		liElemento.appendChild(linkElemento);
		return liElemento;
	}
}

class Imagem {
	constructor(img, id) {
		const imgElemento = document.createElement("img");
		imgElemento.src = img;
		imgElemento.id = id;
		return imgElemento;
	}
}

/*Adicionar os projetos na lista*/
const elementoLista = document.querySelector("#lista");
const projetos = [
	new Projeto(
		"AluraFlix",
		"https://codepen.io/sergiojunior13/full/PojEbOv",
		"aluraflix"
	),
	new Projeto(
		"Mentalista",
		"https://codepen.io/sergiojunior13/full/KKqydZe",
		"mentalista"
	),
	new Projeto(
		"Super Trunfo",
		"https://codepen.io/sergiojunior13/full/MWoXowW",
		"super-trunfo"
	),
	new Projeto("Cronômetro", "https://cronometronline.netlify.app", "cronometro"),
	new Projeto(
		"Gerador de Degradê",
		"https://css-tools.netlify.app/gradient-generator",
		"gerador-degrade"
	),
	new Projeto(
		"Conversor de Anos-Luz",
		"https://codepen.io/sergiojunior13/full/oNwGgvw",
		"conversor-anos-luz"
	),
	new Projeto(
		"Conversor de Moedas",
		"https://codepen.io/sergiojunior13/full/ZEyJGJR",
		"conversor-moeda"
	),
	new Projeto(
		"Conversor de Temperatura",
		"https://codepen.io/sergiojunior13/full/WNOEOaP",
		"conversor-temperatura"
	),
	new Projeto(
		"Conversor de Texto",
		"https://conversor-letras.netlify.app",
		"conversor-texto"
	),
	new Projeto(
		"Lista de Tarefas",
		"https://listatarefa.netlify.app",
		"lista-tarefa"
	),
	new Projeto(
		"Calculadora de Média",
		"https://codepen.io/sergiojunior13/full/rNwwqRb",
		"calculadora-media"
	)
];
elementoLista.append(...projetos);

/*Adicionar as imagens na div*/

const divImgElemento = document.querySelector("#imagens");
const imagens = [
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/aluraFlix.png",
		"aluraflix"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/descubraNumero.png",
		"mentalista"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/trunfo.png",
		"super-trunfo"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/cronometro.jpeg",
		"cronometro"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/gradient-generator.jpeg",
		"gerador-degrade"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/conversorAnosLuz.png",
		"conversor-anos-luz"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/conversorMoeda.png",
		"conversor-moeda"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/conversorTemperatura.png",
		"conversor-temperatura"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/conversorTexto.png",
		"conversor-texto"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/ListaTarefa.png",
		"lista-tarefa"
	),
	new Imagem(
		"https://github.com/SergioJunior13/Imagens/raw/main/calculadoraMedia.png",
		"calculadora-media"
	)
];

/*Mostrar ou Ocultar as Imagens*/

projetos.map((projeto) => {
	projeto.setAttribute("onmouseenter", "mostrarImagem(event)");
	projeto.setAttribute("onmouseleave", "ocultarImagem(event)");
});

function mostrarImagem(event) {
	var idProjeto = event.target.id;
	imagens.map((imagem) => {
		if (imagem.id === idProjeto) {
			setTimeout(() => {
				divImgElemento.appendChild(imagem);
				setTimeout(() => (imagem.style.opacity = 1), 10);
			}, 200);
		}
	});
}

function ocultarImagem(event) {
	var idProjeto = event.target.id;
	imagens.map((imagem) => {
		if (imagem.id === idProjeto) {
			imagem.style.opacity = 0;
			setTimeout(() => divImgElemento.removeChild(imagem), 200);
		}
	});
}

/*Alterar Tema*/

function alterarTema() {
	document.body.classList.toggle("dark");
}
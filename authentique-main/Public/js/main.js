const documentos = require("../../Database/documentos");

const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

function setInputValue(titulo, email, texto) {
	document.getElementById('Titulo').value =  titulo;
	document.getElementById('email').value = email;
	document.getElementById('Doc').value = texto;
}
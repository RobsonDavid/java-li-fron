function validaUsuario() {
    console.log("validausuario");
    let userTxt = localStorage.getItem("userLogged");

    if (!userTxt) {
        window.location = "index.html"
    }

    let user = JSON.parse(userTxt);


    document.getElementById("fotoUser").innerHTML = `<img src="${user.foto}" class="mr-3" alt="${user.name}">`;
    document.getElementById("dadosUser").innerHTML = `${user.name} :  ${user.racf}`;
    //buscarUsuarios();
    buscarParceiros();
    buscaTop10();


}

function logout() {
    localStorage.removeItem("userLogged");
    window.location = "index.html"
}

function buscarParceiros() {

    let msg = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch("http://localhost:8080/agente/lista", msg)
        .then(res => res.json())
        .then(res => exibirParceiros(res))
}


function exibirParceiros(lista) {
    /*     let opcoes='';
        for(let i =0; i <lista.length; i++){
            opcoes = opcoes + `<option value = ${lista[i].idAgente}>${lista[i].nome}</option>`
        }
    
    document.getElementById("selUser").innerHTML = opcoes; */

    let opcoes = '';
    for (let i = 0; i < lista.length; i++) {
        opcoes = opcoes + ` <option value=${lista[i].id}>${lista[i].volumeTransacional} - ${lista[i].nome}</option>`;
    }

    document.getElementById("selUser").innerHTML = opcoes;

}


function buscaTop10() {

    let msg = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch("http://localhost:8080/agente/top10", msg)
        .then(res => res.json())
        .then(res => exibeTop10(res))
}


function exibeTop10(lista) {
    /*     let opcoes='';
        for(let i =0; i <lista.length; i++){
            opcoes = opcoes + `<option value = ${lista[i].idAgente}>${lista[i].nome}</option>`
        }
    
    document.getElementById("selUser").innerHTML = opcoes; */

    let opcoes = '<ul class="list-group">';

    for (let i = 0; i < lista.length; i++) {
        opcoes = opcoes + ` <li class="list-group-item">${lista[i].nome} - ${lista[i].volumeTransacional}</li>`;
    }
    opcoes = opcoes + '</ul>';

    document.getElementById("corpo").innerHTML = opcoes;

}



function mostraConsolidado() {

    let msg = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }

    var e = document.getElementById("selUser");
    var agente = e.value;
    console.log(agente);

    fetch("http://localhost:8080/transacoes/id/" + agente, msg)
        .then(res => res.json())
        .then(res => exibeConsolidado(res))
}

function exibeConsolidado(lista) {
    let opcoes = '';
    let vStatus = ['Sucesso', 'Falha', 'Fraude'];

    /*     if (lista.length > 0) {
            opcoes = `<div class="card"style="width: 18rem;">`;
            opcoes = opcoes + `<div class="card-header"><h4 class="card-header">${lista[0].agente}</h4></div>`;
        
        for (let i = 0; i < lista.length; i++) {
            opcoes = opcoes + `<div class="card-body">`;
            opcoes = opcoes + `<blockquote class="blockquote mb-0">`;
            opcoes = opcoes + `<p>${vStatus[lista[i].status]}</p>`;
            opcoes = opcoes + `<footer class="blockquote-footer">${lista[i].count}</footer>`;
            opcoes = opcoes + `</blockquote></div>`;
        }
        opcoes = opcoes + `</div>`;
    } else {
        opcoes = `Sem transações para esse Agente`;
    } */

    if (lista.length > 0) {
        opcoes = opcoes + `<div class="card" style="width: 18rem;">`;
        
        
        for (let i = 0; i < lista.length; i++) {
            opcoes = opcoes + `<div class="card-body">`;
            if (i == 0) {
                opcoes = opcoes + `<h4 class="card-title">${lista[i].agente}</h4>`;
            }
            /* opcoes = opcoes + `<img src="/img/${vStatus[lista[i].status]}.jpeg" class="card-img-top">`; */
            
            opcoes = opcoes + `<h5 class="card-title">${vStatus[lista[i].status]}</h5>`;
            opcoes = opcoes + `<h5 class="card-title" align=right>${lista[i].count}</h5>`;
            opcoes = opcoes + `</div>`;
        }
        opcoes = opcoes + `</div > `;
    } else {
        opcoes = `Sem dados para esse agente`;
    }

    document.getElementById("corpo").innerHTML = opcoes;

}

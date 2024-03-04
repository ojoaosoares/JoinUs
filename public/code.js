document.addEventListener('DOMContentLoaded', function() {
    let searchParam = new URLSearchParams(window.location.search);
    
    if (searchParam.get("erro") == "true") {

        let titulo = document.querySelector("#insertResponse .modal-header .modal-title");

        titulo.classList.add("text-danger");
        titulo.innerHTML = "Operação Mal-sucedida. ";

        

        let corpo = document.querySelector("#insertResponse .modal-body");

        if (searchParam.get("code") == "3819") corpo.innerHTML = "<p>Email inválido.</p>";
        else if (searchParam.get("code") == "1062") corpo.innerHTML = "<p>Este email já foi cadastrado.</p>"
        else corpo.innerHTML += "<p>Algo inesperado aconteceu.</p>"

        document.querySelector("#insertResponse .modal-footer .btn").classList.add("btn-danger");
        
        var myModal = new bootstrap.Modal(document.getElementById('insertResponse'));
        myModal.show();
    }
    
    else if (searchParam.get("erro") == "false") {


        let titulo = document.querySelector("#insertResponse .modal-header .modal-title");

        titulo.classList.add("text-success");
        titulo.innerHTML = "Operação Bem-sucedida";

        document.querySelector("#insertResponse .modal-body").innerHTML = "<p>O email foi cadastrado com sucesso!</p>";
        document.querySelector("#insertResponse .modal-footer .btn").classList.add("btn-success");


        var myModal = new bootstrap.Modal(document.getElementById('insertResponse'));
        myModal.show();
    }
    
});
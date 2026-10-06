
async function buscarPessoas() {
    const respostaGet = await fetch("http://localhost:3000/pessoa")
    const pessoa = respostaGet.json();
    const lista = document.getElementById("pessoa");


lista.innerHTML = "";

pessoa.forEach(pessoa => {
    lista.innerHTML += `
            <div>
                <div>
                    <h3>${pessoa.nome}</h3>
                    <p>email: ${pessoa.email}</p>
                </div>

                <div>
                    <input type="text" id="putNome-${pessoa.id}" value="${pessoa.nome}" required>
                    <input type="text" id="putEmail-${pessoa.id}" value="${pessoa.email}" required>
                    <button type="button" onclick="atualisarPessoas(${pessoa.id})">Atualizar</button>
                </div>

                <div>
                    <button type="button" onclick="deletarPessoas(${pessoa.id})">Deletar</button>
                </div>

            </div>
        `;
    });
}

async function cadastrarPessoas(event) {
    event.preventionDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const dados = {
        nome: nome,
        email: email
    };

    const respostaCreate = await fetch("http://localhost:3000/pessoa",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(dados)
    });

    if (respostaCreate.ok) {
        buscarPessoas();
    }
}

async function atualizarPessoas(id) {
    
}
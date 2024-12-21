
async function enviarDadosClienteFormulario() {
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nomeCompleto').value;
    const cpf = document.getElementById('cpf').value;
    const dtNascimento = document.getElementById('dtNascimento').value;
    const primeiraSenha = document.getElementById('senha').value;
    const genero = document.querySelector('select[name="genero"]').value;

    const ddd = document.getElementById('ddd').value;
    const numeroTelefone = document.getElementById('telefone').value;
    const tipoTelefone = document.querySelector('select[name="tipoTelefone"]').value;

    return dados = {
        email,
        nome,
        cpf,
        dtNascimento,
        genero,
        primeiraSenha,
        ddd,
        numeroTelefone,
        tipoTelefone
    };
}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('btnSalvar').addEventListener('click', async function(event) {
        event.preventDefault(); 

        const clienteId = event.target.dataset.id;
        const dados = await enviarDadosClienteFormulario();
        console.log(dados);
        try {
            const response = await fetch(`/clientes/atualizar/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(response);
            }
           
            alert ('Cliente atualizado com sucesso!');
            window.location.href = '/clientes';
           
        } catch (error) {
            console.log(error.message);
            const errorMessage = error.message || error;
            alert(`Erro ao atualizar cliente: ${errorMessage}`);
        }
    });
});

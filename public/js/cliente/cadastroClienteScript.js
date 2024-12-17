async function enviarDadosFormulario() {

    const email = document.getElementById('email').value;
    const primeiraSenha = document.getElementById('primeiraSenha').value;
    const segundaSenha = document.getElementById('segundaSenha').value;
    const nome = document.getElementById('nomeCompleto').value;
    const cpf = document.getElementById('cpf').value;
    const dtNascimento = document.getElementById('dtNascimento').value;
    const genero = document.querySelector('select[name="genero"]').value;

    const ddd = document.getElementById('ddd').value;
    const numeroTelefone = document.getElementById('telefone').value;
    const tipoTelefone = document.querySelector('select[name="tipoTelefone"]').value;

    const enderecos = [];
    document.querySelectorAll('#enderecos-container').forEach((enderecoForm) => {
        const endereco = {
            cep: enderecoForm.querySelector('input[name="cep"]').value,
            numero: enderecoForm.querySelector('input[name="numeroEndereco"]').value,
            tiporesidencia: enderecoForm.querySelector('input[name="tiporesidencia"]').value,
            logradouro: enderecoForm.querySelector('input[name="logradouro"]').value,
            tipoLogradouro: enderecoForm.querySelector('input[name="tipoLogradouro"]').value,
            bairro: enderecoForm.querySelector('input[name="bairro"]').value,
            fraseCurta: enderecoForm.querySelector('input[name="fraseCurta"]').value,
            observacao: enderecoForm.querySelector('input[name="observacao"]').value,
            cidade: enderecoForm.querySelector('input[name="cidade"]').value,
            estado: enderecoForm.querySelector('input[name="estado"]').value,
            nomePais: enderecoForm.querySelector('select[name="pais"]').value,
            sigla: enderecoForm.querySelector('select[name="pais"]').value,
            tipoEndereco: enderecoForm.querySelector('select[name="tipoEndereco"]').value
        };
        enderecos.push(endereco);
    });
    
    return dados = {
        primeiraSenha,
        segundaSenha,
        email,
        cpf,
        genero,
        nome,
        dtNascimento,
        enderecos,
        ddd,
        numeroTelefone,
        tipoTelefone
    };

}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitBtn').addEventListener('click', async function(event) {
        event.preventDefault(); 
        const dados = await enviarDadosFormulario();
        try {
            const response = await fetch('/clientes/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error( await response.text());
            }

            alert ('Cliente cadastrado com sucesso!');
            window.location.href = '/clientes';
           
        } catch (error) {
            console.log(error.message);
            const errorMessage = error.message || error;
            alert(`Erro ao cadastrar cliente: ${errorMessage}`);
        }
    });
});
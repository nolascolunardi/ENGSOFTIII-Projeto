async function dadosCadastrarEnderecos() {
    const enderecos = [];
    document.querySelectorAll('.form-endereco').forEach((enderecoForm) => {
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
        enderecos
    };
}
document.addEventListener('DOMContentLoaded', function () {
    const statusModal = new bootstrap.Modal(document.getElementById("statusModal"));
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    document.getElementById('btnSalvar').addEventListener('click', async function (event) {
        event.preventDefault();
        const clienteId = event.target.dataset.id;
        const dados = await dadosCadastrarEnderecos(); // Certifique-se que esta função está retornando os dados corretamente
        try {
            const response = await fetch(`/clientes/${clienteId}/enderecos/cadastrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            
            // Verificando se o status da resposta é OK
            if (!response.ok) {
                const errorText = await response.text();  // Pegue o texto para mostrar em caso de erro
                throw new Error(errorText || 'Erro desconhecido ao cadastrar endereço');
            }

            const data = await response.json();  // Só tenta processar JSON se a resposta for bem-sucedida
            alert('Endereço cadastrado com sucesso!');
            window.location.href = `/clientes`;  // Redireciona após sucesso

        } catch (error) {
            // Se ocorrer algum erro, mostre-o de forma clara
            const errorMessage = error.message || error;
            alert(`Erro ao cadastrar endereço: ${errorMessage}`);
        }
    });
});

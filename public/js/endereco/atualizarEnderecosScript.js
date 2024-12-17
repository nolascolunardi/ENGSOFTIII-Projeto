async function dadosCadastrarEnderecos() {
    const enderecos = [];
    document.querySelectorAll('.form-endereco').forEach((enderecoForm) => {
        const endereco = {
            idEndereco : enderecoForm.querySelector('input[name="enderecoId"]').value,
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
        const dados = await dadosCadastrarEnderecos(); 
        try {
            const response = await fetch(`/clientes/${clienteId}/enderecos/atualizar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Erro desconhecido ao cadastrar endereço');
            }

            const data = await response.json();
            alert('Endereço atualizado com sucesso!');
            window.location.href = `/clientes`;

        } catch (error) {
            const errorMessage = error.message || error;
            alert(`Erro ao cadastrar endereço: ${errorMessage}`);
        }
    });
});

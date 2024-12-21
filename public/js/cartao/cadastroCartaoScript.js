async function dadosCadastrarCartao() {
    const cartoes = [];
    const cartaoForms = document.querySelectorAll('.form-cartao');
    cartaoForms.forEach(cartao => {
        const numeroCartaoInput = cartao.querySelector('input[name="numeroCartao"]');
        const nomeImpressoInput = cartao.querySelector('input[name="nomeImpresso"]');
        const cvvInput = cartao.querySelector('input[name="cvv"]');
        const bandeiraInput = cartao.querySelector('select[name="bandeira"]');
        const preferencialInput = cartao.querySelector('select[name="preferencial"]');

        if (!numeroCartaoInput || !nomeImpressoInput || !cvvInput || !bandeiraInput || !preferencialInput) {
            console.error("Erro: Campo obrigatório ausente no formulário.");
            return;
        }

        const cartaoObj = {
            numeroCartao: numeroCartaoInput.value,
            nomeImpresso: nomeImpressoInput.value,
            cvv: cvvInput.value,
            bandeira: bandeiraInput.value,
            preferencial: preferencialInput.value === "true",
        };

        cartoes.push(cartaoObj);
    });

    return { cartoes };
}

document.addEventListener('DOMContentLoaded', function() {
    addCartao();
    document.getElementById('btnSalvar').addEventListener('click', async function(event) {

        event.preventDefault(); 
        const clienteId = event.target.dataset.id;
        const dadosCartao = await dadosCadastrarCartao();

        try {
            const response = await fetch(`/clientes/${clienteId}/cartoes/cadastrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosCartao),
            });
            console.log(response);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erro ao cadastrar o cartão');
            }
            
            alert("Cartão cadastrado com sucesso!");
            window.location.href = '/clientes'; 

        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro ao tentar cadastrar o cartão: " + error.message);
        }
        
    });


});

// //funçao para adicionar cartão
function addCartao() {
    const addCartaoBtn = document.getElementById('addCartao');
    const cartoesContainer = document.getElementById('cartoes-container');
    let counterCartao = 1;

    addCartaoBtn.addEventListener('click', () => {
        counterCartao++;
        const cartao = document.querySelector('#cartoes-container').cloneNode(true);
        cartao.querySelectorAll('input').forEach(input => input.value = '');
        cartao.querySelector('.cartao-counter').textContent = counterCartao;
        cartao.classList.add('cartao'); 
        cartoesContainer.appendChild(cartao);
    });
};
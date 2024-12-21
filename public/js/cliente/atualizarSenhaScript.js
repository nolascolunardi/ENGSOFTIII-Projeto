document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('alterarSenhaModal');
    const btnAlterarSenha = document.getElementById('btnAlterarSenha');
    const alterarSenhaButtons = document.querySelectorAll('[name="alterar-senha"]');
    const fecharModal = document.getElementById('fecharModal');

    if (fecharModal && modal) {
        fecharModal.addEventListener('click', () => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
            location.reload();
        });
    }

    alterarSenhaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const clienteId = e.currentTarget.dataset.id;
            if (!clienteId || !modal || !btnAlterarSenha) {
                console.error('Cliente ID, modal ou botão "Alterar Senha" não encontrados.');
                return;
            }

            btnAlterarSenha.setAttribute('data-id', clienteId);

            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        });
    });

    if (btnAlterarSenha) {
        btnAlterarSenha.addEventListener('click', async () => {
            const clienteId = btnAlterarSenha.getAttribute('data-id');
            const primeiraSenha = document.getElementById('primeiraSenha')?.value;
            const segundaSenha = document.getElementById('segundaSenha')?.value

            try {
                const response = await fetch(`/usuarios/alterarSenha/${clienteId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        senha: primeiraSenha,
                        senhaConfirmacao: segundaSenha,
                    }),
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                }

                alert('Senha atualizada com sucesso!');
                window.location.href = '/clientes';

            } catch (error) {
                console.error('Erro ao alterar a senha:', error);
                alert(`Erro ao alterar a senha: ${error.message || error}`);
                window.location.href = '/clientes';
            }
        });
    }
});

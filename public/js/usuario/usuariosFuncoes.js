document.addEventListener("DOMContentLoaded", () => {
    const statusModal = new bootstrap.Modal(document.getElementById("statusModal"));
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
  
    document.querySelectorAll(".acaoBotao").forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const clienteId = button.getAttribute("data-id");
        const acao = button.getAttribute("data-acao");
        const metodo = button.getAttribute("data-metodo");

        try {
            const response = await fetch(`/clientes/${acao}/${clienteId}`, {
              method: `${metodo}`,
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error( await response.text());
            }

            alert ('Cliente desativado com sucesso!');
            window.location.href = '/clientes';
            
        } catch (error) {
              console.log(error.message);
              const errorMessage = error.message || error;
              alert(`Erro ao cadastrar cliente: ${errorMessage}`);
        }
      });
    });
  });
  

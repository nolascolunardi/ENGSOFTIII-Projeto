document.addEventListener('DOMContentLoaded', function() {
    let currentSection = 0;
    const sections = document.querySelectorAll('.section');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');

    function showSection(index) {
        sections.forEach(section => section.classList.remove('active'));
        sections[index].classList.add('active');

        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = index === sections.length - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = index === sections.length - 1 ? 'inline-block' : 'none';
    }

    nextBtn.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
        }
    });

    showSection(currentSection);
});

document.addEventListener('DOMContentLoaded', function() {
    const addEnderecoBtn = document.getElementById('addEndereco');
    const enderecosContainer = document.getElementById('enderecos-container');
    let counterEndereco = 1;

    addEnderecoBtn.addEventListener('click', () => {
        counterEndereco++;
        const endereco = document.querySelector('#enderecos-container').cloneNode(true);
        endereco.querySelectorAll('input').forEach(input => input.value = '');
        endereco.querySelector('.endereco-counter').textContent = counterEndereco;
        endereco.classList.add('endereco'); // Add this line
        enderecosContainer.appendChild(endereco);
    });
});
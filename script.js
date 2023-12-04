// fleet_management/script.js
document.addEventListener('DOMContentLoaded', function () {
    // Carregar missões ao carregar a página
    loadMissions();

    // Adicionar espaçonave
    document.getElementById('add-spacecraft-form').addEventListener('submit', function (event) {
        event.preventDefault();
        addSpacecraft();
    });

    // Deletar espaçonave
    document.getElementById('missions-container').addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-spacecraft')) {
            const spacecraftId = event.target.dataset.spacecraftId;
            confirmDeleteSpacecraft(spacecraftId);
        }
    });
});

function loadMissions() {
    // Simular uma requisição à API para obter missões
    const missions = [
        { id: 1, name: 'Missão A', start_date: '2023-01-01', end_date: '2023-02-01' },
        { id: 2, name: 'Missão B', start_date: '2023-03-01', end_date: '2023-05-01' },
        { id: 3, name: 'Missão C', start_date: '2023-01-01', end_date: '2023-02-01' },
        { id: 4, name: 'Missão D', start_date: '2023-03-01', end_date: '2023-05-01' }
    ];

    const missionSelect = document.getElementById('mission');
    missionSelect.innerHTML = '';

    missions.forEach(mission => {
        const option = document.createElement('option');
        option.value = mission.id;
        option.textContent = mission.name;
        missionSelect.appendChild(option);
    });

    // Carregar espaçonaves e missões
    loadSpacecrafts(missions);
}

function loadSpacecrafts(missions) {
    const missionsContainer = document.getElementById('missions-container');
    missionsContainer.innerHTML = '';

    missions.forEach(mission => {
        const missionDiv = document.createElement('div');
        missionDiv.className = 'mission';

        missionDiv.innerHTML = `
            <h2>${mission.name}</h2>
            <p>De ${mission.start_date} até ${mission.end_date}</p>
            <h3>Espaçonaves Enviadas:</h3>
            <ul id="spacecrafts-${mission.id}"></ul>
        `;

        missionsContainer.appendChild(missionDiv);

        // Simular uma requisição à API para obter espaçonaves por missão
        const spacecrafts = [
            { id: 1, name: 'Espaçonave 1', model: 'Modelo 1', manufacturer: 'Fabricante 1' },
            { id: 2, name: 'Espaçonave 2', model: 'Modelo 2', manufacturer: 'Fabricante 2' },
            { id: 3, name: 'Espaçonave 3', model: 'Modelo 3', manufacturer: 'Fabricante 3' },
            { id: 4, name: 'Espaçonave 4', model: 'Modelo 4', manufacturer: 'Fabricante 4' },
            
        ];

        const spacecraftsList = document.getElementById(`spacecrafts-${mission.id}`);
        spacecrafts.forEach(spacecraft => {
            appendSpacecraftToList(spacecraftsList, spacecraft);
        });
    });
}

function addSpacecraft() {
    const form = document.getElementById('spacecraft-form');
    const name = form.querySelector('#name').value;
    const model = form.querySelector('#model').value;
    const manufacturer = form.querySelector('#manufacturer').value;
    const missionId = form.querySelector('#mission').value;

    // Simular uma requisição à API para adicionar espaçonave
    // Aqui você deve adicionar a lógica para adicionar a espaçonave no seu backend real
    // Por enquanto, vamos apenas atualizar a lista de espaçonaves na missão simulada
    const newSpacecraft = { id: Date.now(), name, model, manufacturer };
    const spacecraftsList = document.getElementById(`spacecrafts-${missionId}`);
    appendSpacecraftToList(spacecraftsList, newSpacecraft);

    // Limpar o formulário
    form.reset();

    // Adicionar feedback visual
    displayMessage('Espaçonave adicionada com sucesso!', 'success');
}

function confirmDeleteSpacecraft(spacecraftId) {
    const confirmDelete = confirm('Tem certeza de que deseja deletar esta espaçonave?');
    if (confirmDelete) {
        deleteSpacecraft(spacecraftId);
    }
}

function deleteSpacecraft(spacecraftId) {
    // Simular uma requisição à API para deletar espaçonave
    // Aqui você deve adicionar a lógica para deletar a espaçonave no seu backend real
    // Por enquanto, vamos apenas remover o elemento da lista simulada
    const listItem = document.querySelector(`[data-spacecraft-id="${spacecraftId}"]`);
    listItem.parentNode.removeChild(listItem);

    // Adicionar feedback visual
    displayMessage('Espaçonave deletada com sucesso!', 'success');
}

function appendSpacecraftToList(spacecraftsList, spacecraft) {
    const listItem = document.createElement('li');
    listItem.textContent = `${spacecraft.name} (${spacecraft.model} - ${spacecraft.manufacturer})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.className = 'delete-spacecraft';
    deleteButton.dataset.spacecraftId = spacecraft.id;

    listItem.appendChild(deleteButton);
    spacecraftsList.appendChild(listItem);
}

function displayMessage(message, messageType) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message ${messageType}`;
    messageContainer.textContent = message;

    const container = document.querySelector('.container');
    container.insertBefore(messageContainer, container.firstChild);

    // Remover a mensagem após alguns segundos
    setTimeout(() => {
        messageContainer.remove();
    }, 3000);
}


























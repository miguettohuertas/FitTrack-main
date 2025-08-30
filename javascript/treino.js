async function carregarTreinos(){
    fetch('http://localhost:3000/treinos')  // ou uma URL externa, como https://api.exemplo.com/dados
        .then(response => {
          if (!response.ok) throw new Error("Erro na resposta");
          return response.json();
        })
        .then(data => {
          document.getElementById('resultado').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
          document.getElementById('resultado').textContent = 'Erro: ' + error.message;
        });
} 
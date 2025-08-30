

async function addFormSubmitListener(formId, modalId) {
    const form = document.getElementById(formId);
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form); // NÃO converta para JSON

        try {
            const response = await fetch(form.action, {
                method: 'POST', // ou 'PUT' se for direto
                body: formData  // aqui vai com multipart/form-data automático
            });
            const data = await response.json();  
            
            if (data.sucesso) {
                localStorage.setItem('toastMessage', data.mensagem);
                localStorage.setItem('toastType', 'success');
                location.reload();
            } else {
                toastr.error(data.mensagem);
            }
        } catch (error) {
            console.error('Erro:', error);
        } finally{
            if(modalId){
                closeModal(modalId);
            }
        }
    });
}

async function addFormListener(formId) {
    const form = document.getElementById(formId);
            
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData  // aqui vai com multipart/form-data automático
            });
            const data = await response.json();  

            const { sucesso, mensagem } = data;

            localStorage.setItem('mensagem', mensagem);
            localStorage.setItem('sucesso', sucesso);

            location.reload();
        } catch (error) {
            console.error('Erro:', error);
        }
    });
}

async function addFilelessFormListener(formId) {
    const form = document.getElementById(formId);
            
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData.entries());

            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            });

            const responseData = await response.json();  

            const { sucesso, mensagem, rota } = responseData;

            localStorage.setItem('rota', rota)
            localStorage.setItem('mensagem', mensagem);
            localStorage.setItem('sucesso', sucesso);

            location.reload();
        } catch (error) {
            console.error('Erro:', error);
        }
    });
}

function respostaFormularioComToast(){
    // Exibe toast se houver mensagem no localStorage
    const msg = localStorage.getItem('toastMessage');
    const type = localStorage.getItem('toastType');

    if (msg && type) {
        const rota = localStorage.getItem('rota');
        if(rota){
            window.location.href = rota;
        }
        
        toastr[type](msg);
        localStorage.removeItem('toastMessage');
        localStorage.removeItem('toastType');
    }
}

function respostaFormularioComDiv(){
    const mensagem = localStorage.getItem('mensagem');
    const sucesso = localStorage.getItem('sucesso');
    
    if(sucesso !== null){
        let resposta = document.getElementById('resposta');
        let mensagem_resposta = document.getElementById('mensagem_resposta');

        resposta.classList.add('w-full','rounded-lg', 'p-4', 'm-2');
        mensagem_resposta.classList.add('text-white', 'text-center');

        if(sucesso === 'true'){
            const rota = localStorage.getItem('rota');
            
            if(rota){
                window.location.href = rota;
            }

            resposta.classList.add('bg-green-500');
            mensagem_resposta.textContent = mensagem;
        } else {
            resposta.classList.add('bg-red-500')
            mensagem_resposta.textContent = mensagem;
        }
    }

    localStorage.removeItem('rota');
    localStorage.removeItem('mensagem');
    localStorage.removeItem('sucesso');
}
function openModal(id) {
    const deleteModal = document.getElementById(id);
    deleteModal.classList.remove('opacity-0', 'pointer-events-none');
    deleteModal.classList.add('opacity-100');
    
    const updateModal = document.getElementById(id);
    updateModal.classList.remove('opacity-0', 'pointer-events-none');
    updateModal.classList.add('opacity-100');

    const postModal = document.getElementById(id);
    postModal.classList.remove('opacity-0', 'pointer-events-none');
    postModal.classList.add('opacity-100');
}

function closeModal(id) {
    const deleteModal = document.getElementById(id);
    deleteModal.classList.remove('opacity-100');
    deleteModal.classList.add('opacity-0');
    setTimeout(() => deleteModal.classList.add('pointer-events-none'), 300); // esperar animação

    const updateModal = document.getElementById(id);
    updateModal.classList.remove('opacity-100');
    updateModal.classList.add('opacity-0');
    setTimeout(() => updateModal.classList.add('pointer-events-none'), 300); // esperar animação

    const postModal = document.getElementById(id);
    postModal.classList.remove('opacity-100');
    postModal.classList.add('opacity-0');
    setTimeout(() => postModal.classList.add('pointer-events-none'), 300); // esperar animação
}

window.openModal = openModal;
window.closeModal = closeModal;
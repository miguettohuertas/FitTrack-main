function previewImage(event, id) {
    console.log(id);
    const img = document.getElementById(id);
    img.src = URL.createObjectURL(event.target.files[0]);
    img.removeAttribute('hidden');
}
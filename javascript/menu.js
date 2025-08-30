const btnUsuarios = document.getElementById('btnUsuarios');
const submenuUsuarios = document.getElementById('submenuUsuarios');
const arrowUsuarios = document.getElementById('arrowUsuarios');

btnUsuarios.addEventListener('click', () => {
    if (submenuUsuarios.style.maxHeight && submenuUsuarios.style.maxHeight !== '0px') {
        // fechar submenu
        submenuUsuarios.style.maxHeight = '0';
        arrowUsuarios.classList.remove('rotate-180');
        btnUsuarios.classList.remove('bg-orange-700')
    } else {
        // abrir submenu - valor grande o suficiente para conter todo o conteúdo
        submenuUsuarios.style.maxHeight = submenuUsuarios.scrollHeight + 'px';
        arrowUsuarios.classList.add('rotate-180');
        btnUsuarios.classList.add('bg-orange-700')
    }
});
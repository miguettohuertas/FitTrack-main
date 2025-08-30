function createStars() {
  const starContainer = document.getElementById('starRating');
  const ratingValue = document.getElementById('ratingValue');
  const hiddenInput = document.getElementById('avaliacaoInput');
  let selectedRating = 0;

  if (!starContainer) return;

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('svg');

    star.setAttribute('class', 'w-8 h-8 text-gray-300 fill-current');
    star.style.width = '2rem';
    star.style.height = '2rem';
    star.style.color = 'gray';

    star.setAttribute('data-index', i);
    star.setAttribute('class', 'w-8 h-8 text-gray-300 fill-current hover:scale-110 transition-transform');
    star.setAttribute('viewBox', '0 0 20 20');
    star.setAttribute('fill', 'currentColor');
    star.innerHTML = `<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963h4.162c.969 
      0 1.371 1.24.588 1.81l-3.37 2.448 
      1.286 3.963c.3.921-.755 1.688-1.54 
      1.118L10 13.348l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.286-3.963-3.37-2.448c-.784-.57-.38-1.81.588-1.81h4.162L9.05 2.927z" />`;

    star.addEventListener('mouseenter', () => updateStars(i));
    star.addEventListener('mouseleave', () => updateStars(selectedRating));
    star.addEventListener('click', () => {
      selectedRating = i;
      if (ratingValue) ratingValue.textContent = selectedRating;
      if (hiddenInput) hiddenInput.value = selectedRating;
    });

    starContainer.appendChild(star);
  }

  function updateStars(rating) {
    const stars = starContainer.querySelectorAll('svg');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.remove('text-gray-300');
        star.classList.add('text-yellow-400');
      } else {
        star.classList.add('text-gray-300');
        star.classList.remove('text-yellow-400');
      }
    });
  }
}

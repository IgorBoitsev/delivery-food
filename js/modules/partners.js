export const partners = () => {

  const cardsRestaurants = document.querySelector('.cards-restaurants');
  
  // Функия рендеринга карточек с ресторанами
  const renderItems = (rest) => {
    rest.forEach((rest) => {
      const card = document.createElement('a');
      card.setAttribute('href', '/restaurant.html');
      card.classList.add('card', 'card-restaurant');
      card.dataset.products = rest.products;

      card.innerHTML = `
        <img src="${rest.image}" alt="${rest.name}" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${rest.name}</h3>
            <span class="card-tag tag">${rest.time_of_delivery} мин</span>
          </div>
          <div class="card-info">
            <div class="rating">${rest.stars}</div>
            <div class="price">От ${rest.price} ₽</div>
            <div class="category">${rest.kitchen}</div>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        e.preventDefault();

        const modalAuth = document.querySelector('.modal-auth');
        const userName = document.querySelector('.user-name').textContent.trim();
        if (userName != 0) {
          localStorage.setItem('restaurant', JSON.stringify(rest));
          window.location.href = '/restaurant.html';
        } else {
          modalAuth.style.display = 'flex';
        }

      })

      cardsRestaurants.append(card);
    });
  }
  
  // Получение данных с сервера
  fetch(`/db/partners.json`)
    .then(response => response.json())
    .then(data => renderItems(data))
    .catch(error => console.log(error));
}
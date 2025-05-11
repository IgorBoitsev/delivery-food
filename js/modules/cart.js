export const cart = () => {

  const buttonCart = document.querySelector('.button-cart'),
        modalCart = document.querySelector('.modal-cart'),
        modalDialog = document.querySelector('.modal-dialog'),
        close = modalCart.querySelector('.close'),
        modalBody = modalCart.querySelector('.modal-body'),
        buttonOrder = modalCart.querySelector('.button-order'),
        modalFooter = modalCart.querySelector('.modal-footer'),
        modalHeader = modalCart.querySelector('.modal-header'),
        modalPricetag = modalCart.querySelector('.modal-pricetag');

  const resetCart = () => {
    const successOrderText = document.createElement('h3');
    successOrderText.classList.add('modal-title');
    successOrderText.textContent = 'Ваш заказ отправлен! Ждите, не голодайте.';
    modalDialog.append(successOrderText);
    modalBody.style.display = 'none';
    modalFooter.style.display = 'none';
    modalHeader.style.display = 'none';

    setTimeout(() => {
      modalCart.classList.remove('is-open');
      modalBody.style.display = 'block';
      modalFooter.style.display = 'flex';
      modalHeader.style.display = 'flex';
      successOrderText.remove();
    }, 2000)

    localStorage.removeItem('cart');
  }

  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));

    cartArray.map(item => {
      if (item.id === id) item.count++;
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));

    cartArray.map(item => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const renderItems = (cartItems) => {
    modalBody.innerHTML = '';

    let totalPrice = 0;

    cartItems.forEach(({ name, price, id, count }) => {
      const foodRow = document.createElement('div');
      foodRow.classList.add('food-row');

      foodRow.innerHTML = `
        <span class="food-name">${name}</span>
          <strong class="food-price">${price} ₽</strong>
          <div class="food-counter">
            <button class="counter-button button-dec" data-index="${id}">-</button>
            <span class="counter">${count}</span>
            <button class="counter-button button-inc" data-index="${id}">+</button>
        </div>
      `;

      modalBody.append(foodRow);
    });

    const foodRows = modalCart.querySelectorAll('.food-row');
    foodRows.forEach(row => {
      totalPrice += row.querySelector('.food-price').textContent.split(' ')[0] * row.querySelector('.counter').textContent;
    });

    modalPricetag.textContent = `${totalPrice} ₽`;
  }

  modalBody.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('button-inc')) {
      incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains('button-dec')) {
        decrementCount(e.target.dataset.index);
    }
  })
  buttonOrder.addEventListener('click', () => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: cartArray
    })
      .then(response => {
        if (response.ok) resetCart();
      })
      .catch(error => {
        console.warn(error);
      })
  })
  buttonCart.addEventListener('click', () => {
    if (JSON.parse(localStorage.getItem('cart'))) {
      renderItems(JSON.parse(localStorage.getItem('cart')));
      modalFooter.style.display = 'flex';

      if (modalCart.querySelector('.nothing-to-eat')) {
        modalCart.querySelector('.nothing-to-eat').remove();
      }
    } else {
      modalBody.style.display = 'none';
      modalFooter.style.display = 'none';

      if (!modalCart.querySelector('.nothing-to-eat')) {
        const nothingToEat = document.createElement('span');
        nothingToEat.classList.add('food-name', 'nothing-to-eat');
        nothingToEat.textContent = 'В корзине ничего нет:(';
        modalDialog.append(nothingToEat);
      }
    }
    modalCart.classList.add('is-open');
  })
  close.addEventListener('click', () => {
    modalCart.classList.remove('is-open');
  })

}
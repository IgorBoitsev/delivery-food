export const auth = () => {

  const buttonAuth = document.querySelector('.button-auth'),
        buttonOut = document.querySelector('.button-out'),
        userName = document.querySelector('.user-name'),
        modalAuth = document.querySelector('.modal-auth'),
        closeAuth = document.querySelector('.close-auth'),
        logInForm = document.getElementById('logInForm'),
        inputLogin = document.getElementById('login'),
        inputPassword = document.getElementById('password'),
        buttonCart = document.querySelector('.button-cart');

  // Функция авторизации пользователя
  const login = (user) => {
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'flex';
    userName.style.display = 'flex';
    buttonCart.style.display = 'flex';
    userName.textContent = user.login;
    modalAuth.style.display = 'none';
  }

  // Функця завершения сеанса пользователя
  const logout = () => {
    buttonAuth.style.display = 'flex';
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
    buttonCart.style.display = 'none';
    // Удаление данных пользователя после завершения сеанса
    localStorage.removeItem('user');
  }

  // Функция проверки авторизации
  const loginCheck = () => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      login(user);
    } else 
    return;
  }
  loginCheck();

  // Открытие модального окна
  buttonAuth.addEventListener('click', () => {
    modalAuth.style.display = 'flex';
  })
  // Закрытие модального окна
  closeAuth.addEventListener('click', () => {
    modalAuth.style.display = 'none';
  })
  // Авторизация пользователя и закрытие моадльного окна
  logInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!!inputLogin.value || !!inputPassword.value) {
      const user = {
        login: inputLogin.value.trim(),
        password: inputPassword.value.trim()
      }
      // Запоминание пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(user));
      login(user);
    } else {
      return;
    }
  })
  
  // Завершение сеанса
  buttonOut.addEventListener('click', logout);
}
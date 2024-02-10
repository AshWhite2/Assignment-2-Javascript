const productList = document.querySelector('.product-list');
const cart = document.querySelector('.cart');
const cartTable = cart.querySelector('table tbody');
const total = cart.querySelector('.total');

let productsInCart = {};

productList.addEventListener('click', e => {
  if (e.target.matches('.add-to-cart')) {
    const product = e.target.closest('.product');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    if (productsInCart[name]) {
      productsInCart[name].quantity += 1;
    } else {
      productsInCart[name] = { quantity: 1, price };
    }

    displayCart();
  }
});

cart.querySelector('.checkout').addEventListener('click', () => {
  alert('Checkout complete!');
  productsInCart = {};
  displayCart();
});

function displayCart() {
  cartTable.innerHTML = '';
  let totalPrice = 0;
  for (const name in productsInCart) {
    const product = productsInCart[name];
    const row = `
      <tr>
        <td>${name}</td>
        <td>${product.quantity}</td>
        <td>$${product.price.toFixed(2)}</td>
      </tr>
    `;
    cartTable.insertAdjacentHTML('beforeend', row);
    totalPrice += product.price * product.quantity;
  }
  total.textContent = totalPrice.toFixed(2);
  cart.classList.toggle('show-cart', Boolean(Object.keys(productsInCart).length));
}

class Login {
    constructor() {
        this.form = document.getElementById('login-form');
        this.form.addEventListener('submit', this.validateForm.bind(this));
    }

    validateForm(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'hanif' || password === 'hanifindra') {
            alert('Please fill in all fields');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        localStorage.setItem('username', username);
        window.location.href = 'dashboard.html';
    }
}

class Auth {
    constructor() {
        this.username = localStorage.getItem('username');
    }

    isAuthenticated() {
        return this.username !== null;
    }

    logout() {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    }
}

const auth = new Auth();

if (!auth.isAuthenticated()) {
    window.location.href = 'index.html';
}
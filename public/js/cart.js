function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

function addToCart(id, name, price) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: id,
      name: name,
      price: parseFloat(price),
      quantity: 1
    });
  }
  
  saveCart(cart);
  showAddedToCartMessage();
}

function showAddedToCartMessage() {
  const message = document.createElement('div');
  message.className = 'alert alert-success position-fixed top-0 end-0 m-3';
  message.style.zIndex = '9999';
  message.textContent = 'Item added to cart!';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = this.dataset.price;
      addToCart(id, name, price);
    });
  });
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const loginLink = document.getElementById('loginLink');
  
  if (isLoggedIn && loginLink) {
    loginLink.textContent = 'Logout';
    loginLink.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('userDetails');
      window.location.href = '/';
    });
  }
});

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    eq: function(a, b) {
      return a === b;
    }
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const products = require('./data/products.json');

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home - TechStore',
    activePage: 'home',
    featuredProducts: products.slice(0, 4)
  });
});

app.get('/shop', (req, res) => {
  res.render('shop', { 
    title: 'Shop - TechStore',
    activePage: 'shop',
    products: products
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us - TechStore',
    activePage: 'about'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us - TechStore',
    activePage: 'contact'
  });
});

app.get('/login', (req, res) => {
  res.render('login', { 
    title: 'Login - TechStore',
    activePage: 'login'
  });
});

app.get('/checkout', (req, res) => {
  res.render('checkout', { 
    title: 'Checkout - TechStore',
    activePage: 'checkout'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('login', { error: false });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '123456') {
    res.redirect('/register');
  } else {
    res.render('login', { error: true });
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { firstname, lastname, address, age, emailaddress } = req.body;
  const user = `${firstname} ${lastname}\n${address}\n${age}\n${emailaddress}`;

  fs.writeFileSync('user.txt', user);
  res.render('thankyou');

});

app.listen(3000, () => console.log('Server listening on port 3000!'));
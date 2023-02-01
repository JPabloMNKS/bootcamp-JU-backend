const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  console.error('ERROR: SECRET_KEY is not defined in the environment');
  process.exit(1);
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@gmail.com' && password === 'password') {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
});

app.get('/protected', (req, res) => {
  res.json({ message: 'Welcome to the protected route', email: req.user.email });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

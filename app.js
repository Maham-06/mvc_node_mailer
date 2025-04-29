const express = require('express');
const bodyParser = require('body-parser');
const emailController = require('./controller');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send(emailController.getEmailForm());
  });
  
  app.post('/send-email', async (req, res) => {
    try {
      const { to, subject, message } = req.body;
      const result = await emailController.sendSimpleEmail(to, subject, message);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
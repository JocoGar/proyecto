const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config.js');
const router = require('./app/routers/router.js'); 
const router1 = require('./app/routers/router1.js'); 
const stripe = require('stripe')('sk_test_51QCXsxJcJZoNzrTNL5RwMSF4LYyAwAT7d1IRnQgdzHVAc5gfQvBhkKYUcn76agxCcfxGm8NNcEFdGNi4eAnkFCEq00JGPpPLpQ');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  console.log('Amount received:', amount); // Añadido para verificar
  if (!amount) {
      return res.status(400).send({ error: 'Missing required param: amount' });
  }
  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
      });
      res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
      console.error('Error al crear PaymentIntent:', error); // Añadido para registrar errores
      res.status(500).send({ error: error.message });
  }
});


db.sequelize.sync({ force: false }).then(() => {
  console.log('Resync with { force: false }');
});

app.use('/', router);  
app.use('/', router1);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos al proyecto" });
});

const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

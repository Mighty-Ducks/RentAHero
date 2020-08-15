const paymentRouter = require('express').Router();
const stripe = require('stripe')(
  'sk_test_51HF8kpFygF7AEgLONRdNUPB6ulhWC1EeGlphjPmHHcanQ9AHxJwVBtURSF0IMHkGOlJ98HajaXqis87wdhSwHuIb00xZZdESWU'
);

paymentRouter.post('/', async (req, res) => {
  const { receipt_email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1234,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email,
      metadata: { integration_check: 'accept_a_payment' },
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = paymentRouter;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = app => {
	app.post('/api/payment', (req, res) => {
		const { stripeToken } = req.body;

		const charge = stripe.charges
			.create({
				amount: req.body.price,
				currency: 'usd',
				description: `Payment for ${req.body.stripeToken}`,
				source: stripeToken
			})
			.then(res => console.log('create payment res', res));

		console.log('stripe charge', charge);
	});
};

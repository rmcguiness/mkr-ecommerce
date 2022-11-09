const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type:'pay',
        mode: 'payment',
        payment_method_types:['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {allowed_countries: ['US', 'CA']},
        shipping_options: [
            {shipping_rate: 'shr_1M1uX2BTky90No61iG6klKha'},
        ],
        line_items: req.body.map((item) => {
            return {
                price: item.price_id,
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                },
                quantity: item.quantity 
            }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: {enabled: true},
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session); 

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
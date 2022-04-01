var Secret_Key = 'SECRERT_KEY'

const stripe = require('stripe')(Secret_Key)

module.exports = {
    payment: async (req, res) => {

        const { price } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price * 100,
            currency: "inr",
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    },
    transaction: async (req, res) => {

        const { id } = req.params;
        const transaction = await stripe.paymentIntents.retrieve(
            id
        );

        res.send({
            transaction: transaction,
        });
    }
}
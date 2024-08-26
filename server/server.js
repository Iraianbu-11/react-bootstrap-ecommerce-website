const express = require("express");
const paypal = require("paypal-rest-sdk");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config(); 
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
  }));
app.use(bodyParser.json());
let amount = 0;

paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
});
app.get("/" , async(req,res) => {
    res.send("Hello Shopifyyy User!!!");
})
app.post("/payment", async (req, res) => {
    const { total } = req.body;
    amount = total;
    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/cancel`
        },
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: total.toString()
                },
                description: "Payment Transaction"
            }
        ]
    };

    paypal.payment.create(create_payment_json, (err, payment) => {
        if (err) {
            console.error("Error creating payment:", err.response);
            res.status(500).send("Error creating payment");
        } else {
            res.json(payment);
        }
    });
});

app.get("/success", async (req, res) => {
    try {
        const { paymentId, PayerID } = req.query;

        const execute_payment_json = {
            payer_id: PayerID,
            transactions: [{
                amount: {
                    currency: "USD",
                    total: amount.toString()
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
            if (err) {
                console.error("Error executing payment:", err.response);
                return res.redirect(`${process.env.CLIENT_URL}/failure`);
            } else {
                console.log("Payment successful:", payment);
                //localStorage.removeItem("cartItems");
                return res.redirect(`${process.env.CLIENT_URL}/success`);
            }
        });
    } catch (error) {
        console.error("Error processing payment success:", error);
        res.redirect(`${process.env.CLIENT_URL}/failure`);
    }
});

app.get("/cancel", (req, res) => {
    return res.redirect(`${process.env.CLIENT_URL}/failure`);
});

app.listen(8000, () => console.log(`Server is running on port 8000`));

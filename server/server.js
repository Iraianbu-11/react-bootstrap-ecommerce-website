const express = require("express");
const paypal = require("paypal-rest-sdk");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
let amount = 0;
paypal.configure({
    mode: "sandbox",
    client_id: "AQnJW_aN2oSw2iJTn6nolyzBHpP0afcLYIhDGXa7j7NQnFoho6fXy_U0v4XgEDF__QJ-TIhHlls_WWYm",
    client_secret: "ELVivBaPM6hcXCu7hDgE62gzh7XXuNlC1K3EfJ8uWqBZmwszJmlIWKthtS8Jr_fyCcXfcV1ARH__6ZvI"
});

app.post("/payment", async (req, res) => {
    const { total } = req.body;
    amount = total;
    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:8000/success",
            cancel_url: "http://localhost:8000/cancel"
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
                return res.redirect("http://localhost:5173/failure");
            } else {
                console.log("Payment successful:", payment);
                return res.redirect("http://localhost:5173/success");
            }
        });
    } catch (error) {
        console.error("Error processing payment success:", error);
        res.redirect("http://localhost:5173/failure");
    }
});

app.get("/failed", (req, res) => {
    return res.redirect("http://localhost:5173/failure");
});

app.listen(8000, () => console.log("Server is running on port 8000"));

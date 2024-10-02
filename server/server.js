const express = require("express");
const paypal = require("paypal-rest-sdk");
const cors = require("cors");
const bodyParser = require("body-parser");
let products = require("./products.json");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("Hello Shopifyyy User!!!");
});

app.get("/products", async (req, res) => {
  res.status(200).json(products);
});

app.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id); 
  const product = products.find((product) => product.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/products", async (req, res) => {
  const product = req.body;

  if (Object.keys(product).length !== 0) {
    products.push(product);
    res.json({
      message: "Product added successfully",
    });
  } else {
    res.status(400).json({
      message: "Product not added successfully",
    });
  }
});

app.post("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
app.delete("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//let amount = 0;

// app.get("/products/:id", async (req, res) => {
//   paypal.configure({
//     mode: "sandbox",
//     client_id: process.env.PAYPAL_CLIENT_ID,
//     client_secret: process.env.PAYPAL_CLIENT_SECRET,
//   });
// });
// app.post("/payment", async (req, res) => {
//   const { total } = req.body;
//   amount = total;
//   const create_payment_json = {
//     intent: "sale",
//     payer: {
//       payment_method: "paypal",
//     },
//     redirect_urls: {
//       return_url: `${process.env.SERVER_URL}/success`,
//       cancel_url: `${process.env.SERVER_URL}/cancel`,
//     },
//     transactions: [
//       {
//         amount: {
//           currency: "USD",
//           total: total.toString(),
//         },
//         description: "Payment Transaction",
//       },
//     ],
//   };

//   paypal.payment.create(create_payment_json, (err, payment) => {
//     if (err) {
//       console.error("Error creating payment:", err.response);
//       res.status(500).send("Error creating payment");
//     } else {
//       res.json(payment);
//     }
//   });
// });

// app.get("/success", async (req, res) => {
//   try {
//     const { paymentId, PayerID } = req.query;

//     const execute_payment_json = {
//       payer_id: PayerID,
//       transactions: [
//         {
//           amount: {
//             currency: "USD",
//             total: amount.toString(),
//           },
//         },
//       ],
//     };

//     paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
//       if (err) {
//         console.error("Error executing payment:", err.response);
//         return res.redirect(`${process.env.CLIENT_URL}/failure`);
//       } else {
//         console.log("Payment successful:", payment);
//         return res.redirect(`${process.env.CLIENT_URL}/success`);
//       }
//     });
//   } catch (error) {
//     console.error("Error processing payment success:", error);
//     res.redirect(`${process.env.CLIENT_URL}/failure`);
//   }
// });

// app.get("/cancel", (req, res) => {
//   return res.redirect(`${process.env.CLIENT_URL}/failure`);
// });

app.listen(4000, () =>
  console.log(`Shopifyy Server is running on port 4000 🚀🚀🚀`)
);

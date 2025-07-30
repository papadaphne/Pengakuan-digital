
// Express + Midtrans backend sample
const express = require("express");
const app = express();
const midtransClient = require("midtrans-client");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const core = new midtransClient.CoreApi({
  isProduction: true,
  serverKey: "Mid-server-3d3BdRMmDOT8ogRXUewQcGRm",
  clientKey: "Mid-client-rL98w64qMaijEtYy"
});

app.post("/create-payment", async (req, res) => {
  try {
    const response = await core.charge({
      payment_type: "qris",
      transaction_details: {
        order_id: "order-" + Date.now(),
        gross_amount: 10000
      },
      qris: {}
    });
    res.json({ redirect_url: response.actions[0].url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/midtrans-callback", (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200).send("OK");
});

app.listen(3000, () => console.log("Running on port 3000"));

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import messageRoutes from "./routes/message.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/message", messageRoutes);

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://MessageAdmin:smsadmin123@sms-storage.jagpe.mongodb.net/SMS-Storage?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);

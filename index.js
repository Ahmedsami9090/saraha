import express from "express";
import bootstrap from "./src/app.controller.js";
// import https from "https";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
// import crypto from 'crypto'
const app = express();
const port = process.env.PORT;
bootstrap(app, express);
const options = {
  key: fs.readFileSync("./cert.key"), // private key
  cert: fs.readFileSync("./cert.crt"), // certificate
};
// https.createServer(options, app).listen(port, (err) => {
//   if (!err) {
//     console.log("server connected successfully");
//   } else {
//     console.log(`error connecting server , ${err}`);
//   }
// });
app.listen(port, (err) => {
  if (!err) {
    console.log("server connected successfully");
  } else {
    console.log(`error connecting server , ${err}`);
  }
});

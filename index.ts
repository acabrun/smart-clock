import express from "express";
import router from "./api/router";

const app = express();
app.use(express.json());
app.use(router);

app.listen(3001, () => {
  console.log("Server started (http://localhost:3001/) !");
});

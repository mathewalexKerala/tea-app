import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = `:method :url :status :response-time ms`;
const app = express();

// app.use(
//   morgan(morganFormat, {
//     stream: {
//       write: (message) => {
//         const logObject = {
//           method: message.split(" ")[0],
//           url: message.split(" ")[1],
//           status: message.split(" ")[2],
//           responseTime: message.split(" ")[3],
//         };
//         logger.info(JSON.stringify(logObject));
//       },
//     },
//   })
// )
app.use(logger)
const PORT = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];

let nextId = 1;
//add a tea
app.post("/teas", (req, res) => {
  const { tea, price } = req.body;
  const newTea = {
    id: nextId++,
    tea,
    price,
  };
  
  teaData.push(newTea);
  
  res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get single tea
app.get("/teas/:id", (req, res) => {
  const Id = req.params.id - 1;

  Id < teaData.length && Id >= 0
    ? res.status(200).send(teaData[Id])
    : res.status(404).send("not found");
});

//update an existing tea

app.put("/teas/:id", (req, res) => {
  const index = parseInt(req.params.id) - 1;
  //logic for not entering body or params id
  !req.body || Object.keys(req.body).length === 0
    ? res.status(400).send(" Input value  is missing")
    : index < 0 || index >= teaData.length
    ? res.status(404).send(`Tea don't exist`)
    : "";
  teaData[index] = {
    id: parseInt(req.params.id),
    tea: req.body.tea,
    price: req.body.price,
  };

  res
    .status(200)
    .send({
      tea: teaData[index],
      response: `Tea with ID:${index + 1} is update`,
    });
});

//delete a tea

app.delete("/teas/:id", (req, res) => {
  const index = parseInt(req.params.id) - 1;

  res.status(200).send(teaData.splice(index, 1));
});

app.listen(PORT, () => {
  console.log(`connected to the port : ${PORT}`);
});

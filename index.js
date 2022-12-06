const elastic = require("@elastic/elasticsearch")
const Client = elastic.Client
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// my routes
const searchRoutes = require("./routes/search")
const feedbackRoutes = require("./routes/feedback")


const client = new Client({
    node: "http://localhost:9200"
})

client.info()
  .then(response => console.log(response))
  .catch(error => console.error(error))


//Middlewares
app.use(bodyParser.json());
app.use(cors());

//My Routes
app.use("/api", searchRoutes);
app.use("/api", feedbackRoutes);

const port = 4000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});


const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./Models");

db.sequelize.sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Failed to sync database:", err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

  
    require("./Routes/AuthenticationRoute")(app);
  

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

import express, { Application } from "express";
import path from "path";
import cors from "cors";

const server: Application = express();
const PORT = process.env.PORT || 5000;

// Parse json
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// server.use(express.static(path.join(__dirname, "../../dist/user-app")));
server.use(cors());

// server.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../dist/user-app/index.html'));
// });


// APIs
server.use("/api/users", require("./src/api/user.api"));

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
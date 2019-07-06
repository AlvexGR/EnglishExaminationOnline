import express, { Application } from "express";
import session from "express-session";
import path from "path";
import cors from "cors";
import { HttpHelper } from '@lib/helpers/http.helper';

const server: Application = express();
const PORT = process.env.PORT || 1503;

// Parse json
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
  session({
    secret:
      "234jskldf98271lkjxcvlksjefr28374skljdf284asjfl298374123qlkajfzovciu",
    saveUninitialized: false,
    resave: false
  })
);
// server.use(express.static(path.join(__dirname, "../../dist/user-app")));
server.use(cors());

// server.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../dist/user-app/index.html'));
// });

// APIs
server.use(`/api/${HttpHelper.users}`, require("./src/api/user.api"));
server.use(`/api/${HttpHelper.exams}`, require("./src/api/exam.api"));

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

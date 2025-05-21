require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 9999;

const viewEngine = require("./config/viewEngine.config");
const mainRoutes = require("./routes/main.route");
const apiRoutes = require("./routes/api.route");
const { connection } = require("./config/connectDB");

const adminRoutes = require("./routes/admin/index.router");
const userRoutes = require("./routes/user/index.router");
const errorRoutes = require("./routes/pageError/index.router");

//test connection
// connection();
app.use(express.static('views/user/pages/test_list/problist'));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json());

app.set("views", `views`);
app.set("view engine", "pug");
//config req body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
// app.use(trimInputs)
app.use(cookieParser());

// app.use(trimInputs)
//express-session
app.use("/api", apiRoutes);
viewEngine(app);

const server = app.listen(port, () => {
  //console.log(`Example app listening on port ${port}`);
});

const socketIo = require("socket.io");
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (data) => {
    console.log("message: ", data);
    io.to(data.room).emit("message", data);
  });

  socket.on("join", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

adminRoutes(app);
userRoutes(app);
errorRoutes(app);
mainRoutes(app)

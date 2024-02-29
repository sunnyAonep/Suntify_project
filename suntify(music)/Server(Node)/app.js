const express = require("express");
const songsRoutes = require("./routes/songs.routes")
const usersRoutes = require("./routes/users.routes")
const playlistRoutes = require("./routes/playlist.routes")
const search = require("./routes/search.routes")
const payment = require("./routes/payment.routes")
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/v1/songs" , songsRoutes)
app.use("/api/v1/playlist" , playlistRoutes)
app.use("/api/v1/users" , usersRoutes)
app.use("/api/v1/search" , search)
app.use("/api/v1/payment" , payment)

module.exports = {app}
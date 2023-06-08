const express = require("express")
const app = express()

const { dbConnection } = require("./config/db");

const { userRouter } = require("./routes/user.route")
const cors = require("cors");
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Home Page");

});

app.use("/users", userRouter)

app.listen(9090, async () => {
    try {
        await dbConnection
        console.log("Connected to dbAtlas")

    } catch (e) {
        console.log(e.message)
    }
    console.log("listening on port 9090");
});
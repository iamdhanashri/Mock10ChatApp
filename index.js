const express = require("express")
const app = express()
const socketio = require("socket.io")

const http = require("http")
const formateMsg = require("./utils/message")
const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require("./utils/users")

const server = http.createServer(app)

const io = socketio(server)

io.on("connection", (socket) => {
    console.log("one user has joined")

    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        socket.emit("message", formateMsg("ChatApp Server", "welcome to my chat app"))

        socket.broadcast.to(user.room).emit("message", formateMsg("ChatApp Server", `${username} has joined the chat`))


        io.to(room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)

        })

    })

    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit("message", formateMsg(user.username, msg))
    })

    socket.on("disconnect", () => {

        const user = userLeave(socket.id)
        console.log("one user left")

        io.to(user.room).emit("message", formateMsg("ChatApp Server", `${user.  username} has left the chat`))

        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    })


})



server.listen(8080, () => {
    console.log("listening port at 8080 at Socket")
})


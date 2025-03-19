const {Server} = require("socket.io")
const socket = new Server()

socket.on("connection", (socket) => {
    console.log("new connection", socket.id)
    socket.join(2)
    socket.emit("message", "Hihih")
})

socket.on("joinRoom", (roomId) => {
    socket.socketsJoin(roomId)
    console.log("joined room")
})
socket.on("message", (message) => {
    socket.emit("message", message)
    console.log(message)
})
socket.listen(3000)
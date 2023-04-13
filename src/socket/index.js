let onlineUsers = []

export const newConnectionHandler = socket => {
    console.log("New client just connected. Client's id is: ", socket.id)

    //1 emitting welcome message to newly connected client
    socket.emit("welcome", { message: `Welcome, ${socket.id}` })

    //2 listening to event "setUsername" called by FE
    socket.on("setUsername", payload => {
        console.log(payload)

        //2.1 after receiving username, we keep track of it together with socket.id:
        onlineUsers.push({ username: payload.username, socketId: socket.id })

        //2.2 sending the list of online users to the newly connected user:
        socket.emit("loggedIn", onlineUsers)

        //2.3 informing everyone else about the newly connected user:
        socket.broadcast.emit("updateOnlineUsersList", onlineUsers)
    })

    socket.on("message", (message) => {
        socket.broadcast.emit("newMessage", message)
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        socket.broadcast.emit("updateOnlineUsersList", onlineUsers)
    })
}
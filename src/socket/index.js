let onlineUsers = []

export const newConnectionHandler = socket => {
    console.log("New client just connected. Client's id is: ", socket.id)
    socket.emit("welcome", { message: `Welcome, ${socket.id}` })
}
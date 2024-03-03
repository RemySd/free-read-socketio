import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "https://127.0.0.1:8000"
    }
});

const port = process.env.PORT || 3000;

io.on('connection', (clientSocket) => {
    console.log('connexion!');
    clientSocket.emit("hello", { "test": "test" });

    clientSocket.on('dispatch-message', (data) => {
        console.log('test');
        // clientSocket.emit("new-message", { "message": "blabla" });
    });

    clientSocket.on('dispatch-message-php', (data) => {
        console.log(data);
        io.sockets.emit("new-message", data);
        // clientSocket.emit("new-message", data);
    });
});




httpServer.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});


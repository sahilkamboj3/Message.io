"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const socketFunctions = (io, socket) => {

    socket.on('chat message', function(msg){
        socket.broadcast.emit('chat message', msg);
    })

    socket.on('message to room', function(values){
        const room = values['room'];
        const msg = values['msg'];
        socket.rooms.forEach(roomIter => {
        if (roomIter == room) {
            socket.to(room).emit('chat message', msg);
        }
        return;
        });
    });

    socket.on('message to rooms', function(msg){
        for (const room in rooms) {
          socket.rooms.forEach(roomIter => {
            if (roomIter == room) {
            socket.to(room).emit('chat message', msg);
          }
        });
        }
    });

    socket.on('join room', function(room){
        socket.join(room);
    });

    socket.on('join rooms', function(rooms){
        socket.join(rooms);
    });

    socket.on('leave room', function(room){
        socket.leave(room);
    });

    socket.on('leave rooms', function(rooms){
        for (const room in rooms){
        socket.leave(room);
        }
    });

    socket.on('private message', function(msg, otherID){
        io.to(otherID).emit(msg);
    });

}

exports.default = socketFunctions;
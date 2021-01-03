"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const appCallableEndpoints = (app) => {
    app.get('/chatMessage', (req, res) => {
        res.json({ 'callable': 'chat message' });
    })

    app.get('/messageRoom', (req, res) => {
        res.json({ 'callable': 'message to room' });
    })

    app.get('/messageRooms', (req, res) => {
        res.json({ 'callable': 'message to rooms' });
    })

    app.get('/joinRoom', (req, res) => {
        res.json({ 'callable': 'join room' });
    })

    app.get('/joinRooms', (req, res) => {
        res.json({ 'callable': 'join rooms' });
    })

    app.get('/leaveRooms', (req, res) => {
        res.json({ 'callable': 'leave room' });
    })

    app.get('/leaveRooms', (req, res) => {
        res.json({ 'callable': 'leave rooms' });
    })
}

exports.default = appCallableEndpoints;
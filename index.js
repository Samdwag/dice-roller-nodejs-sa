const express = require('express')
app = express()

const cors = require("cors")

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 3

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))
app.use(cors({ origin: '*' }))

// About page route
app.get('/about', (request, response) => {
    console.log('Calling "/about" on the Node.js server.')
    response.type('text/plain')
    response.send('About Node.js on Azure Template.')
})

// Version route
app.get('/version', (request, response) => {
    console.log('Calling "/version" on the Node.js server.')
    response.type('text/plain')
    response.send('Version: ' + majorVersion + '.' + minorVersion)
})

// Ping route
app.get('/api/ping', (request, response) => {
    console.log('Calling "/api/ping"')
    response.type('text/plain')
    response.send('Pong')
})

// Dice Roller API to generate random numbers
app.get('/api/roll-dice', (request, response) => {
    const sides = parseInt(request.query.sides) || 6;  // Default to a 6-sided dice if not provided
    const result = Math.floor(Math.random() * sides) + 1;
    console.log(`Rolled a ${result} on a ${sides}-sided dice.`);
    response.json({ result });
});

// Error handling route
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

// Start the server
app.listen(port, () => console.log(
  `Express started at "http://localhost:${port}"\n` +
  `press Ctrl-C to terminate.`
))

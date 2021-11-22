const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3737


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Cross Origin
app.use(cors())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

var server = require('http').createServer(app)
// const io = require('socket.io')(3636);
const io = require('socket.io')(server,{cors: { origin: "*", methods: ["GET", "POST"]}});

io.on('connection', socket =>{
    const socketQueryParam = socket.handshake.query
    console.log('ada yg terkoneksi', JSON.stringify(socketQueryParam))
    // socket.join("some room");
})

//Router 
const socketRoute = require('./routes/generatorRoute')(io)
app.use('/generatorservice', socketRoute);
 
app.get('/', (req,res)=>{    
    res.send('Barcode Scanner Socket Services');
})


server.listen(PORT, ()=>{
    console.log(`Server http running on PORT ${PORT}`)
})

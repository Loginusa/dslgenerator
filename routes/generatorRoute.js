

const express = require('express');
const router = express.Router();


module.exports = (io) => {
    const scannerController = require('../controllers/generatorController')(io);
    router.post('/dsl', scannerController.generateDSL);    
    return router
}


 

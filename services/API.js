// a library to wrap and simplify api calls
const apisauce = require('apisauce')
const Config = require('../Config')

// our "constructor"
const create = (baseURL = Config.SERVICE_BASE_URL) => {  
    const api = apisauce.create({
    // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Cache-Control': 'no-cache',  
        },
        // 10 second timeout...
        timeout: 35000
    })
    //FUNCTION INI AKAN DI JALANKAN SEBELUYM REQUEST DILAKUKAN, SEHINGGA SETTING HEADER YG MANDATORY DAPAT DI LAKUKAN DISINI
    api.addAsyncRequestTransform( async (request) => {  
        request.headers['access-token'] = Config.API_ACCESS_TOKEN
        request.headers['resource-id'] = Config.API_RESOURCE_ID
    })
 
    const getAllUnit = (data) => api.get('/units', data)  
    const getUnitById = (id,data) => api.get('/units/'+id, data)  

 
    return { 
        getAllUnit,   
        getUnitById  
    }
}
  
module.exports = create

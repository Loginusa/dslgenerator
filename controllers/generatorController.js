const f = require('./FunctionLibrary');





 
module.exports = (io) => {
    return {
        generateDSL: async function (req, res, next) {  
            let param = req.body
            if (!param) {
                return res.status(500).send('Param tidak ada');
            }
            const result = f.dslTranslator(param);
            try {
                res.send(result)
            } catch(e) {
                return res.status(500).send('Error generate DSL')
            }
 
        },
    }
} 
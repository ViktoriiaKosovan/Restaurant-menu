const { Info } = require('../models/models');
const { resultCodeSuccess, successMessage } = require('../constants/constants');
const handleError = require('../utils/handleError');

  const createInfo= async (req, res) =>{
       try {
         await Info.create({ address:"", contacts:"", wiFi:"" } );
         res.status(201).send({ statusCode: resultCodeSuccess, message: successMessage });
            
        } catch (error) {
            handleError(res, error);

        }
     }
class InfoController {
    async getInfo(req, res) {
        try {
            await Info.findAll();
            res.status(200).send({ statusCode: resultCodeSuccess, message: successMessage });
          
        } catch (error) {
          handleError(res, error);
        }
    }
    
   
    
     async updateInfo(req, res) {
       try {
         if (req.body.isNew) {
          return createInfo(req, res)
         }
          let { id, address, contacts, wiFi} = req.body;
          await Info.update({ address, contacts, wiFi }, { where: { id: id } });
          res.status(200).send({ statusCode: resultCodeSuccess, message: successMessage });
        } catch (error) {
          handleError(res, error, 409);
        }
     }
    
    

}

module.exports = new InfoController();
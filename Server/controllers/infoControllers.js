const { Info } = require('../models/models');
const handleError = require('../utils/handleError');


class InfoController {
    async getInfo(req, res) {
        try {
           const info = await Info.findAll();
           res.status(200).send({info});
          
        } catch (error) {
           handleError(error, res, 'Info not found')
        }
    }
    
     async createInfo(req, res) {
       try {
         let { address, contacts, wiFi } = req.body;
         if (!address || !contacts || !wiFi) throw Error;
          let newInfo = await Info.create({ address, contacts, wiFi } );
         res.status(201).send(newInfo);
            
        } catch (error) {
            handleError(error, res, 'Info did not create')

        }
     }
    
     async updateInfo(req, res) {
        try {
          let { id, address, contacts, wiFi} = req.body;
          if (!id) throw Error;
          await Info.update({ address, contacts, wiFi }, { where: { id: id } });
          res.status(200).send({message: "Info was updated successfully."});
        } catch (error) {
          handleError(error, res, "Error updating info", 409);
        }
     }
    
    

}

module.exports = new InfoController();
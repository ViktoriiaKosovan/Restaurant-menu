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
         let newInfo = await Info.create({ address, contacts, wiFi } );
            res.status(201).send(newInfo)
            
        } catch (error) {
            handleError(error, res, 500, 'Info did not create')

        }
         
     }
    
     async updateInfo(req, res) {
        try {
            let { id } = req.body;
          let count = await Info.update({ address:req.body.address, contacts:req.body.contacts, wiFi: req.body.wiFi }, { where: { id: id } });
            if (count == 1) {
                res.send({message: "Info was updated successfully."});
            } else {
                res.send({message: `Can not update info with id=${id}.`});
      }
        } catch (error) {
            handleError(error, res, 500, `Error updating info with id=${id}`);
        }
     }
    
    

}

module.exports = new InfoController();
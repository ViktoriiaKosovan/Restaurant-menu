const { Info } = require('../models/models');


class InfoController {
      async getAll(req, res) {
        const info = await Info.findAll();
        return res.json(info);
    }
    
     async create(req, res) {
  
         
     }
    
     async edit(req, res) {
        
     }
    
     async delete(req, res) {
        
     }

}

module.exports = new InfoController();
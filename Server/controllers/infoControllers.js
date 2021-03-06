const { Info } = require("../models/models");
const {
  successMessage,
  httpCodes,
} = require("../constants/constants");
const handleError = require("../utils/handleError");

const createInfo = async (req, res) => {
  try {
    await Info.create({ address: "", contacts: "", wiFi: "" });
    res
      .status(httpCodes.CREATED)
      .send({ message: successMessage });
  } catch (error) {
    handleError(res, error);
  }
};

const getInfo = async (req, res) => {
  try {
    let info=await Info.findAll();
    res
      .status(httpCodes.OK)
      .send(info);
  } catch (error) {
    handleError(res, error);
  }
};

const updateInfo = async (req, res) => {
  try {
    if (req.body.isNew) {
      return createInfo(req, res);
    }
    let { id, address, contacts, wiFi } = req.body;
    await Info.update({ address, contacts, wiFi }, { where: { id: id } });
    res
      .status(httpCodes.OK)
      .send({ message: successMessage });
  } catch (error) {
    handleError(res, error, httpCodes.UPDATE_ERROR);
  }
};

module.exports = { getInfo, updateInfo };

const express = require('express');
var apiVersion1 = express.Router();

const partyController = require('../controllers/partyController');

/**
* Routes related with political parties
*/
apiVersion1.post('/parties', partyController.createNewParty);
apiVersion1.get('/parties', partyController.getAllPartiesList);
apiVersion1.get('/parties/:partId', partyController.getSpecificParty);
apiVersion1.patch('/parties/:partyId/:partyName', partyController.modifyParty)
apiVersion1.delete('/parties/:partId', partyController.deleteParty)

module.exports = apiVersion1;
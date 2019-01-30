const express = require('express');
var apiVersion1 = express.Router();

const partyController = require('../controllers/partyController');
const officeController = require('../controllers/officeController');

/**
* Routes related with political parties
*/
apiVersion1.post('/parties', partyController.createNewParty);
apiVersion1.get('/parties', partyController.getAllPartiesList);
apiVersion1.get('/parties/:partId', partyController.getSpecificParty);
apiVersion1.patch('/parties/:partyId/:partyName', partyController.modifyParty)
apiVersion1.delete('/parties/:partId', partyController.deleteParty)

/**
* Routes related with political offices
*/
apiVersion1.post('/offices', partyController.createNewOffice);
apiVersion1.get('/offices', partyController.getAllOfficesList);
apiVersion1.get('/offices/:officeId', partyController.getSpecificOffice);

module.exports = apiVersion1;
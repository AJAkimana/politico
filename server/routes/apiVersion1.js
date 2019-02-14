const express = require('express');
var apiVersion1 = express.Router();

const partyController = require('../controllers/partyController');
const officeController = require('../controllers/officeController');

/**
* Routes related with political parties
*/
apiVersion1.post('/v1/parties', partyController.createNewParty);
apiVersion1.get('/v1/parties', partyController.getAllPartiesList);
apiVersion1.get('/v1/parties/:partyId', partyController.getSpecificParty);
apiVersion1.patch('/v1/parties/:partyId/:partyName', partyController.modifyParty);
apiVersion1.delete('/v1/parties/:partyId', partyController.deleteParty);

/**
* Routes related with political offices
*/
apiVersion1.get('/v1/offices', officeController.getAllOfficesList);
apiVersion1.post('/v1/offices', officeController.createNewOffice);
apiVersion1.get('/v1/offices/:officeId', officeController.getSpecificOffice);
apiVersion1.patch('/v1/offices/:officeId/:officeName', officeController.modifyOffice);
apiVersion1.delete('/v1/offices/:officeId', officeController.deleteOffice);

module.exports = apiVersion1;
const express = require('express');
const apiVersion1 = express.Router();

/**
* Import controllers
*/
const partyController = require('../controllers/partyController');
const officeController = require('../controllers/officeController');

/**
* Import middlewares
*/

const partyMiddleware = require('../middlewares/partyMiddleware');
const officeMiddleware = require('../middlewares/officeMiddleware');

/**
* Routes related with political parties
*/
apiVersion1.post('/v1/parties', partyMiddleware.verifyPartyBody, partyController.createNewParty);
apiVersion1.get('/v1/parties', partyController.getAllPartiesList);
apiVersion1.get('/v1/parties/:partyId', partyMiddleware.verifyPartyId, partyController.getSpecificParty);
apiVersion1.patch('/v1/parties/:partyId/:partyName', partyMiddleware.verifyPartyBodyWithId, partyController.modifyParty);
apiVersion1.delete('/v1/parties/:partyId', partyMiddleware.verifyPartyId, partyController.deleteParty);

/**
* Routes related with political offices
*/
apiVersion1.get('/v1/offices', officeController.getAllOfficesList);
apiVersion1.post('/v1/offices', officeMiddleware.verifyOfficeBody, officeController.createNewOffice);
apiVersion1.get('/v1/offices/:officeId', officeMiddleware.verifyOfficeId, officeController.getSpecificOffice);
apiVersion1.patch('/v1/offices/:officeId/:officeName', officeMiddleware.verifyOfficeBodyWithId, officeController.modifyOffice);
apiVersion1.delete('/v1/offices/:officeId', officeMiddleware.verifyOfficeId, officeController.deleteOffice);

module.exports = apiVersion1;
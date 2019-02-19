import express from 'express';
const apiVersion1 = express.Router();

/**
* Import controllers
*/
import partyController from '../controllers/partyController';
import officeController from '../controllers/officeController';
import userController from '../controllers/userController';

/**
* Import middlewares
*/

import partyMiddleware from '../middlewares/partyMiddleware';
import officeMiddleware from '../middlewares/officeMiddleware';
import userMiddleware from '../middlewares/userMiddleware';

/**
* Routes related with political parties
*/
apiVersion1.post('/v1/parties', partyMiddleware.verifyPartyBody, partyController.createNewParty);
apiVersion1.get('/v1/parties', partyController.getAllPartiesList);
apiVersion1.get('/v1/parties/:partyId', partyMiddleware.verifyPartyId, partyController.getSpecificParty);
apiVersion1.patch('/v1/parties/:partyId/:partyName', 
	partyMiddleware.verifyPartyBody, 
	partyMiddleware.verifyPartyId,
	partyController.modifyParty);
apiVersion1.delete('/v1/parties/:partyId', partyMiddleware.verifyPartyId, partyController.deleteParty);

/**
* Routes related with political offices
*/
apiVersion1.get('/v1/offices', officeController.getAllOfficesList);
apiVersion1.post('/v1/offices', officeMiddleware.verifyOfficeBody, officeController.createNewOffice);
apiVersion1.get('/v1/offices/:officeId', officeMiddleware.verifyOfficeId, officeController.getSpecificOffice);
apiVersion1.patch('/v1/offices/:officeId', officeMiddleware.verifyOfficeBody,
	officeMiddleware.verifyOfficeId,
	officeController.modifyOffice);
apiVersion1.delete('/v1/offices/:officeId', officeMiddleware.verifyOfficeId, officeController.deleteOffice);

apiVersion1.post('/auth/signup', userMiddleware.verifyUserBody, userController.registerUser);

export default apiVersion1;
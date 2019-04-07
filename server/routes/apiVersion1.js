import express from 'express';
import Auth from '../middlewares/auth';
const apiVersion1 = express.Router();

/**
* Import controllers
*/
import partyController from '../controllers/partyController';
import officeController from '../controllers/officeController';
import userController from '../controllers/userController';
import voteController from '../controllers/voteController';

/**
* Import middlewares
*/

import partyMiddleware from '../middlewares/partyMiddleware';
import officeMiddleware from '../middlewares/officeMiddleware';
import userMiddleware from '../middlewares/userMiddleware';
import exists from '../middlewares/existMiddlewares';

/**
* Routes related with political parties
*/
apiVersion1.post('/v1/parties', partyMiddleware.verifyPartyBody, partyController.createNewParty);
apiVersion1.get('/v1/parties', partyController.getAllPartiesList);
apiVersion1.get('/v1/parties/:partyId',
	partyMiddleware.verifyPartyId, 
	exists.isPartyExists,
	partyController.getSpecificParty);
apiVersion1.patch('/v1/parties/:partyId/:partyName',
	partyMiddleware.verifyPartyBody, 
	partyMiddleware.verifyPartyId,
	exists.isPartyExists,
	partyController.modifyParty);
apiVersion1.delete('/v1/parties/:partyId',
	partyMiddleware.verifyPartyId, 
	exists.isPartyExists,
	partyController.deleteParty);

/**
* Routes related with political offices
*/
apiVersion1.get('/v1/offices', officeController.getAllOfficesList);
apiVersion1.post('/v1/offices',
	officeMiddleware.verifyOfficeBody, 
	officeController.createNewOffice);
apiVersion1.get('/v1/offices/:officeId',
	exists.isOfficeExists,
	officeMiddleware.verifyOfficeId,
	officeController.getSpecificOffice);
apiVersion1.patch('/v1/offices/:officeId',
	officeMiddleware.verifyOfficeId,
	exists.isOfficeExists,
	officeMiddleware.verifyOfficeBody,
	officeMiddleware.verifyOfficeId,
	officeController.modifyOffice);
apiVersion1.delete('/v1/offices/:officeId',
	officeMiddleware.verifyOfficeId,
	exists.isOfficeExists, 
	officeMiddleware.verifyOfficeId,
	officeController.deleteOffice);

apiVersion1.post('/v1/auth/signup', userMiddleware.verifyUserBody,
	exists.notEmailTaken,
	userController.registerUser);
apiVersion1.post('/v1/auth/login', userMiddleware.verifyLoginBody, userController.userLogin);
apiVersion1.post('/v1/auth/reset', exists.isEmailExists, userController.reqResetPassword);
apiVersion1.post('/v1/auth/reset/password', exists.isTokenExists, userController.resetPassword);

apiVersion1.post('/v1/office/:officeId/register',
	Auth.isAdmin,
	exists.isOfficeExists,
	exists.isUserExists,
	exists.hasRegistered,
	exists.isPartyExists,
	userController.setUserAsCandidate);

apiVersion1.post('/v1/vote',
	Auth.verifyToken,
	exists.isOfficeExists,
	exists.isCandidateExist,
	exists.hasVoted, 
	voteController.vote);
apiVersion1.get('/v1/office/:officeId/result',
	Auth.verifyToken,
	exists.isOfficeExists,
	voteController.getResult);

export default apiVersion1;
  
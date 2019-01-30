const express = require('express');
var apiVersion1 = express.Router();

const userController = require('../controllers/userController');
const partyController = require('../controllers/partyController');

apiVersion1.get('/users', userController.getAllUsers);
apiVersion1.post('/user.add', userController.addNewUser);

/**
* Routes related with political parties
*/
apiVersion1.post('/parties', partyController.createNewParty);
apiVersion1.get('/parties', partyController.getAllPartiesList);
apiVersion1.get('/parties/:partId', partyController.getSpecificParty);
apiVersion1.patch('/parties/:partId/:partName', partyController.modifyParty)
apiVersion1.delete('/parties/:partId', partyController.deleteParty)

module.exports = apiVersion1;
// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const DataModel = require('../models/DataModel');
const officeFileJson = '../dataHelper/data/offices.json';
const partyFileJson = '../dataHelper/data/parties.json';
const parties = require(partyFileJson);
const offices = require(officeFileJson);

// Configure chai
chai.use(chaiHttp);
chai.should();

let partyBody = {name:'Part Test',hqAddress:'Kigali',logoUrl:'testUrl'};

let officeTypes = ['federal','legistrative','state','local'];
let officeByRandom = officeTypes[Math.floor(Math.random()*officeTypes.length)];

let officeBody = {name:'Office Test',type:officeByRandom};

describe('Politico', () => {
	describe('Parties api', () => {
		describe('/POST create party',  () => {
			it('Status code should be 201 and must be an object', (done) => {
				chai.request(server)
					.post('/v1/parties')
					.send(partyBody)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/GET parties',  () => {
			it('Status code should be 200 and must be an object', (done) => {
				chai.request(server)
					.get('/v1/parties')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/GET One party',  () => {
			let firstParty = DataModel.firstOne(parties);
			it('Status code should be 200 and must be an object', (done) => {
				chai.request(server)
					.get('/v1/parties/'+firstParty.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/PATCH modify party',  () => {
			let firstParty = DataModel.firstOne(parties);
			it('Status code should be 201 and must be an object', (done) => {				chai.request(server)
					.patch('/v1/parties/'+firstParty.id+'/'+firstParty.name)
					.send(partyBody)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/DELETE One party',  () => {
			let firstParty = DataModel.firstOne(parties);
			it('Status code should be 200', (done) => {
				chai.request(server)
					.delete('/v1/parties/'+firstParty.id)
					.end((err, res) => {
						res.should.have.status(200);
						done();
					});
			});
		});
	});
	describe('Political office apis', () => {
		describe('/POST create office',  () => {
			it('Status code should be 201 and must be an object', (done) => {
				chai.request(server)
					.post('/v1/offices')
					.send(officeBody)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/GET offices',  () => {
			it('Status code should be 200 and must be an object', (done) => {
				chai.request(server)
					.get('/v1/offices')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/GET One office',  () => {
			let firstOffice = DataModel.firstOne(offices);
			it('Status code should be 200 and must be an object', (done) => {
				chai.request(server)
					.get('/v1/offices/'+firstOffice.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/PATCH modify office',  () => {
			let firstOffice = DataModel.firstOne(offices);
			it('Status code should be 201 and must be an object', (done) => {
				chai.request(server)
					.patch('/v1/offices/'+firstOffice.id+'/'+firstOffice.name)
					.send(officeBody)
					.end((err, res) => {
						res.should.have.status(201);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/DELETE One office',  () => {
			let firstOffice = DataModel.firstOne(offices);
			it('Status code should be 200', (done) => {
				chai.request(server)
					.delete('/v1/offices/'+firstOffice.id)
					.end((err, res) => {
						res.should.have.status(200);
						done();
					});
			});
		});
	});
});
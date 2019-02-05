// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Office = require('../models/Office');
const Party = require('../models/Party');

// Configure chai
chai.use(chaiHttp);
chai.should();

let partyBody = {name:'Umuhuza',hqAddress:'Gakamba',logoUrl:'muhuzaUrl'};

let officeTypes = ['federal','legistrative','state','local'];
let officeByRandom = officeTypes[Math.floor(Math.random()*officeTypes.length)];

let officeBody = {name:'Umuhuza',type:officeByRandom};
describe('Politico', () => {
	describe('Parties api', () => {
		// Test to get all parties
		beforeEach((done) => {
			chai.request(server)
				.post('/v1/parties')
				.send(partyBody)
				.end((err, res) => {
					done();
				});
		});
		let firstParty = Party.firstOne();
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
		describe('/GET One party',  () => {
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
		beforeEach((done) => {
			chai.request(server)
				.post('/v1/offices')
				.send(officeBody)
				.end((err, res) => {
					done();
				});
		});
		let firstOffice = Office.firstOne();
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
		describe('/PATCH modify office',  () => {
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
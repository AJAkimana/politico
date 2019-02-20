// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import pgConfig from '../../config/pgConfig';
// Configure chai
chai.use(chaiHttp);
chai.should();

const partyBody = {name:'Part Test',hqAddress:'Kigali',logoUrl:'testUrl'},
	partyBodyWithNoName = {hqAddress:'Kigali',logoUrl:'testUrl'},
	partyBodyWithNoAddress = {name:'Part Test', logoUrl:'testUrl'},
	partyBodyWithNoUrl = {name:'Part Test',hqAddress:'Kigali'};

const officeTypes = ['federal','legistrative','state','local'];
const officeByRandom = officeTypes[Math.floor(Math.random()*officeTypes.length)];

const officeBody = {name:'Office Test',type:officeByRandom},
	officeBodyWithNoName = {type:officeByRandom},
	officeBodyWithNoType = {name:'Office Test'},
	officeBodyWithWrongType = {name:'Office Test',type:'Wrong type'};

const wrongId = 2019;

describe('Politico', () => {
	before((done) => {
		pgConfig.initialize(process.env.DATABASE_TEST_URL, done);
	});
	describe('Parties api', () => {
		describe('/POST create party',  () => {
			it('If no name. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.post('/api/v1/parties')
					.send(partyBodyWithNoName)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('If no Address. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.post('/api/v1/parties')
					.send(partyBodyWithNoAddress)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('If no Url. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.post('/api/v1/parties')
					.send(partyBodyWithNoUrl)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('Everything is fine. Status code should be 201 and must be an object', (done) => {
				chai.request(server)
					.post('/api/v1/parties')
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
					.get('/api/v1/parties')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/GET One party',  () => {
			it('id: '+wrongId+'. Status code should be 404 and must be an object', (done) => {
				chai.request(server)
					.get('/api/v1/parties/'+wrongId)
					.end((err, res) => {
						res.should.have.status(404);
						res.body.should.be.a('object');
						done();
					});
			});
			it('Status code should be 200 and must be an object', (done) => {
				chai.request(server)
					.get('/api/v1/parties/'+firstParty.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/PATCH modify party',  () => {
			it('If ID is string. Status code should be 400 and must be an object', (done) => {				chai.request(server)
				.patch('/api/v1/parties/wrongId/noname')
				.send(partyBody)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					done();
				});
			});
			it('If no Name. Status code should be 400 and must be an object', (done) => {				chai.request(server)
				.patch('/api/v1/parties/'+firstParty.id+'/'+firstParty.name)
				.send(partyBodyWithNoName)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					done();
				});
			});
			it('If no Address. Status code should be 400 and must be an object', (done) => {				chai.request(server)
				.patch('/api/v1/parties/'+firstParty.id+'/'+firstParty.name)
				.send(partyBodyWithNoAddress)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					done();
				});
			});
			it('If no Url. Status code should be 400 and must be an object', (done) => {				chai.request(server)
				.patch('/api/v1/parties/'+firstParty.id+'/'+firstParty.name)
				.send(partyBodyWithNoUrl)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					done();
				});
			});
			it('If everything is fine. Status code should be 200 and should be an object', (done) => {				chai.request(server)
				.patch('/api/v1/parties/'+firstParty.id+'/'+firstParty.name)
				.send(partyBody)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
			});
		});
		describe('/DELETE One party',  () => {
			it('If ID is string. Status code should be 400 and should be an object', (done) => {
				chai.request(server)
					.delete('/api/v1/parties/String')
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('If no data to delete. Status code should be 404 and should be an object', (done) => {
				chai.request(server)
					.delete('/api/v1/parties/'+wrongId)
					.end((err, res) => {
						res.should.have.status(404);
						res.body.should.be.a('object');
						done();
					});
			});
			it('Status code should be 200 and should be an object', (done) => {
				chai.request(server)
					.delete('/api/v1/parties/'+firstParty.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
	});
	describe('Political office apis', () => {
		describe('/POST create office',  () => {
			it('If no Name. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.post('/api/v1/offices')
					.send(officeBodyWithNoName)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('if no type. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.post('/api/v1/offices')
					.send(officeBodyWithNoType)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('If type in not in [Legist,state,local,gover]. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.post('/api/v1/offices')
					.send(officeBodyWithWrongType)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('If everything is fine. Status code should be 201 and must be an object', (done) => {
				chai.request(server)
					.post('/api/v1/offices')
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
					.get('/api/v1/offices')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/GET One office',  () => {
			it('ID: '+wrongId+'.Status code should be 404 and must be an object', (done) => {
				chai.request(server)
					.get('/api/v1/offices/'+wrongId)
					.end((err, res) => {
						res.should.have.status(404);
						res.body.should.be.a('object');
						done();
					});
			});
			it('Status code should be 200 and must be an object', (done) => {
				chai.request(server)
					.get('/api/v1/offices/'+firstOffice.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/PATCH modify office',  () => {
			it('If ID is string. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.patch('/api/v1/offices/string')
					.send(officeBody)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('If no Name. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.patch('/api/v1/offices/'+firstOffice.id)
					.send(officeBodyWithNoName)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('If no type. Status code should be 400 and must be an object', (done) => {
				chai.request(server)
					.patch('/api/v1/offices/'+firstOffice.id)
					.send(officeBodyWithWrongType)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						done();
					});
			});
			it('Everything fine. Status code should be 200 and must be an object', (done) => {
				chai.request(server)
					.patch('/api/v1/offices/'+firstOffice.id)
					.send(officeBody)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
		describe('/DELETE One office',  () => {
			it('If no office matching id. Status code should be 404', (done) => {
				chai.request(server)
					.delete('/api/v1/offices/'+wrongId)
					.end((err, res) => {
						res.should.have.status(404);
						res.body.should.be.a('object');
						done();
					});
			});
			it('If deleted. Status code should be 200', (done) => {
				chai.request(server)
					.delete('/api/v1/offices/'+firstOffice.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						done();
					});
			});
		});
	});
});
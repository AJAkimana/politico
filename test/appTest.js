// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Politico", () => {
    describe("Parties api", () => {
        // Test to get all parties
        describe('/GET parties',  () => {
            it("Status code should be 200", (done) => {
                chai.request(server)
                    .get('/v1/parties')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
             });
            it("should get an object", (done) => {
                 chai.request(server)
                     .get('/v1/parties')
                     .end((err, res) => {
                         res.body.should.be.a('object');
                         done();
                      });
             });
        });
        describe('/GET One party',  () => {
            it("Status code should be 200", (done) => {
                chai.request(server)
                    .get('/v1/parties/1')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
             });
            it("should get an object", (done) => {
                 chai.request(server)
                     .get('/v1/parties/1')
                     .end((err, res) => {
                         res.body.should.be.a('object');
                         done();
                      });
             });
        });
        describe('/POST create party',  () => {
            const body = {name:'PDS',hqAddress:'Kimironko',logoUrl:'logopdc'};
            it("Status code should be 201", (done) => {
                chai.request(server)
                    .post('/v1/parties')
                    .send(body)
                    .end((err, res) => {
                        res.should.have.status(201);
                        done();
                    });
             });
            it("Response body should be object", (done) => {
                chai.request(server)
                    .post('/v1/parties')
                    .send(body)
                    .end((err, res) => {
                        res.body.should.be.a('object');
                        done();
                    });
             });
        });
    });
});
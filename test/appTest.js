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
            it("Status code should be 200 and must be an object", (done) => {
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
            it("Status code should be 200 and must be an object", (done) => {
                chai.request(server)
                    .get('/v1/parties/1')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
             });
        });
        describe('/POST create party',  () => {
            const body = {name:'Umuhuza',hqAddress:'Gakamba',logoUrl:'muhuzaUrl'};
            it("Status code should be 201 and must be an object", (done) => {
                chai.request(server)
                    .post('/v1/parties')
                    .send(body)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    });
             });
        });
        describe('/PATCH modify party',  () => {
            const body = {name:'Akimana',hqAddress:'Gitega',logoUrl:'akimanaUl'};
            it("Status code should be 201 and must be an object", (done) => {
                chai.request(server)
                    .patch('/v1/parties/2/fdc')
                    .send(body)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    });
             });
        });
        describe('/DELETE One party',  () => {
            it("Status code should be 204", (done) => {
                chai.request(server)
                    .delete('/v1/parties/7')
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
             });
        });
    });
});
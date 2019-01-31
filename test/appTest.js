// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

let partyBody = {name:'Umuhuza',hqAddress:'Gakamba',logoUrl:'muhuzaUrl'};

let officeTypes = ['federal','legistrative','state','local'];
let officeByRandom = officeTypes[Math.floor(Math.random()*officeTypes.length)];

let officeBody = {name:'Umuhuza',type:officeByRandom};
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
            it("Status code should be 201 and must be an object", (done) => {
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
        describe('/PATCH modify party',  () => {
            it("Status code should be 201 and must be an object", (done) => {
                chai.request(server)
                    .patch('/v1/parties/2/fdc')
                    .send(partyBody)
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
    describe("Political office apis", () => {
        // Test to get all parties
        describe('/GET offices',  () => {
            it("Status code should be 200 and must be an object", (done) => {
                chai.request(server)
                    .get('/v1/offices')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
             });
        });
        // describe('/GET One office',  () => {
        //     it("Status code should be 200 and must be an object", (done) => {
        //         chai.request(server)
        //             .get('/v1/offices/1')
        //             .end((err, res) => {
        //                 res.should.have.status(200);
        //                 res.body.should.be.a('object');
        //                 done();
        //             });
        //      });
        // });
        describe('/POST create office',  () => {
            it("Status code should be 201 and must be an object", (done) => {
                chai.request(server)
                    .post('/v1/parties')
                    .send(officeBody)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    });
             });
        });
    });
});
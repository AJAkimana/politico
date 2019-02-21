const { Pool } = require('pg');
const createTables = require('./createTables');
const dropTables = require('./dropTables');
const dotenv = require('dotenv');

dotenv.load({ path: '.app.env'});

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
}) 

pool.on('connect', (err) => {
	// if(err) console.log('Error',err);
});

const createUserTable = () => {
	pool.query(createTables.User)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const createPartyTable = () => {
	pool.query(createTables.Party)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const createOfficeTable = () => {
	pool.query(createTables.Office)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const createPetitionTable = () => {
	pool.query(createTables.Petition)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const createVoteTable = () => {
	pool.query(createTables.Vote)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const createCandidateTable = () => {
	pool.query(createTables.Candidate)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};


/**
* Drop databases
*/
const dropUserTable = () => {
	pool.query(dropTables.User)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const dropPartyTable = () => {
	pool.query(dropTables.Party)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const dropOfficeTable = () => {
	pool.query(dropTables.Office)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const dropPetitionTable = () => {
	pool.query(dropTables.Petition)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const dropVoteTable = () => {
	pool.query(dropTables.Vote)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};
const dropCandidateTable = () => {
	pool.query(dropTables.Candidate)
	    .then((res) => {

	    })
	    .catch((err) => {

	    });
};

const createAllTables = () =>{
	createUserTable(),
	createPartyTable(),
	createOfficeTable(),
	createCandidateTable(),
	createVoteTable(),
	createPetitionTable()
};
const dropAllTables = () =>{
	dropCandidateTable(),
	dropVoteTable(),
	dropPetitionTable(),
	dropUserTable(),
	dropPartyTable(),
	dropOfficeTable()
};
pool.on('remove', () => {
	
});
module.exports = {
	createUserTable,
	createPartyTable,
	createOfficeTable,
	createVoteTable,
	createPetitionTable,
	createCandidateTable,

	dropUserTable,
	dropPartyTable,
	dropOfficeTable,
	dropVoteTable,
	dropPetitionTable,
	dropCandidateTable,

	createAllTables,
	dropAllTables,
	pool
};

require('make-runnable');

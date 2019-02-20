const { Pool } = require('pg');
const createTables = require('./createTables');
const dropTables = require('./dropTables');
const dotenv = require('dotenv');

dotenv.load({ path: '.app.env'});

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
}) 

pool.on('connect', () => {
	console.log('connected to the db');
});

const createUserTable = () => {
	pool.query(createTables.User)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const createPartyTable = () => {
	pool.query(createTables.Party)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const createOfficeTable = () => {
	pool.query(createTables.Office)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const createPetitionTable = () => {
	pool.query(createTables.Petition)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const createVoteTable = () => {
	pool.query(createTables.Vote)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const createCandidateTable = () => {
	pool.query(createTables.Candidate)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};


/**
* Drop databases
*/
const dropUserTable = () => {
	pool.query(dropTables.User)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const dropPartyTable = () => {
	pool.query(dropTables.Party)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const dropOfficeTable = () => {
	pool.query(dropTables.Office)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const dropPetitionTable = () => {
	pool.query(dropTables.Petition)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const dropVoteTable = () => {
	pool.query(dropTables.Vote)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
	    });
};
const dropCandidateTable = () => {
	pool.query(dropTables.Candidate)
	    .then((res) => {
	      console.log(`Success`);
	    })
	    .catch((err) => {
	      console.log(err);
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
	console.log('client removeed');
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

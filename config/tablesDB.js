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
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const createPartyTable = () => {
	pool.query(createTables.Party)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const createOfficeTable = () => {
	pool.query(createTables.Office)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const createPetitionTable = () => {
	pool.query(createTables.Petition)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const createVoteTable = () => {
	pool.query(createTables.Vote)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const createCandidateTable = () => {
	pool.query(createTables.Candidate)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};


/**
* Drop databases
*/
const dropUserTable = () => {
	pool.query(dropTables.User)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const dropPartyTable = () => {
	pool.query(dropTables.Party)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const dropOfficeTable = () => {
	pool.query(dropTables.Office)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const dropPetitionTable = () => {
	pool.query(dropTables.Petition)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const dropVoteTable = () => {
	pool.query(dropTables.Vote)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
	    });
};
const dropCandidateTable = () => {
	pool.query(dropTables.Candidate)
	    .then((res) => {
	      console.log(res);
	      pool.end();
	    })
	    .catch((err) => {
	      console.log(err);
	      pool.end();
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
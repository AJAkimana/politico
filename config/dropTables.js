const queries = {
	User: `DROP TABLE IF EXISTS users returning *`,
	Office: `DROP TABLE IF EXISTS offices returning *`,
	Party: `DROP TABLE IF EXISTS parties returning *`,
	Candidate: `DROP TABLE IF EXISTS candidates returning *`,
	Vote: `DROP TABLE IF EXISTS votes returning *`,
	Petition: `DROP TABLE IF EXISTS petitions returning *`,
}

module.exports = queries;
const queries = {
	User: 
	`CREATE TABLE IF NOT EXISTS 
	users (
		id SERIAL PRIMARY KEY,
		firstname varchar(50) NOT NULL,
		lastname varchar(50) NOT NULL,
		othername varchar(50) NOT NULL,
		email varchar(100) NOT NULL,
		phoneNumber varchar(15) NOT NULL,
		passportUrl varchar(200) NOT NULL,
		isAdmin int NOT NULL DEFAULT '0',
		createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
		updateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
	)`,
	Office:
		`CREATE TABLE IF NOT EXISTS offices (
				id SERIAL,
				name varchar(100) NOT NULL,
				type varchar(20) NOT NULL,
				created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
			 	PRIMARY KEY (id)
			)`,
	Party:
		`CREATE TABLE IF NOT EXISTS parties (
				id SERIAL,
				name varchar(50) NOT NULL,
				hqAddress varchar(50) NOT NULL,
				logoUrl varchar(100) NOT NULL,
				created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY (id)
			)`,
	Candidate:
		`CREATE TABLE IF NOT EXISTS candidates (
				id SERIAL,
				office int NOT NULL,
				party int NOT NULL,
				candidate int NOT NULL,
				created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY (id),
				CONSTRAINT candidate_office_fk FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
				CONSTRAINT candidate_party_fk FOREIGN KEY (party) REFERENCES parties (id),
				CONSTRAINT candidate_user_fk FOREIGN KEY (candidate) REFERENCES users (id)
			)`,
	Petition:
		`CREATE TABLE IF NOT EXISTS petitions (
				id SERIAL,
				createdOn int NOT NULL,
				createdBy int NOT NULL,
				office int NOT NULL,
				body text NOT NULL,
				created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY (id),
				CONSTRAINT petition_user_fk FOREIGN KEY (createdBy) REFERENCES users (id),
				CONSTRAINT pettion_office_fk FOREIGN KEY (office) REFERENCES offices (id)
			)`,
	Vote:
		`CREATE TABLE IF NOT EXISTS votes (
				id SERIAL,
				createdOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				createdBy int NOT NULL,
				office int NOT NULL,
				created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY (id),
				CONSTRAINT vote_office_fk FOREIGN KEY (office) REFERENCES offices (id),
				CONSTRAINT vote_user_fk FOREIGN KEY (createdBy) REFERENCES users (id)
			)`,
}
module.exports = queries;
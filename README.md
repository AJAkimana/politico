# Politico
Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency

Embedded JavaScript templates

[![Build Status](https://travis-ci.org/AJAkimana/politico.svg?branch=develop)](https://travis-ci.org/AJAkimana/politico) [![Coverage Status](https://coveralls.io/repos/github/AJAkimana/politico/badge.svg?branch=develop)](https://coveralls.io/github/AJAkimana/politico?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/03a8b99c0e216d5f4ed9/maintainability)](https://codeclimate.com/github/AJAkimana/politico/maintainability)

## Technologies

  * Runtime environment: [Node](https://nodejs.org/)
  * Backend framework: [Express.js](https://expressjs.com/)
  * Database: [Postgres](https://www.postgresql.org/)

## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

## Features / APIs


| API | Verb | Description |
| ------ | ------ | ------ |
| /offices | GET |  To view a list of political offices |
| /parties | GET |  To view a list of political parties |
| /offices/id | GET | To view a specific political office |
| /parties/id | GET | To view a specific political party |
| /offices | POST | To create an office |
| /parties | POST | To create political party |
| /parties/id/name | PATCH | To modify political party |
| /offices/id | PATCH | To modify political office |
| /parties/id | DELETE | Deleting specific party |
| /offices/id | DELETE | Deleting specific office |
| /auth/signup | POST | Creating account |
| /auth/login | POST | User login |
| /auth/reset | POST | Request link for reset |
| /auth/reset/password | POST | Reset pwd using the link sent |
| /office/id/register | POST | Set candidate |
| /vote | POST | Voting a candidate |
| /office/id/result | GET | View election result |


## Quick Start

  The quickest way to setup POLITICO APP is as shown below:

```
git https://github.com/AJAkimana/politico.git
cd politico
```

  Install dependencies:

```bash
$ npm install
```

  Test app:

```bash
$ npm test
```

  Start the server:

```bash
$ npm start
```

## The current maintainer:

[Akimana Jean d'Amour](https://github.com/AJAkimana)
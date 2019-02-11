const randomstring = require('randomstring');

exports.getMainPage = (req, res) => {
	return res.render('parties', {
		title: 'Parties and offices',
		rString: randomstring.generate(9),
	});
};
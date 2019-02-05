const randomstring = require('randomstring');

exports.getMainPage = (req, res) => {

	return res.render('parties', {
		title: 'Parties and offices',
		reqUrl: req.body,
		rString: randomstring.generate(9),
	});
};
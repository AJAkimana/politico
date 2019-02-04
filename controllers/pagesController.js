/**
* Generate string that will be used in prevention of some caching
*/
const randomstring = require("randomstring");

exports.getMainPage = (req, res) => {
	let rString = randomstring.generate(9);
	console.log('Rstring:'+rString)
	return res.render('parties', {
		title: 'Parties and offices',
		rString: rString,
	});
}
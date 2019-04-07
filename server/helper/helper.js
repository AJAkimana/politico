import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const helper = {
	getNewId (array) {
		if (array.length > 0) return array[array.length - 1].id + 1;
		else return 1;
	},
	newDate (){
		return new Date().toString();
	},
	mustBeInArray(array, infoName, id){
		return new Promise((resolve, reject) => {
			const row = array.find(r => r.id == id);
			if (!row) {
				reject({
					message: 'No '+infoName+' found',
					status: 404
				});
			}
			resolve(row);
		});
	},
	writeJSONFile(filename, content){
		let fileName = __dirname+'/'+filename;
		fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (err,ok) => {
			if (err)  console.log('Err:'+JSON.stringify(err));
			console.log('Ok:'+JSON.stringify(ok));
		});
	},
	
	hashPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	},

	comparePassword(hashPassword, password){
		return bcrypt.compareSync(password, hashPassword);
	},

	isValidEmail(email){
		return /\S+@\S+\.\S+/.test(email);
	},

	generateToken(id) {
		const token = jwt.sign({
			userId: id
		},
		process.env.JWT_SECRET, { expiresIn: '7d' }
		);
		return token;
	},
	generateResetToken(tokenLenght){
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charlen = chars.length;
		let buf = [];
		for (let i = 0; i < tokenLenght; ++i) {
			buf.push(chars[getRandomInt(0, charlen - 1)]);
		}
		return buf.join('');
	},
	
};
function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default helper;

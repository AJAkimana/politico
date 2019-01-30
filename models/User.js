const helper = require('../dataHelper/helper.js')
const userFileJson = '../dataHelper/data/users.json'
let users = require(userFileJson)
exports.getUsers = () => {
	return new Promise((resolve, reject) => {
        if (users.length === 0) {
            reject({
                message: 'no user available',
                status: 204
            })
        }
        resolve(users)
    })
}
exports.getOneUser = (id) => {}
exports.insertUser = (newUser) => {
	return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(users) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newUser = { ...id, ...newUser, ...date }
        users.push(newUser)
        helper.writeJSONFile(userFileJson, users)
        resolve(newUser)
    })
}
exports.updateUser = (id, newUser) => {}
exports.deleteUser = (id) => {}
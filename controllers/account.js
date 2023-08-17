const { GetItem, PutItem } = require('./dynamo')
const { compare, genSalt, hash } = require('bcrypt')

module.exports.authenticate = (username, password) => new Promise(async (resolve) => {
    const user = await GetItem({ TableName: 'login-details', Key: { username: username } })
    if (user && user.data && user.data.password) {
        console.log('this is my user: ', user)
        console.log(password, user.data.password)
        try {
            const passwordmatch = await compare(password.toString(), user.data.password.toString())
            var authuser = JSON.parse(JSON.stringify(user.data))
            delete authuser.password;
            return resolve(user)
        } catch (error) {
            console.log("password match error", error)
            return resolve(false)

        }

        console.log(passwordmatch)
        // compare(password.toString(), user.password, (error, ismatch) => {
        //     if (error) {
        //         console.log('in compare', error)
        //         return
        //         resolve(false)
        //     }
        //     else {
        //         if (ismatch) {
        //             console.log('I have a match', ismatch)
        //             var authuser = JSON.parse(JSON.stringify(user.data))
        //             delete authuser.password;
        //             return resolve(user)
        //         }
        //         else {
        //             console.log("I didn't get a match")
        //             return resolve(false)
        //         }
        //     }
        // })
    }
})

module.exports.register = (username, password) => new Promise(async (resolve) => {
    genSalt(10, (error, salt) => {
        if (error) return resolve({ success: false, error: error.message })
        hash(password, salt, async (err, myhash) => {
            if (err) return resolve({ success: false, error: err.message })
            await PutItem({
                TableName: 'login-details', Item: {
                    username: username, password: myhash
                }
            })
            return resolve()
        })
    })
})


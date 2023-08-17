const express = require('express')

module.exports.isauthenticated = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            console.log('we are authenticated')
            return next()
        }
        else {
            console.log('didnt authenticate')
            req.session.returnTo = req.originalUrl
            res.redirect(req.protocol + '://' + req.get('Host').toLowerCase() + '/login')
            return
        };
    } catch (error) {
        console.log('we have an error in is authenticated', error)
        res.redirect('/login')
        return
    }


}

module.exports.userdata = (req) => {
    try {
        var user = JSON.parse(JSON.stringify(req.user))
        user.auth = true
        return user
    } catch (error) {
        user = {auth:false}
        return user
    }


}
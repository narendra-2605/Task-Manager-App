const Users = require('../models/user.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(new localStrategy(
        { usernameField: 'email', password: 'password' },
        // function of email, password, done(callback)
        async (email, password, done) => {
            // look for the user data
            const user = await Users.findOne({ email: email })
            if (!user) { return done(null, false, { message: 'User not found.' }); }
            // const passwordd = await bcrypt.compare(password, user.password)
            // if (user.password !== passwordd) {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            // if the user is properly not authenticated
            // return done(null, user);
            return done(null, false, {
                message: 'Invalid password.'
            });
        }
    ));
    // store cookie inside the browser
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })

    //take that cookie and return the user from that
    passport.deserializeUser((id, cb) => {
        Users.findOne({ _id: id }).then(user => cb(null, user)).catch(e => cb(e, null));
    })
}












// passport.use(
    //     new localStrategy((email, password, done) => {
    //         Users.findOne({ email: email }, (err, user) => {
    //             if (err) throw err;
    //             if (!user) return done(null, false);
    //             bcrypt.compare(password, user.password, (err, result) => {
    //                 if (err) throw err;
    //                 if (result === true) {
    //                     return done(null, user);
    //                 } else {
    //                     return done(null, false);
    //                 }
    //             });
    //         });
    //     })
    // );
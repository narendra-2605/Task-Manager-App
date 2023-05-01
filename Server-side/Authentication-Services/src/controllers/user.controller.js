const Users = require('../models/user.model');
const bcrypt = require("bcryptjs");

const createUsers = async (req, res) => {
    if (req.session.passport) {
        try {
            if (req.user.role === 'superAdmin') {
                console.log("password is:", req.body.password);
                const salt = await bcrypt.genSalt();
                console.log("Slat is:", salt);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                console.log("Hashed password", hashedPassword);
                const user = new Users({
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password: hashedPassword,
                    salt: salt,
                    role: 'admin',
                    orgId: req.body.orgId,
                    reportingTo: req.user._id,
                    createdBy: req.user._id,
                    updatedBy: req.user._id
                })
                res.status(200).json({ message: "Admin is Successfully Registered:", user });
                await user.save();
            }
            else if (req.user.role === 'admin') {
                console.log("password is:", req.body.password);
                const salt = await bcrypt.genSalt();
                console.log("Slat is:", salt);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                console.log("Hashed password", hashedPassword);
                const user = new Users({
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password: hashedPassword,
                    salt: salt,
                    role: 'user',
                    orgId: req.body.orgId,
                    reportingTo: req.user._id,
                    createdBy: req.user._id,
                    updatedBy: req.user._id
                })
                res.status(200).json({ message: "User is Successfully Registered:", user });
                await user.save();
            }
            console.log("session User is:", req.user);
        }
        catch (err) {
            res.status(500).json({ message: "User registration Failed:" })
            console.log(err);
        }
    } else {
        res.status(500).json({ message: "Please Login first:" });
    }
}

const getAdminList = async (req, res) => {
    try {
        const adminList = await Users.find({ role: 'admin' });
        // console.log("Admin list", adminList);
        res.send(adminList);
        // res.status(201).json({ message: "Successful" });
    } catch (error) {
        console.log(error);
    }
}

const deleteUsers = async (req, res) => {
    // console.log("req.user from delete api", req.user);
    // console.log("req.session from delete api", req.session);
    if (req.session.passport) {
        if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
            try {
                console.log("id is:", req.params.id);
                const user = findById(req.params.id);
                if (req.user.role === 'admin' && user.role === 'user') {
                    await Users.findByIdAndDelete(req.params.id);
                    res.status(200).json({ message: "Deleted Successfully" });
                } else {
                    res.status(200).json({ message: "you don't have authorities to delete this user" });
                }
                if (req.user.role === 'superAdmin' && user.role === 'admin' || user.role === 'user') {
                    await Users.findByIdAndDelete(req.params.id);
                    res.status(200).json({ message: "Deleted Successfully" });
                } else {
                    res.status(200).json({ message: "you don't have authorities to delete this user" });
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            res.status(500).json({ message: "Only Admin or Super admin can Delete  user" });
        }
    } else {
        res.status(500).json({ message: "Please Login first:" });
    }
}

const login = (passport) => {
    return async (req, res, next) => {
        try {
            passport.authenticate("local", (err, user, info) => {
                if (err) throw err;
                if (!user) res.send("No User Exists");
                else {
                    req.logIn(user, err => {
                        if (err) throw err;
                        const sess = req.session;
                        const email = req.body.email;
                        const password = req.body.password;
                        sess.email = email;
                        sess.pasword = password;
                        res.send(`Successfully Authenticated:, ${JSON.stringify(req.session)}`);
                        console.log("User is:", req.user);
                    })
                }
            })(req, res, next);
        }
        catch (error) {
            console.log(error)
        }
    }
}

const logout = (req, res) => {
    try {
        console.log("Seesion is:", req.session);
        console.log("Seesion passport:", req.session.passport);
        console.log("Logout api is called");
        req.session.destroy();
        res.status(200).json({ message: "Loged out Successfully:" })
        console.log("session after logout", req.session)
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUsers, login, logout, deleteUsers, getAdminList
}

// module.exports.userControllerr.login = login;
// module.exports.userControllerr.logout = logout;

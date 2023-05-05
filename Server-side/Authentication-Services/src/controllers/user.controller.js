const Users = require('../models/user.model');
const bcrypt = require("bcryptjs");

const createAdmin = async (req, res) => {
    // if (req.session.passport) {
    try {
        // if (req.user.role === 'superAdmin') {
        console.log("Req from Cretae User", req.body);
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
            // reportingTo: req.user._id,
            // createdBy: req.user._id,
            // updatedBy: req.user._id
        })
        res.status(200).json({ message: "Admin is Successfully Registered:", user });
        await user.save();
        // }
        // else if (req.user.role === 'admin') {
        //     console.log("password is:", req.body.password);
        //     const salt = await bcrypt.genSalt();
        //     console.log("Slat is:", salt);
        //     const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //     console.log("Hashed password", hashedPassword);
        //     const user = new Users({
        //         username: req.body.username,
        //         name: req.body.name,
        //         email: req.body.email.toLowerCase(),
        //         password: hashedPassword,
        //         salt: salt,
        //         role: 'user',
        //         orgId: req.body.orgId,
        //         reportingTo: req.user._id,
        //         createdBy: req.user._id,
        //         updatedBy: req.user._id
        //     })
        //     res.status(200).json({ message: "User is Successfully Registered:", user });
        //     await user.save();
        // }
        console.log("session User is:", req.user);
    }
    catch (err) {
        res.status(500).json({ message: "User registration Failed:" })
        console.log(err);
    }
    // } else {
    //     res.status(500).json({ message: "Please Login first:" });
    // }
}
const createUser = async (req, res) => {
    // if (req.session.passport) {
    try {
        // if (req.user.role === 'admin') {
        console.log("Req from Cretae User", req.body);
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
            // orgId: req.body.orgId,
            // reportingTo: req.user._id,
            // createdBy: req.user._id,
            // updatedBy: req.user._id
        })
        res.status(200).json({ message: "User is Successfully Registered:", user });
        await user.save();
        // }
        console.log("session User is:", req.user);
    }
    catch (err) {
        res.status(500).json({ message: "User registration Failed:" })
        console.log(err);
    }
    // } else {
    //     res.status(500).json({ message: "Please Login first:" });
    // }
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

// User list by Admin ID
const getUserList = async (req, res) => {

    try {
        // const userId = req.session.passport.user;
        // console.log("Seesion is:", req.session);
        // console.log("Seesion passport from getUserList:", req.session.passport.user);
        // console.log("userId from get userlist by admin Id", userId);
        const userList = await Users.find({ role: 'user', createdBy: req.session.passport.user });
        // console.log("Admin list", adminList);
        // res.send(adminList);
        res.status(201).json({ message: "User List:", userList });
    } catch (error) {
        console.log(error);
    }
}

const deleteUsers = async (req, res) => {
    // console.log("req.user from delete api", req.user);
    // console.log("req.session from delete api", req.session);
    try {
        console.log("Users id :", req.params.userId);
        await Users.findByIdAndDelete(req.params.userId);
        res.status(201).json({ message: "Deleted Successfully" });
        console.log("User deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error" });
    }
    // if (req.session.passport) {
    // if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
    //     try {
    //         console.log("id is:", req.params.id);
    //         const user = findById(req.params.id);
    //         if (req.user.role === 'admin' && user.role === 'user') {
    //             await Users.findByIdAndDelete(req.params.id);
    //             res.status(200).json({ message: "Deleted Successfully" });
    //         } else {
    //             res.status(200).json({ message: "you don't have authorities to delete this user" });
    //         }
    //         if (req.user.role === 'superAdmin' && user.role === 'admin' || user.role === 'user') {
    //             await Users.findByIdAndDelete(req.params.id);
    //             res.status(200).json({ message: "Deleted Successfully" });
    //         } else {
    //             res.status(200).json({ message: "you don't have authorities to delete this user" });
    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }
    // else {
    //     res.status(500).json({ message: "Only Admin or Super admin can Delete  user" });
    // }

    // } else {
    //     res.status(500).json({ message: "Please Login first:" });
    // }
}

const login = (passport) => {
    return async (req, res, next) => {
        try {
            if (req.body.email === 'superAdmin2023@gmail.com' && req.body.password === 'superAdmin2023') {
                const user = await Users.findOne({ email: 'superAdmin2023@gmail.com' });
                const sess = req.session;
                const email = req.body.email;
                const password = req.body.password;
                sess.email = email;
                sess.pasword = password;
                // res.send(`Successfully Authenticated:, ${JSON.stringify(req.session)}`);
                // console.log("super user is", user);
                res.status(200).json({ user: user });
                // res.send(req.user);
                // console.log("User is:", req.user);
            } else {
                console.log("login:");
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
                            // res.send(`Successfully Authenticated:, ${JSON.stringify(req.session)}`);
                            // console.log("user is", user);
                            // console.log("req.User is:", req.user);
                            res.status(200).json({ user: user });
                        })
                    }
                })(req, res, next);
            }
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
    createAdmin, createUser, login, logout, deleteUsers, getAdminList, getUserList
}

// module.exports.userControllerr.login = login;
// module.exports.userControllerr.logout = logout;

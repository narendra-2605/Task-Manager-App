const userController = require('../controllers/user.controller');
const organizationController = require('../controllers/organization.controller');

module.exports = function routes(passport) {

    const router = require('express').Router();
    router.get('/hello', (req, res) => {
        res.send("Hello");
    });

    router.post('/login', userController.login(passport));

    router.post('/createOrganization', organizationController.createOrganization);

    router.get('/getOrganizationList', organizationController.getOrganizationList);

    router.post('/createUsers', userController.createUsers);

    router.post('/logout', userController.logout);

    router.delete('/deleteUsers/:id', userController.deleteUsers);

    router.get('/getAdminList', userController.getAdminList);

    return router;
}




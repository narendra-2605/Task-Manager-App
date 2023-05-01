const Organizations = require('../models/organization.model');

const createOrganization = async (req, res) => {
    // if (req.session !== undefined) 
    if (req.session.passport) {
        try {
            const org = await Organizations.findOne({
                email: req.body.email
            })
            if (org) {
                res.status(500).json({ message: "Organization Already Exist" })
            }
            const organization = new Organizations({
                name: req.body.name,
                email: req.body.email,
                details: req.body.details
            })
            console.log("Organization: ", organization);
            await organization.save();
            res.status(200).json({ organization })
        }
        catch (error) {
            res.status(500).json({ message: "Organization Registration Failed " });
            console.log(error);
        }
    } else {
        res.status(500).json({ message: "Please Login first:" });
    }
}

const getOrganizationList = async (req, res) => {
    if (req.session.passport) {
        // console.log("session from organization list:",req.session);
        try {
            console.log("entered route");
            const organizationList = await Organizations.find()
            res.send(organizationList);
            res.status(201).JSON({ message: "Successful" });
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(500).json({ message: "Please Login first:" });
    }
}



module.exports.createOrganization = createOrganization;
module.exports.getOrganizationList = getOrganizationList;
const Organizations = require('../models/organization.model');

const createOrganization = async (req, res) => {
    // if (req.session !== undefined) 
    // if (req.session.passport) {
    try {
        // console.log("Req from createOrganization", req.body);
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
        // res.send(organization);
        return res.status(200).json({ message: "Data Saved" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organization Registration Failed " });
    }
    // } else {
    //     res.status(500).json({ message: "Please Login first:" });
    // }
}

const getOrganizationList = async (req, res) => {
    // if (req.session.passport) {

    try {
        // console.log("session from organization list:", req.session);
        // console.log("entered route");
        const organizationList = await Organizations.find()
        // res.send(organizationList);
        res.status(201).json({ message: "Successful", organizationList });
    }
    catch (error) {
        console.log(error);
    }
    // }
    // else {
    //     res.status(500).json({ message: "Please Login first:" });
    // }
}

const deleteOrganization = async (req, res) => {
    try {
        // console.log("Organization id :", req.params.organizationId);
        await Organizations.findByIdAndDelete(req.params.organizationId);
        res.status(201).json({ message: "Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error" });
    }
}

module.exports = {
    createOrganization, getOrganizationList, deleteOrganization,
}
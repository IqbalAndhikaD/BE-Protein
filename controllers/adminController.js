const adminTable = require('../models/admin')

module.exports = {

    getAllAdmin : async (req, res) => {
        try {
            const Admin = await adminTable.find()
            res.status(200).json({Admin})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    postAdmin : async (req, res) => {
        try {
            const {username, password, email} = req.body
            const Admin = new adminTable({
                username,
                password,
                email
            })
            await Admin.save()
            res.status(200).json({Admin})
        } catch (error){
            console.log(error)
            res.status(500).json(error)
        }
    }
}
const userTable = require('../models/userModels')

module.exports = {
    getAllUser : async (req, res) => {
        try {
            const User = await userTable.find()
            res.status(200).json({User})
        } catch (error){
            console.log(error)
            res.status(500).json(error)
        }
    },

    postUser : async (req, res) => {
        try {
            const {username, password, email, bidang} = req.body
            const User = new userTable({
                username,
                password,
                email,
                bidang
            })
            await User.save()
            res.status(200).json({User})
        } catch (error){
            console.log(error)
            res.status(500).json(error)
        }
    }
}
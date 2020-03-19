const Info = require('../../models/info.model')

module.exports = {

    //show info
    info: async (req, res, next) => {
        const info = await Info.find()
        console.log(info)
        res.render('backEnd/info/info', {
            info: info
        })
    },

    //add info
    addInfoForm: async (req, res, next) => {
        res.render('backEnd/info/addInfo')
    },

    addInfo: async (req, res, next) => {
        let {
            address,
            phone,
            email
        } = req.body
        if (address == '' || phone == '' || email == '') {
            req.flash('error_msg', "Please fill in the fields.")
            return res.redirect('/admin/info/add')
        }
        const info = await Info.find()

        const newInfo = new Info({
            address,
            phone,
            email
        })
        const savedInfo = await newInfo.save()
        console.log(savedInfo)
        res.redirect('/admin/info')
    },

    //edit info
    editInfoForm: async (req, res, next) => {
        const id = req.params.id
        const info = await Info.findOne({ _id: id })
        console.log(info.id)
        res.render('backEnd/info/editInfo', {
            info: info
        })
    },

    editInfo: async (req, res, next) => {
        const id = req.params.id
        let {
            address,
            phone,
            email
        } = req.body
        if (address == '' || phone == '' || email == '') {
            req.flash('error_msg', "Please fill in the fields.")
            return res.redirect(`/admin/info/edit/${id}`)
        }
        const editedInfo = await Info.updateOne({
            _id: id
        }, {
            address,
            phone,
            email
        })
        console.log(editedInfo)
        res.redirect('/admin/info')
    }



}
//module ends here
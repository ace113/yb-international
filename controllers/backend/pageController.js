const Pages = require('../../models/pages.model')

module.exports = {
    //add Pages form 
    addPagesForm: (req, res, next) => {
        res.render('backend/Pagess/addPages')
    },

    // edit Pages form 
    editPagesForm: async (req, res, next) => {
        const id = req.params.id

        const PagesFound = await Pages.findOne({ _id: id })

        res.render('backend/Pagess/editPages', {
            Pages: PagesFound
        })

        /* use this to render the values to the edit Pages form */


    },

    // function to add Pages
    addPages: async (req, res, next) => {
        let {
            author,
            email,
            comment,
            product,
            show,
            submittedDate
        } = req.body

        const Pages = await Pages.findOne({ email })
        if (Pages) {
            return res.json({ message: "Pages is already made." })
        }

        const newPages = new Pages({
            author,
            email,
            comment,
            product,
            show,
            submittedDate
        })

        const savePages = await newPages.save()

        if (!savePages) {
            return res.status(400).json({ message: "new cusomer not saved!" })
        }
        res.redirect('/admin/Pagess')
    },

    // function to delete Pages
    editPages: async (req, res, next) => {
        const id = req.params.id

        let {
            author,
            email,
            comment,
            product,
            show,
            submittedDate
        } = req.body

        const editedPages = await Pages.updateOne({
            _id: id
        }, {
            author,
            email,
            comment,
            product,
            show,
            submittedDate
        })

        if (!editedPages) {
            return res.status(400).json({ message: 'edit Pages failed' })
        }
        res.redirect('/admin/Pagess')
    },

    // function to delete Pages
    deletePages: async (req, res, next) => {
        const id = req.params.id

        const deletedPages = await Pages.deleteOne({
            _id: id
        })
        if (!deletedPages) {
            return res.status(400).json({ message: 'delete Pages failed' })
        }
        res.redirect('/admin/Pagess')
    },

    // function to get the list of Pages
    getPagesList: async (req, res, next) => {

        const Pageslist = await Pages.find()

        if (!Pageslist) {
            return res.status(400).json({ message: 'getting Pages list failed' })
        }

        res.render('backend/Pagess/PagesList', {
            Pagess: Pageslist
        })

    },

    // function to get the specific Pages
    getPages: async (req, res, next) => {
        const id = req.params.id

        const PagesFound = await Pages.findOne({ _id: id })

        res.render('backend/Pagess/PagesInfo', {
            Pages: PagesFound
        })

        // render found Pages to the Pages info page
    }



}
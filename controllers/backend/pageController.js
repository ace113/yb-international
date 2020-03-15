const Pages = require('../../models/pages.model')

module.exports = {
    //add Pages form 
    addPageForm: (req, res, next) => {
        res.render('backEnd/pages/addPage')
    },

    // edit Pages form 
    editPageForm: async (req, res, next) => {
        const id = req.params.id

        const PagesFound = await Pages.findOne({ _id: id })

        res.render('backEnd/Page/editPages', {
            Pages: PagesFound
        })

        /* use this to render the values to the edit Pages form */


    },

    // function to add Pages
    addPage: async (req, res, next) => {
        let {
            pageType,
            pageTitle,
            description
        } = req.body
        const Page = await Pages.findOne({ pageType: pageType })
        if (Page) {
            req.flash('error_msg', 'Page already exists.')
            return res.redirect('/admin/page/add')
        }

        const newPages = new Pages({
            pageType,
            pageTitle,
            description
        })
        console.log(newPages)

        const savePages = await newPages.save()

        if (!savePages) {
            return res.status(400).json({ message: "new cusomer not saved!" })
        }
        res.redirect('/admin/Pages')
    },

    // function to delete Pages
    editPage: async (req, res, next) => {
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
        res.redirect('/admin/Pages')
    },

    // function to delete Pages
    deletePage: async (req, res, next) => {
        const id = req.params.id

        const deletedPages = await Pages.deleteOne({
            _id: id
        })
        if (!deletedPages) {
            return res.status(400).json({ message: 'delete Pages failed' })
        }
        res.redirect('/admin/Pages')
    },

    // function to get the list of Pages
    getPageList: async (req, res, next) => {

        const pages = await Pages.find()

        res.render('backEnd/Pages/PagesList', {
            pages: pages
        })

    },

    // function to get the specific Pages
    getPage: async (req, res, next) => {
        const id = req.params.id

        const PagesFound = await Pages.findOne({ _id: id })

        res.render('backEnd/pages/pageinfo', {
            Pages: PagesFound
        })

        // render found Pages to the Pages info page
    },
    



}

//module ends
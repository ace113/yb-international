const Banner = require('../../models/banner.model')
const fs = require('fs')

module.exports = {

    //get banner list
    getBanner: async (req, res, next) => {
        const banner = await Banner.find({})
        res.render('backEnd/banners/bannerList', {
            banner: banner
        })
    },

    //add banner
    addBannerForm: async (req, res, next) => {
        res.render('backEnd/banners/addBanner')
    },

    addBanner: async (req, res, next) => {
        let {
            title,
            subTitle
        } = req.body
        const image = req.file != null ? req.file.path : null
        if (title == '' || subTitle == '' || title == null || subTitle == null || image == null) {
            req.flash('error_msg', 'Fill in the fields.')
            return res.redirect('/admin/banner/add')
        }
        const banner = await Banner.findOne({ title })
        if (banner) {
            req.flash('error_msg', 'Banner already exists.')
            return res.redirect('/admin/banner/add')
        }
        const newBanner = new Banner({
            title,
            subTitle,
            image
        })
        const saveBanner = await newBanner.save()
        if (!saveBanner) {
            await removeImage(image)
            req.flash('error_msg', 'fail to save banner')
            res.redirect('/admin/banner/add')
        }
        console.log(saveBanner)
        res.redirect('/admin/banners')
    },

    //edit banner
    editBannerForm: async (req, res, next) => {
        const id = req.params.id
        const banner = await Banner.findOne({ _id: id })
        res.render('backEnd/banners/editBanner', {
            banner: banner
        })
    },

    editBanner: async (req, res, next) => {
        const id = req.params.id
        let {
            title,
            subTitle
        } = req.body
        const image = req.file != null ? req.file.path : null
        console.log(image)
        if (title == '' || subTitle == '' || title == null || subTitle == null || image == null) {
            req.flash('error_msg', 'Fill in the fields.')
            return res.redirect(`/admin/banner/edit/${id}`)
        }
        const updateBanner = await Banner.updateOne({
            _id: id
        }, {
            title,
            subTitle,
            image
        })
        console.log(updateBanner)
        res.redirect('/admin/banners')

    },

    //delete banner
    deleteBanner: async (req, res, next) => {
        const id = req.params.id
        const banner = await Banner.findOne({ _id: id })
        console.log(banner)
        const deleteBanner = await Banner.deleteOne({ _id: id })
        if (!deleteBanner) {
            req.flash('error_msg', 'Failed to delete the banner')
            return res.redirect(`/admin/banner/edit/${id}`)
        }
        removeImage(banner.image)
        res.redirect('/admin/banners')
    },

    //remove image
    deleteImage: async (req, res, next) => {
        const id = req.params.id
        console.log(id)
        const banner = await Banner.findOne({ _id: id })
        console.log(banner.image)
        const removeImage1 = await Banner.updateOne({
            _id: id
        }, {
            image: ''
        })
        console.log(removeImage1)
        removeImage(banner.image)
        console.log('imgae removed')
        return res.status(200).json({ message: 'success' })
    }






}
//module ends here

function removeImage(image) {
    fs.unlink(`${image}`, (err, stats) => {
        if (err) console.error(err)
        console.log(`stats: ${JSON.stringify(stats)}`)
    })

}
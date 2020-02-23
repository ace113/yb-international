const Quote = require('../../models/quote.model')


module.exports = {

    // Quote list 
    getQuoteList: async (req, res, next) => {
        const QuoteList = await Quote.find({})
        res.render('backEnd/quote/quotelist', {
            quoteList: QuoteList
        })
    },

    //add product detail
    addQuoteFrom: async (req, res, next) => {
        res.render('backEnd/quote/addQuote')
    },

    addQuote: async (req, res, next) => {
        let {
            name,
            email,
            phone,
            product,
            productCode,
            quantity,
            requirements,
            packingDetails,
            callMe
        } = req.body;

        const newQuote = new Quote({
            name,
            email,
            phone,
            product,
            productCode,
            quantity,
            requirements,
            packingDetails,
            callMe
        })       
        const quote = await newQuote.save()
        if (!quote) {
            res.status(400).json({ message: 'new Quote not added' })
        }
        res.redirect('/admin/quotes')
    },

    //edit product detail
    editQuoteForm: async (req, res, next) => {
        const id = req.params.id

        const quote = await Quote.findOne({ _id: id })
        if (!quote) {
            return res.status(400).json({ message: 'Quote not found' })
        }
        // render the found category values to the edit form 
        res.render('backEnd/quote/editQuote', {
            quote: quote
        })
    },

    editQuote: async (req, res, next) => {
        const id = req.params.id
        let {
            name,
            email,
            phone,
            product,
            productCode,
            quantity,
            requirements,
            packingDetails,
            callMe
        } = req.body

        const updateQuote = await Quote.updateOne({
            _id: id
        }, {
            name,
            email,
            phone,
            product,
            productCode,
            quantity,
            requirements,
            packingDetails,
            callMe
        })

        if (!updateQuote) {
            return res.status(400).json({ message: 'Quote edit failed' })
        }
        res.redirect('/admin/inquiries')
    },

    //delete product detail
    deleteQuote: async (req, res, next) => {
        const id = req.params.id

        const deleteQuote = await Quote.deleteOne({
            _id: id
        })
        if (!deleteQuote) {
            return res.status(400).json({ message: 'delete product detail failed' })
        }
        res.redirect('/admin/inquiries')
    },

    //product detail info
    getQuote: async (req, res, next) => {
        const id = req.params.id

        const QuoteFound = await Quote.findOne({
            _id: id
        })
        if (!QuoteFound) {
            return res.status(400).json({ message: 'product Detail with the id not found' })
        }

        res.render('backEnd/Quote/QuoteDetails', {
            quote: QuoteFound
        })
    }


}
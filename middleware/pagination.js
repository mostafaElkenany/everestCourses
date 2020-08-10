const paginate = (model) => {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const results = {}
            const documentsCount = await model.countDocuments().exec();
            const numOfPages = Math.ceil(documentsCount / limit);

            if (endIndex < documentsCount) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            results.pages = numOfPages;
            results.courses = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = paginate
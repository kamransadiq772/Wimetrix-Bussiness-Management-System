const notfound = (req, res, next) => {
   const error = new Error('Not Found' + req.originalUrl)
   res.status(404)
   next(error)
}

const errorHandler = (err, req, res, next) => {
   console.log(err);
   res.status(res.statusCode === 200 ? 500 : res.statusCode)
   res.json(err)
}

module.exports = { notfound, errorHandler }
const Accounts = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {

}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
  .then((result) => {
    if(!result) {
      res.status(404).json({ message: "account not found" })
      return
    }
    req.checkedAccountId = result
    next()
  })
}

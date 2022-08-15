const Accounts = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  if(req.body.name == null || req.body.budget == null) {
    res.status(400).json({message: "name and budget are required" })
    return
  } 
  if (typeof req.body.name !== "string" || req.body.name.trim() === "" || req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({message: "name of account must be between 3 and 100"})
    return
  } 
  if (typeof req.body.budget !== "number") {
    res.status(400).json({message: "budget of account must be a number"})
    return
  } 
  if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({message: "budget of account is too large or too small"})
    return
  }
  req.checkedAccountPayload = ({name: req.body.name.trim(), budget: req.body.budget})
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  Accounts.getNames(req.body.name)
  .then((result) => {
    if(result) {
      res.status(400).json({ message: 'that name is taken'})
      return;
    }
    next()
  })
}

exports.checkAccountId = (req, res, next) => {
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

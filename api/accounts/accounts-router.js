const router = require('express').Router()
const Accounts = require("./accounts-model")
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');

//GET
router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((err => {
    console.log(err);    
  }))
})

//GET BY ID
router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.checkedAccountId)
})

//POST
router.post('/', (req, res, next) => {
  if(req.body.name == null || req.body.budget == null) {
    res.status(400).json({message: "name and budget are required" })
    return
  } else if (typeof req.body.name !== "string" || req.body.name.trim() === "" || req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({message: "name of account must be between 3 and 100"})
    return
  } else if (typeof req.body.budget !== "number") {
    res.status(400).json({message: "budget of account must be a number"})
    return
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({message: "budget of account is too large or too small"})
    return
  }
  Accounts.create(req.body)
  .then((item) => {
    return Accounts.getById(item.id)
  })
  .then((result) => {
    res.status(201).json(result)
  })
  .catch((err => {
    console.log(err);    
  }))
})

//PUT
router.put('/:id', checkAccountId, (req, res, next) => {
  if(req.body.name == null || req.body.budget == null) {
    res.status(400).json({message: "name and budget are required" })
    return
  } else if (typeof req.body.name !== "string" || req.body.name.trim() === "" || req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({message: "name of account must be between 3 and 100"})
    return
  } else if (typeof req.body.budget !== "number") {
    res.status(400).json({message: "budget of account must be a number"})
    return
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({message: "budget of account is too large or too small"})
    return
  }
  Accounts.updateById(req.params.id, req.body)
  .then(() => {
    return Accounts.getById(req.params.id)
  })
  .then((result) => {
    if(!result) {
      res.status(404).json({ message: "account not found" })
      return
    }
    res.status(200).json(result)
  })
  .catch((err => {
    console.log(err);    
  }))
});

//DELETE
router.delete('/:id', (req, res, next) => {
  Accounts.getById(req.params.id)
  .then((result) => {
    if(result == null) {
      res.status(404).json({ message: "account not found" })
      return
    }
    Accounts.deleteById(req.params.id)
    .then(() => {
      res.status(200).json(result)
    })   
  })
  .catch((err => {
    console.log(err);    
  }))
})


router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;

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
router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.checkedAccountPayload)
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
router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.checkedAccountPayload)
  .then(() => {
    return Accounts.getById(req.params.id)
  })
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((err => {
    console.log(err);    
  }))
});

//DELETE
router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(() => {
    res.status(200).json(req.checkedAccountId)
  })   
  .catch((err => {
    console.log(err);    
  }))
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;

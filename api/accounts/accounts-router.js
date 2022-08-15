const router = require('express').Router()
const Accounts = require("./accounts-model")
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');

//GET
router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then((result) => {
    res.status(200).json(result)
  })
  .catch(next)
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
  .catch(next)
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
  .catch(next)
});

//DELETE
router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(() => {
    res.status(200).json(req.checkedAccountId)
  })   
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({message: err.message || "Internal Server Error"})
})


module.exports = router;

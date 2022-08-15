const router = require('express').Router()
const Accounts = require("./accounts-model")

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((err => {
    console.log(err);    
  }))
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
  .then((result) => {
    if(!result) {
      res.status(404).json({ message: "account not found" })
    }
    res.status(200).json(result)
  })
  .catch((err => {
    console.log(err);    
  }))
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;

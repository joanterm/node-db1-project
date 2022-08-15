const db = require("../../data/db-config")

//GET
const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts");
}

//GET BY ID
const getById = id => {
  // DO YOUR MAGIC
  return db("accounts")
  .where("id", id)
  .first();
}

//POST
const create = account => {
  // DO YOUR MAGIC
  return db("accounts")
  .insert(account)
  .then(id => {
    return getById(id[0]);
  });
}

//PUT
const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db("accounts")
  .where("id", id)
  .update(account)
  .then(() => {
    return getById(id);
  });
}

//DELETE
const deleteById = id => {
  // DO YOUR MAGIC
  return db("accounts")
  .where("id", id)
  .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

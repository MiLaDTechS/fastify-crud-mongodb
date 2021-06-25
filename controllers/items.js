

const getItems = function (req, reply) {
  const db = this.mongo.db;

  db.collection('items').find().toArray().then(result => {
    reply.send(result)
  }).catch(err => {
    reply.code(500).send();
  });

}

const getItem = function (req, reply) {
  const { db, ObjectId } = this.mongo;
  const { _id } = req.params;

  db.collection('items').findOne({ _id: ObjectId(_id) }).then(result => {
    reply.send(result);
  }).catch(err => {
    reply.code(404).send('item not found');
  });
}

const addItem = function (req, reply) {
  const db = this.mongo.db
  const { name } = req.body

  const item = {
    name
  }

  db.collection('items').insertOne(item).then(result => {
    reply.code(201).send(result.ops[0])
  }).catch(err => {
    reply.code(500).send();
  });
}

const deleteItem = function (req, reply) {
  const { db, ObjectId } = this.mongo;
  const { _id } = req.params

  db.collection('items').deleteOne({ _id: ObjectId(_id) }).then(({ result }) => {
    reply.send(`item deleted`);
  }).catch(err => {
    reply.code(404).send('item not found');
  });
}

const updateItem = function (req, reply) {
  const { db, ObjectId } = this.mongo;
  const { _id } = req.params;
  const { name } = req.body;

  db.collection('items').updateOne({ _id: ObjectId(_id) }, { $set: { name } }).then(({ result }) => {
    reply.send('item updated');
  }).catch(err => {
    reply.code(404).send('item not found');
  });
}

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
}

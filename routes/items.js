const yup = require('yup')

const {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
} = require('../controllers/items');

const { yupValidationCompiler } = require('../validations')

// Item schema
const Item = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
  },
}

// Options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  handler: getItems,
}

const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
}

const postItemOpts = {
  schema: {
    body: yup.object({
      name: yup.string().required(),
    }),
    response: {
      201: Item,
    },
  },
  validatorCompiler: yupValidationCompiler,
  handler: addItem,
}

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteItem,
}

const updateItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: updateItem,
}

function itemRoutes(fastify, options, done) {
  // Get all items
  fastify.get('/items', getItemsOpts)

  // Get single items
  fastify.get('/items/:_id', getItemOpts)

  // Add item
  fastify.post('/items', postItemOpts)

  // Delete item
  fastify.delete('/items/:_id', deleteItemOpts)

  // Update item
  fastify.put('/items/:_id', updateItemOpts)

  done()
}

module.exports = itemRoutes

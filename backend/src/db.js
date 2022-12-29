require('dotenv').config();
const {MongoClient, ObjectId} = require('mongodb')
const {now} = require("migrate-mongo/lib/utils/date");
const crypto = require('crypto');

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;
const connectionUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
let db;

const init = async () => {
  let client = await MongoClient.connect(connectionUrl);
  db = client.db(DB_NAME);
  return db;
}

const createTransaction = async (item) => {
  const collection = db.collection('transactions')
  let obj = {
    code: crypto.randomBytes(10).toString('hex'),
    status: 'pending',
    song_id: parseInt(item.song_id),
    amount: item.amount,
    created_at: now()
  }
  let result = await collection.insertOne(obj)
  return await db.collection('transactions').findOne(ObjectId(result.insertedId));
}

const insertItem = (item) => {
  const collection = db.collection('items')
  return collection.insertOne(item)
}

const getItems = () => {
  const collection = db.collection('items')
  return collection.find({}).toArray()
}

const updateQuantity = (id, quantity) => {
  const collection = db.collection('items')
  return collection.updateOne({_id: ObjectId(id)}, {$inc: {quantity}})
}

const getDbInstance = () => {
  return db;
}

module.exports = {init, getDbInstance, insertItem, getItems, updateQuantity, createTransaction}

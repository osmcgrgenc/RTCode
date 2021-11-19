const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordschema = new Schema({}, { strict: false });
const record = mongoose.model('Record', recordschema, 'records');

module.exports = record;

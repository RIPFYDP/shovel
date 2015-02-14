var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entitySchema = new Schema({
  date: { type: Date, default: Date.now },
  selector: String,
  value: String,
  webpage_id: String
});

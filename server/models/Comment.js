const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String },  // 댓글의 내용
  article: { type:  Schema.ObjectId, require: true},  // 어떤 게시물인지 저장
  author: { type: Schema.ObjectId, required: true, ref: "User"},
  created: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Comment', CommentSchema);
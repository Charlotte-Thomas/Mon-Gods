const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/surf-site'

const secret = 'This is my really secret string that nobody is going to be able to guess1'


module.exports = {
  port,
  dbURI,
  secret
}
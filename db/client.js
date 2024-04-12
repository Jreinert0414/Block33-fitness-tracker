const { Client } = require('pg')
const client = new Client('postgres://localhost:5432/fitness_tracker')

console.log(`connected in client`)

module.exports= client

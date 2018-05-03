const moment = require('moment')

var someTimestamp = moment().valueOf()
console.log(someTimestamp)

const createdAt = 1234
const date = moment(createdAt)
//date.add(1, 'years').subtract(9, 'months') // can add or subtract current date
//console.log(date.format('MMM Do, YYYY h:mm a'))
console.log(date.format('h:mm a'))
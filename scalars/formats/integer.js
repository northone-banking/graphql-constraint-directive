const { GraphQLError } = require('graphql/error')
const { isInt } = require('validator')

module.exports = (value) => {
    console.log("IS AN INTEGER>>>?????")
    if (isInt(value)) return true

    throw new GraphQLError('Must be a valid integer')
}

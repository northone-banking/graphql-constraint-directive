const { GraphQLError } = require('graphql/error')
const { isUUID, isInt } = require('validator')

module.exports = (value) => {
  if (isUUID(value) || isInt(value)) return true

  throw new GraphQLError('Must be in UUID or Int format')
}

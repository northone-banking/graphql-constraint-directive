const { GraphQLError } = require("graphql/error")
const { isUUID } = require("validator")

// ID in the format of "uuid|uuid|..."
module.exports = (value) => {
    value.split("|").forEach((id) => {
        if (!isUUID(id)) {
            throw new GraphQLError("Must be a valid composite UUID format - i.e) 'uuid|uuid")
        }
    })

    return true
}

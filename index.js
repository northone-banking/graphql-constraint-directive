const {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql')
const { SchemaDirectiveVisitor } = require('graphql-tools')
const ConstraintStringType = require('./scalars/string')
const ConstraintNumberType = require('./scalars/number')

class ConstraintDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: directiveName,
      locations: [
        DirectiveLocation.INPUT_FIELD_DEFINITION,
        DirectiveLocation.ARGUMENT_DEFINITION
      ],
      args: {
        /* Strings */
        minLength: { type: GraphQLInt },
        maxLength: { type: GraphQLInt },
        startsWith: { type: GraphQLString },
        endsWith: { type: GraphQLString },
        contains: { type: GraphQLString },
        notContains: { type: GraphQLString },
        pattern: { type: GraphQLString },
        format: { type: GraphQLString },

        /* Numbers (Int/Float) */
        min: { type: GraphQLFloat },
        max: { type: GraphQLFloat },
        exclusiveMin: { type: GraphQLFloat },
        exclusiveMax: { type: GraphQLFloat },
        multipleOf: { type: GraphQLFloat }
      }
    })
  }

  visitInputFieldDefinition(field) {
    this.wrapType(field)
  }

  visitArgumentDefinition(field) {
    this.wrapType(field)
  }

  wrapType(field) {
    const fieldName = field.astNode.name.value
    const isGraphQLID = field.type.ofType === GraphQLID

    if (field.type instanceof GraphQLNonNull && field.type.ofType === GraphQLString) {
      field.type = new GraphQLNonNull(new ConstraintStringType(fieldName, field.type.ofType, this.args))
    } else if (field.type.ofType === GraphQLString) {
      field.type = new ConstraintStringType(fieldName, field.type, this.args)
    } else if (field.type instanceof GraphQLNonNull && isGraphQLID) {
      field.type = new GraphQLNonNull(new ConstraintStringType(fieldName, field.type.ofType, this.args))
    } else if (field.type === isGraphQLID) {
      field.type = new ConstraintStringType(fieldName, field.type.ofType, this.args)
    } else if (
      field.type instanceof GraphQLNonNull &&
      (field.type.ofType === GraphQLFloat || field.type.ofType === GraphQLInt)
    ) {
      field.type = new GraphQLNonNull(new ConstraintNumberType(fieldName, field.type.ofType, this.args))
    } else if (field.type === GraphQLFloat || field.type === GraphQLInt) {
      field.type = new ConstraintNumberType(fieldName, field.type, this.args)
    } else {
      throw new Error(`Not a scalar type: ${field.type}`)
    }
  }
}

module.exports = ConstraintDirective

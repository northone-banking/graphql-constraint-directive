const formats = [
  'byte',
  'date-time',
  'date',
  'email',
  'ipv4',
  'ipv6',
  'uri',
  'uuid',
  'uuid-composite',
  'integer',
  'uuid-or-int'
]
const fns = {}

formats.forEach(function (format) {
  fns[format] = require('./' + format)
})

module.exports = fns

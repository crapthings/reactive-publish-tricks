import _ from 'lodash'

Template.users.onCreated(function () {
  this.subscribe('groups.and.users')
})

Template.registerHelper('data', function () {
  return Helpers.find()
})

Template.registerHelper('get', function (d, name) {
  return _.values(_.get(d, name))
})

Template.registerHelper('cache', function (id, collection, field) {
  console.log(Helpers.findOne())
  console.log(`cache.${collection}.${id}.${field}`)
  return _.get(Helpers.findOne(), `cache.${collection}.${id}.${field}`)
})

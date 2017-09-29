Meteor.subscribe('groups.and.users')

Meteor.autorun(function () {
  const data = Helpers.findOne()
  console.log(data)
})

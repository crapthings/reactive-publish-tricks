import _ from 'lodash'
import faker from 'faker'

function getCachedData() {
  const groups = Groups.find().fetch()
  const users = Users.find().fetch()
  const cachedGroups = _.keyBy(groups, '_id')
  const cachedUsers = _.keyBy(users, '_id')
  return { cachedGroups, cachedUsers }
}

Meteor.publish('groups.and.users', function () {
  const self = this

  let byPassInitial = true

  const links = Links.find()

  console.log(links.fetch())

  this.added('helpers', '1', { cache: getCachedData(), isFirst: true })

  const linksHandler = links.observeChanges({
    added(id, fields) {
      if (! byPassInitial)
      self.changed('helpers', '1', { cache: getCachedData(), updateAt: new Date(), isFirst: false })
    },
    changed(id, fields) {
      self.changed('helpers', '1', { cache: getCachedData(), updateAt: new Date(), isFirst: false })
    }
  })

  byPassInitial = false

  this.onStop(() => linksHandler.stop())
})

Meteor.methods({
  add() {
    const groupId = Groups.insert({ name: faker.company.companyName() })
    const userId = Users.insert({ name: faker.name.findName() })
    Links.insert({ groupId, userId })
  }
})

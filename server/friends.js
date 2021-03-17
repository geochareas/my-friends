const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  friends: [
    {
      id: 'liar',
      name: 'Panagiotis Liaromatis',
      email: 'icsd15106@icsd.aegean.gr',
      avatarURL: config.origin + '/img/liar.jpg'
    },
    {
      id: 'neko',
      name: 'Nektarios Pirmettis',
      email: 'nektariosftw@gmail.com',
      avatarURL: config.origin + '/img/neko.jpg'
    },
    {
      id: 'bill',
      name: 'Vassilis Zoros',
      email: 'icsd15063',
      avatarURL: config.origin + '/bill.jpg'
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, friend) => {
  if (!friend.id) {
    friend.id = Math.random().toString(36).substr(-8)
  }

  get(token).friends.push(friend)

  return friend
}

const remove = (token, id) => {
  const data = get(token)
  const friend = data.friends.find(c => c.id === id)

  if (friend) {
    data.friends = data.friends.filter(c => c !== friend)
  }

  return { friend }
}

module.exports = {
  get,
  add,
  remove
}

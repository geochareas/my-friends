const api = process.env.REACT_APP_friendS_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/friends`, { headers })
    .then(res => res.json())
    .then(data => data.friends)

export const remove = (friend) =>
  fetch(`${api}/friends/${friend.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.friend)

export const create = (body) =>
  fetch(`${api}/friends`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

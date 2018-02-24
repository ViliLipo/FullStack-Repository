
const user = {username:"kekkerit",name:"Keijo Keinonen", _id:"notanrealid"}
let token = null
const blogs =[
  {
  title: "ESIM",
  author: "HC",
  likes: 10,
  url: 'www.notarealulr.ly',
  user: user,
  id: 1
},
{
  title: "ESIM2",
  author: "HCBOI",
  likes: 7,
  url: 'www.notarealulr.ly',
  user: user,
  id:2
}
]

const getAll = () => {
  return Promise.resolve(blogs)
}
const setToken = (newToken) => {
  token = newToken
}

export default{getAll, blogs, setToken}

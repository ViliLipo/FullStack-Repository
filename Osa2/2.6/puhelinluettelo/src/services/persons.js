 import axios from 'axios'

 const baseUrl = '/api/persons'

 const getAll = () => {
   return axios.get(baseUrl)
 }

 const create = (newObject) => {
   return axios.post(baseUrl, newObject)
 }

const update = (id, changedPerson) => {
  return  axios.put(`${baseUrl}/${id}`, changedPerson)
}

 const remove = (id) => {
   console.log(id)
   return axios.delete(`${baseUrl}/${id}`)
 }


export default {getAll, create, remove, update}

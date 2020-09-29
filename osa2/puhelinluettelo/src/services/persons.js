import axios from 'axios'

const url = 'http://localhost:3001/api/persons'

const returnData = request => {
    return request.then(response => response.data)
}

const getAll = () => {
    return returnData(axios.get(url))
}

const create = newPerson => {
    return returnData(axios.post(url, newPerson))
}

const remove = id => {
    return returnData(axios.delete(`${url}/${id}`))
}

const update = (id, updatedPerson) => {
    return returnData(axios.put(`${url}/${id}`, updatedPerson))
}

export default { getAll, create, remove, update }
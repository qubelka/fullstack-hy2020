import axios from 'axios'

const url = 'http://localhost:3001/persons'

const returnData = (request) => {
    return request.then(response => response.data)
}

const getAll = () => {
    return returnData(axios.get(url))
}

const create = newPerson => {
    return returnData(axios.post(url, newPerson))
}

export default { getAll, create }
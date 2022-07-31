import axios from "axios";

const baseURL = `/api/persons`;

const createPerson = (obj) => {
    return axios.post(baseURL,obj);
}

const getPeople = () => {
    return axios.get(baseURL);
}

const updatePerson = (id,obj) => {
    return axios.put(`${baseURL}/${id}`, obj)
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

export default {createPerson, getPeople , deletePerson , updatePerson};
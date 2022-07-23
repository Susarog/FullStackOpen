import axios from "axios";

const baseURL = `http://localhost:3001/persons`;

const createPerson = (obj) => {
    return axios.post(baseURL,obj);
}

const getPeople = () => {
    return axios(baseURL);
}


const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

export default {createPerson,getPeople , deletePerson};
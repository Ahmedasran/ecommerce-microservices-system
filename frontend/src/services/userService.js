import axios from "axios";

const BASE_URL = "http://localhost:8084/api/user";

export const login = async (data) => {

    return axios.post(
        `${BASE_URL}/login`,
        data
    );
};

export const register = async (data) => {

    return axios.post(
        `${BASE_URL}/register`,
        data
    );
};
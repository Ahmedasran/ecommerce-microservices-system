import axios from "axios";

const BASE_URL =
    "http://localhost:8080/api/product";

export const getProducts = async () => {

    return axios.get(BASE_URL);

};

export const createProduct = async (data) => {

    return axios.post(
        BASE_URL,
        data
    );
};

export const deleteProduct = async (id) => {

    return axios.delete(
        `${BASE_URL}/${id}`
    );
};

export const updateProduct = async (
    id,
    data
) => {

    return axios.put(
        `${BASE_URL}/${id}`,
        data
    );
};
import axios from "axios";

const BASE_URL = "http://localhost:8081/api/order";

export const placeOrder = async (orderData) => {

    const response = await axios.post(
        BASE_URL,
        orderData
    );

    return response.data;
};
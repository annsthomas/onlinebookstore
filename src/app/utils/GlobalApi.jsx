const { default: axios } = require('axios');
const axiosClient = axios.create({
    baseURL: 'https://bookcube-be-production.up.railway.app/api/'
})


const RegisterUser = async (fullname, email, username, phone, role, password) => {
    try {

        let data = JSON.stringify({
            fullname: fullname,
            email: email,
            username: username,
            phone: phone,
            role: role,
            password: password,
        });




        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}user`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };


        const response = await axios.request(config);

        return response;
    } catch (error) {

        return error.response;
    }
};

const LoginUser = async (email, password) => {
    try {
        let data = {
            "email": email,
            "password": password
        };




        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}user/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        console.log('config', config);



        const response = await axios.request(config);

        return response;

    } catch (error) {
        return error.response;
    }
};



const GetBooks = async () => {
    try {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}books`,
            headers: {},
            data: data
        };

        const response = await axios.request(config);


        return response.data

    } catch (error) {
        console.error('Error fetching books:', error);
    }
};


const CreateOrder = async (book_id, user_id, price) => {



    try {

        let data = JSON.stringify({
            "book": book_id,
            "user": user_id,
            "price": price
        });


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/api/order/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };



        const response = await axios.request(config);





        return response;


    } catch (error) {

        console.log('Error creating order:', error);


    }
};


const GetBookByType = async (type) => {
    try {
        const data = JSON.stringify({
            "type": type
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}books/type`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);

        return response.data;
    } catch (error) {
        console.log('Error fetching books by type:', error);
        throw error;
    }
};


const AddToWishList = async (book_id, user_id) => {
    try {
        let data = JSON.stringify({
            "book": book_id,
            "user": user_id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}wishlist`,

            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);



        return response.data

    } catch (error) {
        console.log(error);
        return error;
    }
};

const GetWishList = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}wishlist/${id}`,
            headers: {},
        };

        const response = await axios.request(config);





        return response;
    } catch (error) {
        console.log('Error fetching wishlist:', error);
    }
};




const DeleteWishList = async (id) => {
    try {
        let data = JSON.stringify({
            "id": id
        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}wishlist`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;

    } catch (error) {
        console.log('Error deleting wishlist item:', error);
    }
};



const GetOrderItems = async (id) => {
    console.log(id);

    try {
        let data = JSON.stringify({
            "id": id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}order/orderlist`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);

        return response.data;

    } catch (error) {
        console.log(error);
    }
};


const DeleteItem = async (id) => {
    console.log('id', id);

    try {
        const data = JSON.stringify({
            "id": id
        });

        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}order`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.log('Error:', error);
    }
};


const CreateCart = async (order_id, user_id, coupon, total, order_note) => {
    try {
        const data = JSON.stringify({
            ...(order_id && { order_id }),
            ...(user_id && { user_id }),
            ...(coupon && { coupon }),
            ...(total && { total }),
            ...(order_note && { order_note })

        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/api/cart/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);
        console.log('Response:', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log('Error:', error.response?.data || error.message);
    }
};
const GetUser = async (id) => {
    try {

        let data = JSON.stringify({
            "id": id
        });


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}user/singleuser`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };


        const response = await axios.request(config);
        console.log('Response:', JSON.stringify(response.data));
        return response.data;

    } catch (error) {
        console.log('Error:', error);

    }
};

const GetBookById = async (id) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${axiosClient.defaults.baseURL}books/${id}`,
            headers: {}
        };

        const response = await axios.request(config);


        return response.data;

    } catch (error) {
        console.log('Error fetching the book:', error);

    }
};



export default {
    RegisterUser,
    LoginUser,
    GetBooks,
    CreateOrder,
    GetBookByType,
    AddToWishList,
    GetWishList,
    DeleteWishList,
    GetOrderItems,
    DeleteItem,
    CreateCart,
    GetUser,
    GetBookById

}
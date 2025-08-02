import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const signupUser = (userData: unknown) => {
    return axios.post('user/signup', userData);
}

export const loginUser = (userData: unknown) => {
    return axios.post('user/login', userData);
}

export const googleLogin = (token:string) => {
    return axios.post('user/google', { token });
}

export const getUsers = (token:string) => {
    return axios.get('user/all', {
        headers: {
            Authorization: token
        }
    });
}

export const registerUser = (userId:any, eventId:any, token:any) => {
    return axios.post('user/register', {
        student: userId,
        event: eventId
    },{
        headers: {
            Authorization: token
        }
    })
}

export const getCertificates = (userId:any, token:any) => {
    return axios.post('user/certificates', {userId}, {
        headers: {
            Authorization: token
        }
    });
}
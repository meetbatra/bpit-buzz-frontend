import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const addEvent = (eventData:unknown, token:any) => {
    return axios.post('event/new', eventData, {
        headers: {
            Authorization: token
        }
    });
}

export const getEvents = () => {
    return axios.get('event/all');
}

export const getRegisteredUsers = (eventId:any, token:string) => {
    return axios.post('event/users', {event:eventId}, {
        headers: {
            Authorization: token
        }
    });
}

export const markAttendance = (eventId: any, userId: any, token: string) => {
    return axios.post(
        'event/attendance',
        {
            event: eventId,
            student: userId,
        },
        {
            headers: {
                Authorization: token,
            },
        }
    );
};
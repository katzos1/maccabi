import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:8080'
});

export const login = async (userName,password) => {
    console.log('API REQUEST "login"',userName,password)
   const response = await  axiosInstance.post('login',{userName,password});
   return response.data;
};

export const getUserByToken = async (token) => {

    //verify token exist if not return null
   if (!token) return {code:0,errorMessage:'you must enter token'};
   console.log('API REQUEST "getUserByToken"',token);
   const response = await  axiosInstance.post('getUserByToken',{token});
   return response.data;
};


export const getUsers = async (token,query={}) => {

    //verify token exist if not return null
   if (!token) return {code:0,errorMessage:'you must enter token'};
   console.log('API REQUEST "getUsers"',token);
   const response = await  axiosInstance.post('getUsers',{token,query});
   return response.data;
};


export const getRooms = async (query={}) => {
   console.log('API REQUEST "getRooms"');
   const response = await  axiosInstance.post('getRooms',{query});
   return response.data;
};

export const createUser = async (user) => {
    console.log('API REQUEST "createUser"',user);
    const response = await axiosInstance.post('addUser',user);
    return response.data;
 };

 export const createRoom = async (token,roomName) => {
   console.log('API REQUEST "createRoom"',roomName);
   const response = await axiosInstance.post('addRoom',{token,roomName});
   return response.data;
};

 export const deleteUser = async (token,deleteUserId) => {
    console.log('API REQUEST "deleteUser"',deleteUserId);
    const response = await axiosInstance.post('deleteUser',{deleteUserId,token});
    return response.data;
 };


export default axiosInstance;
import api from "./apiLayer"

//register user
export const registerUser = (data) => {
    return api.post("api/auth/register", data)
}

//login user
export const loginUser = (data) => {
    return api.post("api/auth/login", data)
}

//current logged in user detail
export const getUser = () => {
    return api.get("api/auth/me")
}

//all user details
export const allUsers = () => {
  return api.get('/api/auth/alluser');
};
import axios from 'axios';

export const login = async user => {
  return await axios.post("/api/sign_up", {user: user})
    .then(resp => {
      const user_data = resp.data.data.user
      localStorage.setItem("auth-token", user_data.authentication_token);
      localStorage.setItem("name", user_data.name);
      localStorage.setItem("user_id", user_data.id);
      return resp
    })
    .catch(error => {
      console.log(error)
      return error.response
    });
}

export const loginUserSuccess = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

import axios from 'axios';

export const login = async user => {
  return await axios.post("http://localhost:3001/api/sign_up", {user: user})
    .then(resp => {
      const user_data = resp.data.data.user
      localStorage.setItem("auth-token", user_data.authentication_token);
      localStorage.setItem("name", user_data.name);
      return user_data
    })
    .catch(error => {
      console.log(error)
    });
}

export const loginUserSuccess = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

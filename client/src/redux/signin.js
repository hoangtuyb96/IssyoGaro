import axios from 'axios';

export const userSigninFetch = sign_in => {
  return dispatch => {
    return axios.post("http://localhost:3001/api/sign_in", {sign_in: sign_in})
      .then(resp => {
        const user_data = resp.data.data.user_info
        localStorage.setItem("auth-token", user_data.token);
        localStorage.setItem("user_id", user_data.id);
        localStorage.setItem("name", user_data.name);
        dispatch(loginUser(user_data));
      })
      .catch(error => {
        console.log(error)
      });
  }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

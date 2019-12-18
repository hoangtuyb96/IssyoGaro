import axios from 'axios';

export const userSigninFetch = (sign_in, handleError) => {
  return dispatch => {
    return axios.post("/api/sign_in", {sign_in: sign_in})
      .then(resp => {
        const user_data = resp.data.data.user_info
        localStorage.setItem("auth-token", user_data.token);
        localStorage.setItem("user_id", user_data.id);
        localStorage.setItem("name", user_data.name);
        dispatch(loginUser(user_data));
        handleError(resp.status);
      })
      .catch(error => {
        handleError(error.response.status);
      });
  }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

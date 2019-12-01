import axios from 'axios';

export const logout = async user => {
  return await axios.delete("http://localhost:3001/api/sign_out",
    {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
    .then(resp => {
    localStorage.removeItem("auth-token");
    return
  })
  .catch(error => {
    console.log(error)
  });
}

export const logoutUserSuccess = () => ({
    type: 'LOGOUT_USER',
    payload: null
})

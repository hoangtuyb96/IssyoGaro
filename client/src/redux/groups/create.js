import axios from 'axios';

export const createGroup = async group => {
  return await axios.post("http://localhost:3001/api/groups",
    {group: group},
    {headers: { "IG-AUTH-TOKEN": localStorage.getItem("auth-token")}})
  .then(response => {
    const group = response.data.data.group
    return group
  })
  .catch(error => {
    console.log(error)
  });
}

export const createGroupSuccess = groupObj => ({
  type: 'CREATED_GROUP',
  payload: groupObj
})

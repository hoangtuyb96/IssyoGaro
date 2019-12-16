import axios from 'axios';

export const createGroup = async group => {
  return await axios.post(
    "/api/groups",
    {group: group}
  )
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

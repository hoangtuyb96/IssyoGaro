import axios from "axios";

export const joinGroup = async user_group => {
  return await axios.post("/api/user_groups/", {user_group: user_group})
  .then(response => {
    return response.data
  })
  .catch(error => {
    console.log(error)
  });
}

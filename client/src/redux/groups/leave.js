import axios from "axios";

export const leaveGroup = async user_group_id => {
  return await axios.delete("http://localhost:3000/api/user_groups/" + user_group_id)
  .then(response => {
    return
  })
  .catch(error => {
    console.log(error)
  });
}

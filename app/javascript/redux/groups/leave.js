import axios from "axios";

export const leaveGroup = async user_group_id => {
  return await axios.delete("/api/user_groups/" + user_group_id)
  .then(response => {
    return
  })
  .catch(error => {
    console.log(error)
  });
}

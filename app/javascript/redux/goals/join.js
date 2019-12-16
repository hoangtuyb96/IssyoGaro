import axios from "axios";

export const joinGoal = async (group_id, goal_id) => {
  return await axios.post("/api/groups/" + group_id + "/goals/" + goal_id + "/user_goals")
  .then(response => {
    return response.data
  })
  .catch(error => {
    console.log(error)
  });
}

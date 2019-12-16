import axios from "axios";

export const leaveGoal = async (group_id, goal_id, user_goal_id) => {
  return await axios.delete("/api/groups/" + group_id + "/goals/" + goal_id + "/user_goals/" + user_goal_id)
  .then(response => {
    return
  })
  .catch(error => {
    console.log(error)
  });
}

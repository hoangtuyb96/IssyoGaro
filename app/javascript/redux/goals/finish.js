import axios from 'axios';

export const finishGoal = async (goal_id) => {
  return await axios.get("/api/goals/" + goal_id + "/summary")
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error)
    });
}

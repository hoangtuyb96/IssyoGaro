import axios from 'axios';

export const createGoal = async (goal, group_id) => {
  return await axios.post("/api/groups/" + group_id.group_id + "/goals", {goal: goal})
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.log(error)
    });
}

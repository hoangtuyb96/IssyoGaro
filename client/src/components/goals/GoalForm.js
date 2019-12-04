import React, { Component } from 'react';
import { createGoal } from '../../redux/goals/create';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class GoalForm extends Component {
  constructor(props) {
    super(props);
    this.emptyTask = {
      name: "",
      desciptrion: "",
      start_day: new Date(),
      end_day: new Date(),
      errors: {},
      _destroy: false
    };

    this.state = {
      goal: {
        name: "",
        desciptrion: "",
        errors: {},
        tasks_attributes: [Object.assign({}, this.emptyTask)]
      }
    };
  }

  // componentDidMount() {
  //   if (this.props.match.params.id) {
  //     axiosClient
  //       .get(`/goals/${this.props.match.params.id}`)
  //       .then(response => {
  //         this.setState({ goal: response.data });
  //       });
  //   }
  // }

  render() {
    return (
      <div className="GoalForm">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={e => this.handleGoalNameChange(e)}
              value={this.state.goal.name}
              className="form-control"
            />
            {this.renderGoalNameInlineError()}
          </div>
          <div className="form-group">
            <label>Desciprtion</label>
            <input
              type="text"
              onChange={e => this.handleGoalDescriptionChange(e)}
              value={this.state.goal.desciptrion}
              className="form-control"
            />
          </div>
          <hr />
          <div className="tasks-fieldset">
            <h3>Tasks</h3>
            {this.renderTasksForm()}
            <button
              className="btn btn-success"
              onClick={e => this.handleAddTask(e)}>
              + Add Task
            </button>
          </div>
          <br />
          <button
            onClick={e => this.handleFormSubmit(e)}
            className="btn btn-primary">
            Save
          </button>
          &nbsp;
        </form>
      </div>
    );
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const { group_id } = this.props.match.params
    const createdGoal = await createGoal(this.state.goal, {group_id: group_id});
    console.log(createdGoal);
    // let submitMethod = this.state.goal.id ? 'patch' : 'post';
    // let url = this.state.goal.id
    //   ? `/goals/${this.state.goal.id}.json`
    //   : '/goals.json';

    // axiosClient
    //   [submitMethod](url, {
    //     goal: this.state.goal
    //   })
    //   .then(response => {
    //     this.props.history.push('/goals');
    //   })
    //   .catch(error => {
    //     this.setState({ goal: error.response.data }, () => {
    //       console.log(this.state.goal);
    //     });
    //   });
  }

  handleAddTask(e) {
    e.preventDefault();
    this.state.goal.tasks_attributes.push(Object.assign({}, this.emptyTask));
    this.setState({ goal: this.state.goal });
  }

  renderTasksForm() {
    let counter = 0;
    return this.state.goal.tasks_attributes.map((task, index) => {
      if (task._destroy === false) {
        let taskDOM = (
          <div className="task-form" key={index}>
            <div className="form-group">
              <div className="clearfix" style={{ marginBottom: 5 }}>
                <label>
                  Task {counter + 1}
                </label>
                <button
                  className="btn btn-danger"
                  style={{ padding: '5px 10px', float: 'right' }}
                  onClick={e => this.handleRemoveTask(task)}>
                  X
                </button>
              </div>
              <div className="form-group">
                <input
                  placeholder="Name"
                  onChange={event => this.onTaskNameChange(event, task)}
                  type="text"
                  value={task.name}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Desciprtion"
                  onChange={event => this.onTaskDescriptionChange(event, task)}
                  type="text"
                  value={task.desciptrion}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Start day</label>
                <DatePicker
                  selected={task.start_day}
                  onChange={event => this.onTaskStartDayChange(event, task)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeCaption="time"
                  dateFormat="yyyy/MM/dd h:mm aa"
                  minDate={new Date()}
                />
              </div>
              <div className="form-group">
                <label>End day</label>
                <DatePicker
                  selected={task.end_day}
                  onChange={event => this.onTaskEndDayChange(event, task)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeCaption="time"
                  dateFormat="yyyy/MM/dd h:mm aa"
                  minDate={task.start_day}
                />
              </div>
              <div className="form-group">
              </div>
              {this.renderTaskInlineError(task)}
            </div>
          </div>
        );
        counter++;

        return taskDOM;
      } else {
        return null;
      }
    });
  }

  renderTaskInlineError(task) {
    // if (task.errors.name) {
    //   return (
    //     <div className="inline-error alert alert-danger">
    //       {task.errors.name.join(', ')}
    //     </div>
    //   );
    // } else {
    //   return null;
    // }
  }

  renderGoalNameInlineError() {
    // if (this.state.goal.errors.name) {
    //   return (
    //     <div className="inline-error alert alert-danger">
    //       {this.state.goal.errors.name.join(', ')}
    //     </div>
    //   );
    // } else {
    //   return null;
    // }
  }

  onTaskNameChange(event, task) {
    task.name = event.target.value;
    this.setState({ goal: this.state.goal });
    console.log(this.state);
  }

  onTaskDescriptionChange(event, task) {
    task.desciptrion = event.target.value;
    this.setState({ goal: this.state.goal });
    console.log(this.state);
  }

  onTaskStartDayChange(event, task) {
    task.start_day = event;
    this.setState({ goal: this.state.goal });
    console.log(this.state);
  }

  onTaskEndDayChange(event, task) {
    task.end_day = event;
    this.setState({ goal: this.state.goal });
    console.log(this.state);
  }

  handleRemoveTask(task) {
    task._destroy = true;
    this.setState({ goal: this.state.goal });
  }

  handleGoalNameChange(e) {
    let goal = this.state.goal;
    goal.name = e.target.value;
    this.setState({ goal: this.state.goal });
  }

  handleGoalDescriptionChange(e) {
    let goal = this.state.goal;
    goal.desciptrion = e.target.value;
    this.setState({ goal: this.state.goal });
  }
}

export default GoalForm;

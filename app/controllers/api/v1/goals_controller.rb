class Api::V1::GoalsController < Api::BaseController
  before_action :ensure_parameters_exist, only: :create
  before_action :check_admin, only: %i[create update]
  before_action :find_object, only: %i[show update]

  def show
    render json: {
      messages: I18n.t("goals.show.success", goal_name: goal.name),
      # data: {
      #   goal: Serializers::Goals::GoalSerializer
      #     .new(object: goal).serializer
      # }
      goal: ApplicationController.helpers.serializer_goal(goal, current_user.id)
    }, status: 200
  end

  def create
    @goal = Goal.new goal_params
    goal.start_day = goal.tasks.map(&:start_day).min
    goal.end_day = goal.tasks.map(&:end_day).max
    goal.group_id = params[:group_id]
    if goal.save
      action_successful "create"
    else
      action_fail
    end
  end

  def update
    goal.update_attributes goal_update_params
    goal.start_day = goal.tasks.map(&:start_day).min
    goal.end_day = goal.tasks.map(&:end_day).max
    goal.group_id = params[:group_id]
    if goal.save
      action_successful "update"
    else
      action_fail
    end
  end

  private

  attr_reader :goal

  def check_admin
    return if check_permission_of(params[:group_id], "first_admin")

    require_permission
  end

  # rubocop:disable Layout/AlignArguments:
  def goal_params
    params.require(:goal).permit Goal::ATTRIBUTES_PARAMS,
      tasks_attributes: %i[name description start_day end_day]
  end
  # rubocop:enable Layout/AlignArguments:

  # rubocop:disable Layout/AlignArguments:
  def goal_update_params
    params.require(:goal).permit Goal::ATTRIBUTES_PARAMS,
      tasks_attributes: %i[id name description start_day end_day]
  end

  def action_successful(action)
    render json: {
      messages: I18n.t("goals." + action + ".success"),
      data: {
        goal: Serializers::Goals::GoalSerializer
          .new(object: goal).serializer
      }
    }, status: 200
  end
  # rubocop:enable Layout/AlignArguments:

  def action_fail
    render json: {
      messages: group.errors.messages
    }, status: 401
  end
end

class Api::V1::UserGoalsController < Api::BaseController
  before_action :find_object, only: :destroy

  def create
    if cur_user_joined_group? params[:group_id]
      if check_exist
        joined_goal
      else
        UserGoal.create user_id: current_user.id, goal_id: params[:goal_id]
        join_goal_success
      end
    else
      join_group_first
    end
  end

  def destroy
    if permission? user_goal.user_id
      leave_goal_successful if user_goal.destroy
    else
      require_permission
    end
  end

  private

  attr_reader :user_goal

  def user_goal_params
    params.require(:user_goal).permit UserGoal::ATRIBUTES_PARAMS
  end

  def join_goal_success
    render json: {
      messages: I18n.t("user_goals.create_success",
                       goal_name: goal(params[:goal_id]).name),
      data: {
        goal: Serializers::Goals::GoalSerializer
          .new(object: goal(params[:goal_id])).serializer
      }
    }, status: 200
  end

  def goal(goal_id)
    @goal ||= Goal.find_by id: goal_id
  end

  def check_exist
    ug = UserGoal.where(user_id: current_user.id, goal_id: params[:goal_id])
    ug.presence ? true : false
  end

  def joined_goal
    render json: {
      messages: I18n.t("user_goals.create.joined",
                       goal_name: goal(params[:goal_id]).name),
      data: {
        goal: Serializers::Goals::GoalSerializer
          .new(object: goal(params[:goal_id])).serializer
      }
    }, status: 409
  end

  def permission?(params_user_id)
    current_user.id.equal? params_user_id
  end

  def join_goal_fail
    render json: {
      messages: user_goal.errors.messages
    }, status: 422
  end

  def leave_goal_successful
    render json: {
      messages: I18n.t("user_goals.destroy.success")
    }, status: 200
  end
end

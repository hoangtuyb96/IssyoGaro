class Api::V1::UserGoalsController < Api::BaseController
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

  private

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
end

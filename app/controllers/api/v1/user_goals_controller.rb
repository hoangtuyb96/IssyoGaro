class Api::V1::UserGoalsController < Api::BaseController
  before_action :find_object, only: :destroy

  def create
    if cur_user_joined_group? params[:group_id]
      if check_exist
        joined_goal
      else
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

  # rubocop:disable Metrics/MethodLength
  def goal_progress
    ug = UserGoal.search_role(params[:user_id], params[:goal_id]).take
    render json: {
      messages: I18n.t("user_goals.goal_progress.success",
                       goal_name: goal(params[:goal_id]).name),
      data: {
        user: Serializers::Users::UserSimpleSerializer
          .new(object: user(params[:user_id])).serializer,
        goal: Serializers::Goals::GoalSimpleSerializer
          .new(object: goal(params[:goal_id])).serializer,
        user_goal_id: ug.id,
        goal_progress: ug.progress,
        tasks: Serializers::UserTasks::UserTaskProgressSerializer
          .new(object: ug.user_tasks).serializer,
        honnin: params[:user_id].to_i.eql?(current_user.id) ? true : false,
        joined_users: Serializers::Users::UserSimpleSerializer.new(
          object: goal(params[:goal_id]).users
        ).serializer
      }
    }, status: 200
  end
  # rubocop:enable Metrics/MethodLength

  private

  attr_reader :user_goal, :ug, :created_ug

  def user_goal_params
    params.require(:user_goal).permit UserGoal::ATRIBUTES_PARAMS
  end

  def check_exist
    @ug = UserGoal
          .where(user_id: current_user.id, goal_id: params[:goal_id]).take
    ug.presence ? true : false
  end

  def join_goal_success
    @created_ug =
      UserGoal.create user_id: current_user.id, goal_id: params[:goal_id]
    goal(params[:goal_id]).tasks.each do |task|
      UserTask.create user_id: current_user.id, task_id: task.id,
                      user_goal_id: created_ug.id
    end
    join_goal_success_response
  end

  # rubocop:disable Metrics/MethodLength
  def join_goal_success_response
    render json: {
      messages: I18n.t("user_goals.create.success",
                       goal_name: goal(params[:goal_id]).name),
      data: {
        user: Serializers::Users::UserSimpleSerializer
          .new(object: current_user).serializer,
        goal: Serializers::Goals::GoalSimpleSerializer
          .new(object: goal(params[:goal_id])).serializer,
        goal_progress: created_ug.progress,
        tasks: Serializers::UserTasks::UserTaskProgressSerializer
          .new(object: filter_user_task).serializer
      }
    }, status: 200
  end
  # rubocop:enable Metrics/MethodLength

  def filter_user_task
    final_fut = []
    goal(params[:goal_id]).tasks.each do |task|
      final_fut.append(task.user_tasks.where(user_id: current_user.id).take)
    end
    final_fut
  end

  def goal(goal_id)
    @goal ||= Goal.find_by id: goal_id
  end

  # rubocop:disable Metrics/MethodLength
  def joined_goal
    render json: {
      messages: I18n.t("user_goals.create.joined",
                       goal_name: goal(params[:goal_id]).name),
      data: {
        user: Serializers::Users::UserSimpleSerializer
          .new(object: current_user).serializer,
        goal: Serializers::Goals::GoalSimpleSerializer
          .new(object: goal(params[:goal_id])).serializer,
        goal_progress: ug.progress,
        tasks: Serializers::UserTasks::UserTaskProgressSerializer
          .new(object: filter_user_task).serializer
      }
    }, status: 409
  end
  # rubocop:enable Metrics/MethodLength

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

  def user(user_id)
    @user ||= User.find_by id: user_id
  end
end

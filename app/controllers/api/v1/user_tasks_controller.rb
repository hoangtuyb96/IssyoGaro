class Api::V1::UserTasksController < Api::BaseController
  before_action :ensure_parameters_exist, only: :update
  before_action :find_user_task, only: :update

  def update
    if goal.users.include? current_user
      if user_task.user_id.eql? current_user.id
        cant_evaluate_yourself
      elsif user_task.task.end_day > Time.now
        evaluate_another
      else
        date_expired
      end
    else
      join_goal_first
    end
  end

  private

  attr_reader :user_task, :user_goal

  def find_user_task
    @user_task = UserTask.find_by task_id: params[:user_task][:task_id],
                                  user_id: params[:user_task][:user_id]
  end

  def goal
    user_task.task.goal
  end

  def user
    User.find_by id: params[:user_task][:user_id]
  end

  def filter_user_task
    final_fut = []
    goal.tasks.each do |task|
      final_fut.append(
        task.user_tasks.where(user_id: params[:user_task][:user_id]).take
      )
    end
    final_fut
  end

  def cant_evaluate_yourself
    render json: {
      messages: I18n.t("user_tasks.messages.cant_evaluate_self")
    }, status: 401
  end

  def join_goal_first
    render json: {
      messages: I18n.t("user_tasks.messages.join_goal_first")
    }, status: 401
  end

  def evaluate_another
    user_task.evaluate_user_id = current_user.id
    user_task.update_attributes progress: params[:user_task][:progress]
    update_goal_progress
    evaluate_success
  end

  def update_goal_progress
    @user_goal = user_task.user_goal
    user_tasks = user_goal.user_tasks
    user_progress =
      (user_tasks.map(&:progress).sum / user_tasks.count).round(3)
    user_goal.update_attributes progress: user_progress
  end

  def evaluate_success
    render json: {
      messages: I18n.t("user_tasks.update.success"),
      data: {
        user: Serializers::Users::UserSimpleSerializer
          .new(object: user).serializer,
        goal: Serializers::Goals::GoalSimpleSerializer
          .new(object: goal).serializer,
        goal_progress: user_goal.progress,
        tasks: Serializers::UserTasks::UserTaskprogressSerializer
          .new(object: filter_user_task).serializer
      }
    }, status: 200
  end

  def date_expired
    render json: {
      messages: I18n.t("user_tasks.messages.date_expired")
    }, status: 401
  end
end

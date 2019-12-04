class Api::V1::SummariesController < Api::BaseController
  def create
    if goal.achievements.blank?
      @user_goals = goal.user_goals.sort_by(&:progress).last(3).reverse
      create_achievement
      create_successful
    else
      cant_create_achievement_again
    end
  end

  private

  def goal
    @goal ||= Goal.find_by id: params[:goal_id]
  end

  def create_achievement
    Achivements::CreateAchievementService.new(
      user_goals: @user_goals,
      group_id: goal.group.id,
      goal_id: params[:goal_id]
    ).perform
  end

  def create_successful
    render json: {
      messages: I18n.t("summaries.create.done"),
      data: {
        goal: Serializers::Goals::GoalWithAchievementSerializer
          .new(object: goal).serializer
      }
    }, status: 200
  end

  def cant_create_achievement_again
    render json: {
      messages: I18n.t("summaries.create.cant_create_achievement_again")
    }, status: 401
  end
end

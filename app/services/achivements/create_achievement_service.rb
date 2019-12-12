class Achivements::CreateAchievementService
  def initialize(params)
    @user_goals = params[:user_goals]
    @group_id = params[:group_id]
    @goal_id = params[:goal_id]
  end

  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Style/GuardClause
  def perform
    if user_goals[0].present?
      create_achievement(user_goals[0].user_id, 1, user_goals[0].progress)
    else
      return
    end
    if user_goals[1].present?
      create_achievement(user_goals[1].user_id, 2, user_goals[1].progress)
    else
      return
    end
    if user_goals[2].present?
      create_achievement(user_goals[2].user_id, 3, user_goals[2].progress)
    else
      return
    end
  end
  # rubocop:enable Style/GuardClause
  # rubocop:enable Metrics/MethodLength

  private

  attr_reader :user_goals

  def create_achievement(user_id, grade, progress)
    Achievement.create(
      user_id: user_id,
      group_id: @group_id,
      goal_id: @goal_id,
      achievement_type: grade,
      progress: progress
    )
  end
end

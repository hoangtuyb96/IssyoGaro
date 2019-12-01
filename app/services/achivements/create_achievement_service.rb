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
      create_achievement(user_goals[0].user_id, 1)
    else
      return
    end
    if user_goals[1].present?
      create_achievement(user_goals[1].user_id, 2)
    else
      return
    end
    if user_goals[2].present?
      create_achievement(user_goals[2].user_id, 3)
    else
      return
    end
  end
  # rubocop:enable Style/GuardClause
  # rubocop:enable Metrics/MethodLength

  private

  attr_reader :user_goals

  def create_achievement(user_id, grade)
    Achievement.create(
      user_id: user_id,
      group_id: @group_id,
      goal_id: @goal_id,
      achievement_type: grade
    )
  end
end

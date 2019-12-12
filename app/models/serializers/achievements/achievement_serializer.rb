class Serializers::Achievements::AchievementSerializer <
  Serializers::SupportSerializer
  attrs :id, :context, :group_id, :goal_id, :achievement_type, :user_id,
        :user_name, :goal_name, :progress

  def user_name
    object.user.name
  end

  def goal_name
    object.goal.name
  end
end

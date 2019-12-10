class Serializers::Achievements::AchievementSerializer <
  Serializers::SupportSerializer
  attrs :id, :context, :group_id, :goal_id, :achievement_type, :user_id,
        :user_name

  def user_name
    object.user.name
  end
end

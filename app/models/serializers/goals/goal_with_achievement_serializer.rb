class Serializers::Goals::GoalWithAchievementSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :group_id, :description, :start_day, :end_day,
        :tasks, :achievement

  def tasks
    Serializers::Tasks::TaskSerializer.new(object: object.tasks).serializer
  end

  def achievement
    Serializers::Achievements::AchievementSerializer
      .new(object: object.achievements).serializer
  end
end

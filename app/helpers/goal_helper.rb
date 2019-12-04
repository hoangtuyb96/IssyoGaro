module GoalHelper
  # rubocop:disable Metrics/MethodLength
  def serializer_goal(goal, cur_user_id)
    ug = UserGoal.search_role(cur_user_id, goal.id).take
    goal_serializer = {
      "id": goal.id,
      "name": goal.name,
      "description": goal.description,
      "start_day": custom_time(goal.start_day),
      "end_day": custom_time(goal.end_day),
      "is_joined": ug.present? ? true : false,
      "user_goal_id": ug.present? ? ug.id : nil,
      "group_id": goal.group.id
    }

    goal_serializer[:tasks] =
    Serializers::Tasks::TaskSerializer.new(object: goal.tasks).serializer

    goal_serializer
  end
  # rubocop:enable Metrics/MethodLength
end

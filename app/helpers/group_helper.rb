module GroupHelper
  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Style/BracesAroundHashParameters
  def serializer_groups(groups, cur_user_id)
    groups_serializer = []
    groups.each do |group|
      ug = UserGroup.search_role(cur_user_id, group.id).take
      groups_serializer.append(
        {
          "id": group.id,
          "name": group.name,
          "description": group.description,
          "cover": group.cover,
          "is_public": group.is_public,
          "category": group.category.present? ? group.category.name : nil,
          "is_joined": ug.present? ? true : false,
          "created_at": custom_time(group.created_at)
        }
      )
    end
    groups_serializer
  end
  # rubocop:enable Style/BracesAroundHashParameters
  # rubocop:enable Metrics/MethodLength

  def custom_time(time)
    time.strftime("%H:%M:%S %d-%m-%Y")
  end

  # rubocop:disable Metrics/MethodLength
  def serializer_group(group, cur_user_id)
    ug = UserGroup.search_role(cur_user_id, group.id).take
    group_serializer = {
      "id": group.id,
      "name": group.name,
      "description": group.description,
      "cover": group.cover,
      "is_public": group.is_public,
      "category": group.category.present? ? group.category.name : nil,
      "is_joined": ug.present? ? true : false,
      "created_at": custom_time(group.created_at),
      "current_user_role": ug.present? ? ug.role : nil
    }

    if ug.present?
      group_serializer[:goals] =
        Serializers::Goals::GoalSerializer.new(object: group.goals).serializer
      group_serializer[:user_group_id] = ug.id
    end
    group_serializer
  end
  # rubocop:enable Metrics/MethodLength
end

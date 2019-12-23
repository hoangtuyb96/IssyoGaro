module GroupHelper
  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Style/BracesAroundHashParameters
  def serializer_groups(groups, cur_user_id)
    groups_serializer = []
    groups.each do |group|
      ug = UserGroup.search_role(cur_user_id, group.id).take
      is_requested =
        if group.is_public
          false
        else
          Request.search_request(cur_user_id, group.id).blank? ? false : true
        end
      groups_serializer.append(
        {
          "id": group.id,
          "name": group.name,
          "description": group.description,
          "cover": group.cover.presence ? group.cover.file.filename : nil,
          "is_public": group.is_public,
          "category": group.category.present? ? group.category.name : nil,
          "is_joined": ug.present? ? true : false,
          "is_requested": is_requested,
          "created_at": custom_time(group.created_at)
        }
      )
    end
    groups_serializer
  end
  # rubocop:enable Style/BracesAroundHashParameters
  # rubocop:enable Metrics/MethodLength

  def serializer_groups_without_login(groups)
    groups_serializer = []
    groups.each do |group|
      groups_serializer.append(
        {
          "id": group.id,
          "name": group.name,
          "description": group.description,
          "cover": group.cover.presence ? group.cover.file.identifier : nil,
          "is_public": group.is_public,
          "category": group.category.present? ? group.category.name : nil,
          "is_joined": nil,
          "created_at": custom_time(group.created_at)
        }
      )
    end
    groups_serializer
  end

  def custom_time(time)
    time.strftime("%Y-%m-%d %H:%M:%S")
  end

  # rubocop:disable Metrics/MethodLength
  def serializer_group(group, cur_user_id)
    ug = UserGroup.search_role(cur_user_id, group.id).take
    is_requested =
      if group.is_public
        false
      else
        Request.search_request(cur_user_id, group.id).blank? ? false : true
      end
    group_serializer = {
      "id": group.id,
      "name": group.name,
      "description": group.description,
      "cover": group.cover.presence ? group.cover.file.filename : nil,
      "is_public": group.is_public,
      "category": group.category.present? ? group.category.name : nil,
      "is_joined": ug.present? ? true : false,
      "is_requested": is_requested,
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

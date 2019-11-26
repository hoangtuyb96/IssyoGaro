class Serializers::Goals::GoalSimpleSerializer < Serializers::SupportSerializer
  attrs :id, :name, :group_id, :description, :start_day, :end_day
end

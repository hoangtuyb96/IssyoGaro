class Serializers::Tasks::TaskSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :start_day, :end_day
end

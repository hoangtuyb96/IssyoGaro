class Serializers::UserTasks::UserTaskProgressSerializer <
  Serializers::SupportSerializer
  attrs :user_task_id, :progress, :task

  def user_task_id
    object.id
  end

  def task
    Serializers::Tasks::TaskSerializer.new(object: object.task).serializer
  end
end

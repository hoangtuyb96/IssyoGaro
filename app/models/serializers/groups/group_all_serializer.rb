class Serializers::Groups::GroupAllSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :category, :cover, :is_public, :goals

  def category
    return unless object.category

    Serializers::Categories::CategorySerializer
      .new(object: object.category).serializer
  end

  def goals
    Serializers::Goals::GoalSerializer
      .new(object: object.goals).serializer
  end
end

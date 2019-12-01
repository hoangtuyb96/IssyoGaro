class Serializers::Groups::GroupSerializer < Serializers::SupportSerializer
  attrs :id, :name, :description, :category, :cover, :is_public

  def category
    return unless object.category

    Serializers::Category::CategorySerializer
      .new(object: object.category).serializer
  end
end

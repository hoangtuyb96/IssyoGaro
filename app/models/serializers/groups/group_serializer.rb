class Serializers::Groups::GroupSerializer < Serializers::SupportSerializer
  attrs :name, :description, :category, :cover, :is_public

  def category
    if object.category
      Serializers::Category::CategorySerializer
        .new(object: object.category).serializer
    end
  end
end

class Serializers::Users::UserSimpleSerializer < Serializers::SupportSerializer
  attrs :id, :email, :name, :avatar
end

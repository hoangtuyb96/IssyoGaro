class Api::V1::UsersController < Api::BaseController
  before_action :find_object, only: :show

  def show
    render json: {
      messages: I18n.t("users.show.success"),
      data: { user: serializer_show_user }
    }, status: 200
  end

  private

  def serializer_show_user
    Serializers::Users::UserSerializer.new(object: @user).serializer
  end
end
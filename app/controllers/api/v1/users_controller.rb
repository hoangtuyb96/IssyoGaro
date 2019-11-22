class Api::V1::UsersController < Api::BaseController
  before_action :find_object, only: :show

  def show
    render json: {
      messages: I18n.t("users.show.success"),
      data: { user: @user }
    }, status: 200
  end
end

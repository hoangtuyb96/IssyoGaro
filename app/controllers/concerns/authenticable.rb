module Authenticable
  def current_user
    @current_user ||= User
      .find_by authentication_token: request.headers["IG-AUTH-TOKEN"]
  end

  def authenticate_with_token!
    return if current_user

    render json: {
      messages: I18n.t("devise.failure.unauthenticated")
    }, status: :unauthorized
  end

  def user_signed_in?
    current_user.present?
  end
end

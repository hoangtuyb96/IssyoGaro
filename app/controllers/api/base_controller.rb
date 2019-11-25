class Api::BaseController < ActionController::API
  include Authenticable
  acts_as_token_authentication_handler_for User, fallback: :none

  private

  alias_method :authenticate_user_from_token, :authenticate_with_token!

  def find_variable_name
    return if params[:controller].blank?

    params[:controller].split("/").last.singularize
  end

  def ensure_parameters_exist
    find_variable_name
    return unless params[find_variable_name].blank?

    render json: {
      messages: I18n.t("api.missing_params")
    }, status: 400
  end

  def find_object
    instance_name = find_variable_name
    instance_variable_set "@#{instance_name}",
      instance_name.classify.constantize.find_by(id: params[:id])
    return if instance_variable_get "@#{instance_name}"

    render json: {
      messages:
        I18n.t("#{instance_name.pluralize}.messages.#{instance_name}_not_found")
    }, status: 404
  end

  def valid_token
    @user = User.find_by authentication_token: request.headers["IG-AUTH-TOKEN"]
    return if @user

    render json: {
      messages: I18n.t("api.invalid_token")
    }, status: 404
  end

  def require_permission
    render json: {
      messages: I18n.t("api.not_permission")
    }, status: 401
  end

  # rubucop:disable Metrics/MethodLength
  def check_permission_of(group_id, role)
    cur_role = current_user.user_groups.where(group_id: group_id).take
    return false unless cur_role.present?

    cur_role =
      case cur_role.role
      when 1
        "user"
      when 2
        "admin"
      when 3
        "first_admin"
      end
    cur_role.eql? role
  end
  # rubucop:enable Metrics/MethodLength
end

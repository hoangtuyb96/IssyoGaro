class Api::V1::UserGroupsController < Api::BaseController
  before_action :ensure_parameters_exist, only: :create
  before_action :check_permission, only: :create
  before_action :find_role, only: :create

  def create
    if role.presence
      joined_group
    else
      @user_group = UserGroup.new user_group_params
      if user_group.save
        join_group_successful
      else
        join_group_fail
      end
    end
  end

  private

  attr_reader :role, :user_group

  def user_group_params
    params.require(:user_group).permit UserGroup::ATTRIBUTES_PARAMS
  end

  def check_permission
    return if current_user.id.equal? params[:user_group][:user_id].to_i

    require_permission
  end

  def find_role
    @role = UserGroup.search_role(params[:user_group][:user_id],
      params[:user_group][:group_id])
  end

  def group
    @group ||= Group.find_by id: params[:user_group][:group_id]
  end

  def joined_group
    render json: {
      messages: I18n.t("user_groups.create.joined",
        group_name: group.name),
      data: { group: Serializers::Groups::GroupSerializer
        .new(object: group) }
    }, data: 409
  end

  def join_group_successful
    render json: {
      messages: I18n.t("user_groups.create.success",
        group_name: group.name),
      data: { group: Serializers::Groups::GroupsSerializer
        .new(object: group) }
    }, status: 200
  end

  def join_group_fail
    render json: {
      messages: users_group.errors.messages
    }, status: 422
  end
end

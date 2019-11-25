class Api::V1::UserGroupsController < Api::BaseController
  before_action :ensure_parameters_exist, only: :create
  before_action :find_role, only: :create
  before_action :find_object, only: :destroy

  def create
    if permission? params[:user_group][:user_id].to_i
      if role.presence
        joined_group
      else
        handle_joind_group
      end
    else
      require_permission
    end
  end

  def destroy
    if permission? user_group.user_id
      leave_group_successful if user_group.destroy
    else
      require_permission
    end
  end

  private

  attr_reader :role, :user_group

  def user_group_params
    params.require(:user_group).permit UserGroup::ATTRIBUTES_PARAMS
  end

  def permission?(params_user_id)
    current_user.id.equal? params_user_id
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

  def leave_group_successful
    render json: {
      messages: I18n.t("user_groups.destroy.success")
    }, status: 200
  end

  def handle_join_group
    @user_group = UserGroup.new user_group_params
    if user_group.save
      join_group_successful
    else
      join_group_fail
    end
  end
end

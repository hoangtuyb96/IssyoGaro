class Api::V1::UserGroupsController < Api::BaseController
  before_action :ensure_parameters_exist, only: :create
  before_action :find_role, only: :create
  before_action :find_object, only: %i[update destroy]

  def create
    if permission? params[:user_group][:user_id].to_i
      if role.presence
        joined_group
      else
        handle_join_group
      end
    else
      require_permission
    end
  end

  def update
    if check_permission_of(user_group.group_id, "first_admin")
      @group_root = Group.find_by id: user_group.group_id
      change_permission
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
      data: { group: Serializers::Groups::GroupAllSerializer
        .new(object: group).serializer }
    }, data: 409
  end

  def join_group_successful
    render json: {
      messages: I18n.t("user_groups.create.success",
        group_name: group.name),
      data: { group: Serializers::Groups::GroupAllSerializer
        .new(object: group).serializer }
    }, status: 200
  end

  def join_group_fail
    render json: {
      messages: user_group.errors.messages
    }, status: 422
  end

  def leave_group_successful
    render json: {
      messages: I18n.t("user_groups.destroy.success")
    }, status: 200
  end

  def handle_join_group
    if group.is_public
      @user_group = UserGroup.new user_group_params
      if user_group.save
        join_group_successful
      else
        join_group_fail
      end
    else
      if Request.search_request(current_user.id, params[:user_group][:group_id]).blank?
        Request.create group_id: params[:user_group][:group_id], user_id: current_user.id
        request_success
      else
        requested
      end
    end
  end

  def change_permission
    if user_group.role.eql? 2
      user_group.update_attributes role: 1
    else
      user_group.update_attributes role: 2
    end
    render_all_member_in_group
  end

  def render_all_member_in_group
    render json: {
      data: {
        messages: I18n.t("user_groups.update.change_permission"),
        group: Serializers::Groups::GroupMembersSerializer
          .new(object: @group_root).serializer
      }
    }, status: 200
  end

  def request_success
    render json: {
      data: {
        messages: I18n.t("user_groups.create.request_success"),
        group: Serializers::Groups::GroupAllSerializer
          .new(object: group).serializer
      }
    }, status: 200
  end

  def requested
    render json: {
      data: {
        messages: I18n.t("user_groups.create.request_success"),
        group: Serializers::Groups::GroupAllSerializer
          .new(object: group).serializer
      }
    }, status: 200
  end
end

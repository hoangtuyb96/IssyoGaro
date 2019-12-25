class Api::V1::GroupsController < Api::BaseController
  before_action :ensure_parameters_exist, only: %i[create update]
  before_action :find_object, only: %i[show update destroy]

  def show
    render json: {
      messages: I18n.t("groups.show.success", group_name: group.name),
      group: ApplicationController.helpers
                                  .serializer_group(group, current_user.id)
    }, status: 200
  end

  def create
    @group = Group.new group_params
    if group.save
      create_user_group
      action_successfully "create"
    else
      action_fail
    end
  end

  def update
    if UserGroup.search_role(current_user.id, group.id).take&.role.equal? 3
      if group.update_attributes update_group_params
        action_successfully "update"
      else
        action_fail
      end
    else
      require_permission
    end
  end

  def destroy
    if UserGroup.search_role(current_user.id, group.id).take&.role.equal? 3
      if group.destroy
        destroy_success
      else
        action_fail
      end
    else
      require_permission
    end
  end

  private

  attr_reader :group

  def group_params
    params.require(:group).permit Group::ATTRIBUTES_PARAMS
  end

  def update_group_params
    params.require(:group).permit %i[description is_public cover]
  end

  def create_user_group
    Groups::CreateUserGroupService.new(
      user_id: current_user.id,
      group_id: group.id,
      role: 3
    ).perform
  end

  def action_successfully(action)
    create_notification
    send_notification
    render json: {
      messages: I18n.t("groups." + action + ".success"),
      data: {
        group: ApplicationController.helpers
                                    .serializer_group(group, current_user.id)
      }
    }, status: 200
  end

  def destroy_success
    render json: {
      messages: I18n.t("groups.destroy.success")
    }, status: 204
  end

  def action_fail
    render json: {
      messages: group.errors.messages
    }, status: 401
  end

  def create_notification
    group.users.each do |user|
      Notification.create user_id: user.id,
        sender_id: current_user.id,
        notificationable_type: "Group",
        notificationable_id: group.id,
        target_id: params[:id],
        context: group.name + " 's information has changed"
    end
  end

  def send_notification
    Groups::SendNotificationsService.new(
      users: group.users
    ).perform
  end
end

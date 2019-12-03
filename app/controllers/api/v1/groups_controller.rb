class Api::V1::GroupsController < Api::BaseController
  before_action :ensure_parameters_exist, only: %i[create update]
  before_action :find_object, only: %i[show update]

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
      if group.update_attributes group_params
        action_successfully "update"
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

  def create_user_group
    Groups::CreateUserGroupService.new(
      user_id: current_user.id,
      group_id: group.id,
      role: 3
    ).perform
  end

  def action_successfully(action)
    render json: {
      messages: I18n.t("groups." + action + ".success"),
      data: {
        group: Serializers::Groups::GroupSerializer
          .new(object: group).serializer
      }
    }, status: 200
  end

  def action_fail
    render json: {
      messages: group.errors.messages
    }, status: 401
  end
end

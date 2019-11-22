class Api::V1::GroupsController < Api::BaseController
  before_action :ensure_parameters_exist, only: :create

  def create
    @group = Group.new group_params
    if group.save
      create_user_group
      create_successfully
    else
      create_fail
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

  def create_fail
    render json: {
      messages: group.errors.messages
    }, status: 401
  end

  def create_successfully
    render json: {
      messages: I18n.t("groups.create.success"),
      data: { 
        group: Serializers::Groups::GroupSerializer
          .new(object: group).serializer
      }
    }, status: 200
  end
end

class Api::V1::GroupsController < Api::BaseController
  before_action :ensure_parameters_exist, only: :create

  def create
    @group = Group.new group_params
    if group.save
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

  def create_successfully
    render json: {
      messages: I18n.t("groups.create.success"),
      data: { 
        group: Serializers::Groups::GroupSerializer
          .new(object: group).serializer
      }
    }, status: 200
  end

  def create_fail
    render json: {
      messages: group.errors.messages
    }, status: 401
  end
end

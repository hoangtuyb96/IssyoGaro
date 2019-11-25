class Api::V1::GroupMembersController < Api::BaseController
  before_action :find_group, only: :index

  def index
    if check_permission_of(params[:group_id], "admin") ||
      check_permission_of(params[:group_id], "first_admin")
      render json: {
        data: {
          group: Serializers::Groups::GroupMembersSerializer
            .new(object: group).serializer
        }
      }, status: 200
    else
      require_permission
    end
  end

  private

  attr_reader :group

  def find_group
    @group = Group.find_by id: params[:group_id]
  end
end

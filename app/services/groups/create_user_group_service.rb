class Groups::CreateUserGroupService
  def initialize(params)
    @user_id = params[:user_id]
    @group_id = params[:group_id]
    @role = params[:role]
  end

  def perform
    UserGroup.create! user_id: @user_id, group_id: @group_id, role: @role
  end
end

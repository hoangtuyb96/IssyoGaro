class Api::V1::InvitesController < Api::BaseController
  def create
    if check_permission_of(params[:group_id], "admin") ||
       check_permission_of(params[:group_id], "first_admin")
      if check_exist
        invited
      else
        invite_to_group
      end
    else
      require_permission
    end
  end

  private

  def group(group_id)
    @group ||= Group.find_by id: group_id
  end

  def user(user_id)
    @user ||= User.find_by id: user_id
  end

  def invite_to_group
    Invite.create(sender_id: current_user.id, receiver_id: params[:user_id],
      group_id: params[:group_id])
    render json: {
      messages: I18n.t("invites.create.success",
        group_name: group(params[:group_id]).name),
      data: { group: Serializers::Groups::GroupSerializer
        .new(object: group(params[:group_id])) }
    }, data: 200
  end

  def check_exist
    invite = Invite.where(sender_id: current_user.id,
                          receiver_id: params[:user_id],
                          group_id: params[:group_id])
    invite.presence ? true : false
  end

  def invited
    Invite.create(sender_id: current_user.id, receiver_id: params[:user_id],
      group_id: params[:group_id])
    render json: {
      messages: I18n.t("invites.create.invited",
        user_name: user(params[:user_id])),
      data: { group: Serializers::Groups::GroupSerializer
        .new(object: group(params[:group_id])) }
    }, data: 409
  end
end

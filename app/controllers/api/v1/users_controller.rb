class Api::V1::UsersController < Api::BaseController
  acts_as_token_authentication_handler_for User, except: :show
  before_action :find_object, only: :show

  def show
    render json: {
      messages: I18n.t("users.show.success"),
      data: {
        user: serializer_show_user,
        groups_can_be_invited: filter_group_by_admin(joined_group, managed_group_by_id)
      }
    }, status: 200
  end

  private

  def serializer_show_user
    Serializers::Users::UserSerializer.new(object: @user).serializer
  end

  def receiver
    @receiver ||= User.find_by id: params[:id]
  end

  def joined_groups_receiver
    @joined_groups_receiver = receiver.groups
  end

  def filter_group_by_admin(joined_group, managed_group_by_id)
    managed_groups = []
    joined_group.each do |group|
      if managed_group_by_id.include? group.id
        managed_groups.append(
          {
            group_id: group.id,
            group_name: group.name,
            is_joined: joined_groups_receiver.include?(group) ? true : false,
            is_invited: Invite.search_invite(current_user.id, params[:id], group.id).present? ? true : false
          }
        )
      end
    end
    managed_groups
  end

  def joined_group
    current_user.groups
  end

  def managed_group_by_id
    UserGroup.search_group_by_admin(current_user.id).map{ |ug| ug.group_id }
  end
end

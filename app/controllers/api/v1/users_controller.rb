class Api::V1::UsersController < Api::BaseController
  before_action :find_object, only: %i[show update]
  before_action :ensure_parameters_exist, only: :update

  def show
    render json: {
      messages: I18n.t("users.show.success"),
      data: {
        user: serializer_show_user,
        honnin: current_user.id.eql?(params[:id].to_i) ? true : false,
        groups_can_be_invited:
          filter_group_by_admin(joined_group, managed_group_by_id)
      }
    }, status: 200
  end

  def update
    if current_user.eql? user
      if user.update_attributes user_params
        render json: {
        messages: I18n.t("users.show.success"),
        data: {
          user: serializer_show_user,
          honnin: current_user.id.eql?(params[:id].to_i) ? true : false,
          groups_can_be_invited:
            filter_group_by_admin(joined_group, managed_group_by_id)
        }
      }, status: 200
      else
        render json: {
          messages: user.errors.messages
        }, status: 401
      end
    else
      require_permission
    end
  end

  private

  attr_reader :user

  def user_params
    params.require(:user).permit %i[name phone address hobby avatar]
  end

  def serializer_show_user
    Serializers::Users::UserSerializer.new(object: user).serializer
  end

  def receiver
    @receiver ||= User.find_by id: params[:id]
  end

  def joined_groups_receiver
    @joined_groups_receiver = receiver.groups
  end

  # rubocop:disable Style/BracesAroundHashParameters
  # rubocop:disable Metrics/LineLength
  # rubocop:disable Metrics/MethodLength
  def filter_group_by_admin(joined_group, managed_group_by_id)
    managed_groups = []
    joined_group.each do |group|
      next if managed_group_by_id.exclude? group.id

      managed_groups.append(
        {
          group_id: group.id,
          group_name: group.name,
          is_joined: joined_groups_receiver.include?(group) ? true : false,
          is_invited: Invite.search_invite(current_user.id, params[:id], group.id).present? ? true : false
        }
      )
    end
    managed_groups
  end
  # rubocop:enable Metrics/MethodLength
  # rubocop:enable Metrics/LineLength
  # rubocop:enable Style/BracesAroundHashParameters

  def joined_group
    current_user.groups
  end

  def managed_group_by_id
    UserGroup.search_group_by_admin(current_user.id).map(&:group_id)
  end
end

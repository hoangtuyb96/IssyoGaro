class Api::V1::SearchController < Api::BaseController
  def index
    get_user_groups
    render_result
  end

  private

  attr_reader :users, :groups

  def get_user_groups
    users = User.ransack(name_or_email_cont: params[:q])
    users.sorts = 'created_at desc' if users.sorts.empty?
    @users = users.result(distince: true)

    groups = Group.ransack(name_or_description_cont: params[:q])
    groups.sorts = 'created_at desc' if groups.sorts.empty?
    @groups = groups.result(distince: true)
  end

  def render_result
    render json: {
      users: Serializers::Users::UserSimpleSerializer
        .new(object: users).serializer,
      groups: Serializers::Groups::GroupMimSerializer
        .new(object: groups).serializer
    }, status: 200
  end
end

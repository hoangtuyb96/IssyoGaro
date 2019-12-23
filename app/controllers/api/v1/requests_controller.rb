class Api::V1::RequestsController < Api::BaseController
  before_action :find_group, only: %i[index update destroy]
  before_action :find_request, only: %i[update destroy]

  def index
    render_requests if check_admin_permission
  end

  def update
    approve_request if check_admin_permission
  end

  def destroy
    reject_request if check_admin_permission
  end

  private

  attr_reader :group, :request_got

  def find_group
    @group = Group.find_by id: params[:group_id]
  end

  def find_request
    @request_got = Request.find_by id: params[:id]
  end

  def render_requests
    requests = group.requests
    render_success_template("Get requests successfully", requests)
  end

  def check_admin_permission
    role = UserGroup.search_role(current_user.id, params[:group_id]).take
    if role.present? && role.role.eql?(3)
      true
    else
      require_permission
      false
    end
  end

  def approve_request
    request_got.update_attributes is_approve: true
    requests = group.requests
    render_success_template("Approve request successfully", requests)
  end

  def reject_request
    request_got.destroy
    requests = group.requests
    render_success_template("Reject request successfully", requests)
  end

  def render_success_template(messages, requests)
    render json: {
      messages: messages,
      group: Serializers::Groups::GroupMimSerializer.new(object: group).serializer,
      requests: Serializers::Requests::RequestsSerializer.new(object: requests).serializer
    }, status: 200
  end
end

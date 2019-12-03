class Api::V1::HomePagesController < Api::BaseController
  helper GroupHelper
  acts_as_token_authentication_handler_for User, except: :index

  def index
    groups = Group.all
    groups_serializer =
      ApplicationController.helpers
                           .serializer_groups(groups, current_user.id)

    render json: {
      groups: groups_serializer
    }, status: 200
  end
end

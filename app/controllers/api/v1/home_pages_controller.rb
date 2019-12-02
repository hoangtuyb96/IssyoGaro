class Api::V1::HomePagesController < Api::BaseController
  acts_as_token_authentication_handler_for User, except: :index

  def index
    @groups = Group.all
    render json: {
      data: {
        groups: Serializers::Groups::GroupSerializer
          .new(object: @groups).serializer
      }
    }
  end
end

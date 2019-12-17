module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = indentify_current_user
    end

    def disconnect; end

    protected

    def indentify_current_user
      if current_user = User.find_by(authentication_token: request.params['token'])
        current_user
      else
        reject_unauthorized_connection
      end
    end
  end
end

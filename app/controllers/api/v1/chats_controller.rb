class Api::V1::ChatsController < Api::BaseController
  before_action :find_group, only: %i[index create]

  def index
    render json: {
      messages: "Successfull",
      group: Serializers::Groups::GroupMimSerializer
        .new(object: group).serializer,
      chats: Serializers::Chats::ChatSerializer
        .new(object: group.chats.reverse).serializer
    }, status: 200
  end

  def create
    @chat = Chat.new chat_params
    chat.user_id = params[:user_id]
    chat.group_id = params[:group_id]
    if chat.save
      update_chat_stream
      render json: {
        messages: "Successfull",
        group: Serializers::Groups::GroupMimSerializer
        .new(object: group).serializer,
        chats: Serializers::Chats::ChatSerializer
          .new(object: group.chats.reverse).serializer
      }, status: 200
    else
      render json: {
        messages: "Fail, try again"
      }, status: 401
    end
  end

  private

  attr_reader :chat, :group

  def chat_params
    params.require(:chat).permit Chat::ATTRIBUTES_PARAMS
  end

  def find_group
    @group = Group.find_by id: params[:group_id]
  end

  def update_chat_stream
    ChatJob.perform_now(
      Serializers::Chats::ChatSerializer
        .new(object: group.chats.reverse).serializer,
      group.users
    )
  end
end

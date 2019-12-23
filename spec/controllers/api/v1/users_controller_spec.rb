require "rails_helper"
require "shared_contexts/base_data_test"

RSpec.describe Api::V1::UsersController do
  include_context "create_user_data"
  describe "GET#show" do
    context "show user_1 with user_1 login state" do
      before do
        request.headers["IG-AUTH-TOKEN"] = user_1.authentication_token
        get :show, params: { id: user_1.id }
      end

      it "should assign user_1" do
        response_body = JSON.parse(response.body).to_h
        expect(response_body["messages"]).to eq "Show user success"
        expect(response_body["data"]["user"]["id"]).to eq user_1.id
        expect(response_body["data"]["user"]["email"]).to eq user_1.email
        expect(response_body["data"]["user"]["name"]).to eq user_1.name
        expect(response_body["data"]["user"]["avatar"]).to eq user_1.avatar.filename
        expect(response_body["data"]["user"]["phone"]).to eq user_1.phone
        expect(response_body["data"]["user"]["address"]).to eq user_1.address
        expect(response_body["data"]["user"]["hobby"]).to eq user_1.hobby
        expect(response_body["data"]["user"]["achievement"][0]["id"]).to eq user_1.achievements[0].id
        expect(response_body["data"]["user"]["achievement"][0]["context"]).to eq user_1.achievements[0].context
        expect(response_body["data"]["user"]["achievement"][0]["user_id"]).to eq user_1.achievements[0].user_id
        expect(response_body["data"]["user"]["achievement"][0]["group_id"]).to eq user_1.achievements[0].group_id
        expect(response_body["data"]["user"]["achievement"][0]["goal_id"]).to eq user_1.achievements[0].goal_id
        expect(response_body["data"]["user"]["achievement"][0]["goal_name"]).to eq finished_goal_1.name
        expect(response_body["data"]["user"]["achievement"][0]["user_name"]).to eq user_1.name
        expect(response_body["data"]["user"]["achievement"][0]["progress"]).to eq user_1.achievements[0].progress
        expect(response_body["data"]["user"]["achievement"][0]["achievement_type"]).to eq user_1.achievements[0].achievement_type
        expect(response_body["data"]["user"]["achievement"][1]["id"]).to eq user_1.achievements[1].id
        expect(response_body["data"]["user"]["achievement"][1]["context"]).to eq user_1.achievements[1].context
        expect(response_body["data"]["user"]["achievement"][1]["user_id"]).to eq user_1.achievements[1].user_id
        expect(response_body["data"]["user"]["achievement"][1]["group_id"]).to eq user_1.achievements[1].group_id
        expect(response_body["data"]["user"]["achievement"][1]["goal_id"]).to eq user_1.achievements[1].goal_id
        expect(response_body["data"]["user"]["achievement"][1]["goal_name"]).to eq finished_goal_2.name
        expect(response_body["data"]["user"]["achievement"][1]["user_name"]).to eq user_1.name
        expect(response_body["data"]["user"]["achievement"][1]["progress"]).to eq user_1.achievements[1].progress
        expect(response_body["data"]["user"]["achievement"][1]["achievement_type"]).to eq user_1.achievements[1].achievement_type
        expect(response_body["data"]["honnin"]).to eq true
        expect(response_body["data"]["groups_can_be_invited"][0]["group_id"]).to eq group_1.id
        expect(response_body["data"]["groups_can_be_invited"][0]["group_name"]).to eq group_1.name
        expect(response_body["data"]["groups_can_be_invited"][0]["is_joined"]).to eq true
        expect(response_body["data"]["groups_can_be_invited"][0]["is_invited"]).to eq false
        expect(response_body["data"]["groups_can_be_invited"][1]["group_id"]).to eq group_2.id
        expect(response_body["data"]["groups_can_be_invited"][1]["group_name"]).to eq group_2.name
        expect(response_body["data"]["groups_can_be_invited"][1]["is_joined"]).to eq true
        expect(response_body["data"]["groups_can_be_invited"][1]["is_invited"]).to eq false
      end

      it "should return HTTP status code 200" do
        expect(response).to have_http_status 200
      end
    end

    context "show user_2 with user_1 login state" do
      before do
        request.headers["IG-AUTH-TOKEN"] = user_1.authentication_token
        get :show, params: { id: user_2.id }
      end

      it "should assign user_2" do
        response_body = JSON.parse(response.body).to_h
        expect(response_body["messages"]).to eq "Show user success"
        expect(response_body["data"]["user"]["id"]).to eq user_2.id
        expect(response_body["data"]["user"]["email"]).to eq user_2.email
        expect(response_body["data"]["user"]["name"]).to eq user_2.name
        expect(response_body["data"]["user"]["avatar"]).to eq user_2.avatar.filename
        expect(response_body["data"]["user"]["phone"]).to eq user_2.phone
        expect(response_body["data"]["user"]["address"]).to eq user_2.address
        expect(response_body["data"]["user"]["hobby"]).to eq user_2.hobby
        expect(response_body["data"]["user"]["achievement"][0]["id"]).to eq user_2.achievements[0].id
        expect(response_body["data"]["user"]["achievement"][0]["context"]).to eq user_2.achievements[0].context
        expect(response_body["data"]["user"]["achievement"][0]["user_id"]).to eq user_2.achievements[0].user_id
        expect(response_body["data"]["user"]["achievement"][0]["group_id"]).to eq user_2.achievements[0].group_id
        expect(response_body["data"]["user"]["achievement"][0]["goal_id"]).to eq user_2.achievements[0].goal_id
        expect(response_body["data"]["user"]["achievement"][0]["goal_name"]).to eq finished_goal_1.name
        expect(response_body["data"]["user"]["achievement"][0]["user_name"]).to eq user_2.name
        expect(response_body["data"]["user"]["achievement"][0]["progress"]).to eq user_2.achievements[0].progress
        expect(response_body["data"]["user"]["achievement"][0]["achievement_type"]).to eq user_2.achievements[0].achievement_type
        expect(response_body["data"]["honnin"]).to eq false
        expect(response_body["data"]["groups_can_be_invited"][0]["group_id"]).to eq group_1.id
        expect(response_body["data"]["groups_can_be_invited"][0]["group_name"]).to eq group_1.name
        expect(response_body["data"]["groups_can_be_invited"][0]["is_joined"]).to eq false
        expect(response_body["data"]["groups_can_be_invited"][0]["is_invited"]).to eq false
        expect(response_body["data"]["groups_can_be_invited"][1]["group_id"]).to eq group_2.id
        expect(response_body["data"]["groups_can_be_invited"][1]["group_name"]).to eq group_2.name
        expect(response_body["data"]["groups_can_be_invited"][1]["is_joined"]).to eq true
        expect(response_body["data"]["groups_can_be_invited"][1]["is_invited"]).to eq false
      end

      it "should return HTTP status code 200" do
        expect(response).to have_http_status 200
      end
    end

    context "show user without login" do
      before do
        get :show, params: { id: user_2.id }
      end

      it "should return error response" do
        response_body = JSON.parse(response.body).to_h
        expect(response_body["messages"]).to eq "You need to sign in or sign up before continuing."
      end

      it "should return HTTP status code 401" do
        expect(response).to have_http_status 401
      end
    end

    context "show user invalid" do
      before do
        request.headers["IG-AUTH-TOKEN"] = user_1.authentication_token
        get :show, params: { id: 1000000 }
      end

      it "should return error response" do
        response_body = JSON.parse(response.body).to_h
        expect(response_body["messages"]).to eq "User not found"
      end

      it "should return HTTP status code 404" do
        expect(response).to have_http_status 404
      end
    end

    context "update user_1 profile with user_1 login state" do
      before do
        request.headers["IG-AUTH-TOKEN"] = user_1.authentication_token
        patch :update, params: { id: user_1.id, user: { name: "test name" }}
      end

      it "should assign user_1" do
        response_body = JSON.parse(response.body).to_h
      end

      it "should return HTTP status code 200" do
        expect(response).to have_http_status 200
      end
    end

    context "update user_1 profile with user_1 login state params missing" do
      before do
        request.headers["IG-AUTH-TOKEN"] = user_1.authentication_token
        patch :update, params: { id: user_1.id, user: {} }
      end

      it "should return error messages" do
        response_body = JSON.parse(response.body).to_h
        expect(response_body["messages"]).to eq "Missing parameter"
      end

      it "should return HTTP status code 400" do
        expect(response).to have_http_status 400
      end
    end

    context "update user_1 profile without login" do
      before do
        patch :update, params: { id: user_1.id }
      end

      it "should return error messages" do
        response_body = JSON.parse(response.body).to_h
        expect(response_body["messages"]).to eq "You need to sign in or sign up before continuing."
      end

      it "should return HTTP status code 401" do
        expect(response).to have_http_status 401
      end
    end

    context "update user_1 profile with user_2 login state" do
      before do
        request.headers["IG-AUTH-TOKEN"] = user_1.authentication_token
        patch :update, params: { id: user_2.id, user: { name: "test name"} }
      end

      it "should return error messages" do
        response_body = JSON.parse(response.body).to_h
        expect(response_body["messages"]).to eq "You have not permission to access"
      end

      it "should return HTTP status code 401" do
        expect(response).to have_http_status 401
      end
    end
  end
end

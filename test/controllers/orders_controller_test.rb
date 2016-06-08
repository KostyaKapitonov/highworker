require 'test_helper'

class OrdersControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get preview" do
    get :preview
    assert_response :success
  end

  test "should get addOrder" do
    get :addOrder
    assert_response :success
  end

  test "should get delOrder" do
    get :delOrder
    assert_response :success
  end

end

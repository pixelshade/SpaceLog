require 'test_helper'

class PlanetarySystemsControllerTest < ActionController::TestCase
  setup do
    @planetary_system = planetary_systems(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:planetary_systems)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create planetary_system" do
    assert_difference('PlanetarySystem.count') do
      post :create, planetary_system: { galaxy_id: @planetary_system.galaxy_id, info: @planetary_system.info, name: @planetary_system.name, posX: @planetary_system.posX, posY: @planetary_system.posY, posZ: @planetary_system.posZ, rotX: @planetary_system.rotX, rotY: @planetary_system.rotY, rotZ: @planetary_system.rotZ, size: @planetary_system.size }
    end

    assert_redirected_to planetary_system_path(assigns(:planetary_system))
  end

  test "should show planetary_system" do
    get :show, id: @planetary_system
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @planetary_system
    assert_response :success
  end

  test "should update planetary_system" do
    patch :update, id: @planetary_system, planetary_system: { galaxy_id: @planetary_system.galaxy_id, info: @planetary_system.info, name: @planetary_system.name, posX: @planetary_system.posX, posY: @planetary_system.posY, posZ: @planetary_system.posZ, rotX: @planetary_system.rotX, rotY: @planetary_system.rotY, rotZ: @planetary_system.rotZ, size: @planetary_system.size }
    assert_redirected_to planetary_system_path(assigns(:planetary_system))
  end

  test "should destroy planetary_system" do
    assert_difference('PlanetarySystem.count', -1) do
      delete :destroy, id: @planetary_system
    end

    assert_redirected_to planetary_systems_path
  end
end

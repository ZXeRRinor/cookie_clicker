require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test 'correct register' do
    post '/register', params: {user: {email: 'email@email.ru', password: '123456789000', password_confirmation: '123456789000'}}
    assert_response :success
  end

  test 'incorrect register email' do
    post '/register', params: {user: {email: 'email', password: '123456789000', password_confirmation: '123456789000'}}
    assert_redirected_to(controller: 'users', action: 'error')
  end

  test 'incorrect register password' do
    post '/register', params: {user: {email: 'email@email.ru', password: '1234', password_confirmation: '1234'}}
    assert_redirected_to(controller: 'users', action: 'error')
  end
end

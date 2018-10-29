require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  #
  test 'invalid email' do
    user = User.new(email: 'email', password: '123456789000')
    assert_not(user.save)
  end

  test 'valid email and password' do
    user = User.new(email: 'email@email.com', password: '123456789000')
    assert(user.save)
  end

  test 'invalid password' do
    user = User.new(email: 'email@email.com', password: '123')
    assert_not(user.save)
  end

  test 'duplicate user' do
    user = User.new(email: 'email@email.com', password: '123456789000')
    user.save
    user2 = User.new(email: 'email@email.com', password: '123456789000')
    assert_not(user2.save)
  end
end

include Currents, Errors, Permissions

class GameController < ApplicationController
  def game

  end

  def save_result

  end
end

def data
  params.require(:data).permit(:user_cookies, :user_producers, :current_prices_of_producers)
end
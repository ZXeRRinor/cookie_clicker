include Currents, Errors, Permissions

class GameController < ApplicationController
  def game

  end

  def save_results
    unless current_user
      redirect_to_error 'not_logged_in'
      return
    end
    producers = current_user.producers.new(data[:producers])
    producers.id = prod_id
    prices = current_user.prices.new(data[:prices])
    prices.id = price_id
    unless producers.save
      redirect_to_error 'saving_error'
      return
    end
    unless prices.save
      redirect_to_error 'saving_error'
    end
  end
end

def data
  data = params.require(:data)
  cookies = data.permit(:user_cookies)
  user_producers = data.require(:user_producers).permit('Auto Clicker', 'Auto Oven', 'Cookie Farm', 'Cookie Factory', 'Cookie Reactor', 'Cookie Materialiser', 'Quantum Cookie Singularity', 'Admin Cookie Creator')
  prices = data.require(:current_prices_of_producers).permit('Auto Clicker', 'Auto Oven', 'Cookie Farm', 'Cookie Factory', 'Cookie Reactor', 'Cookie Materialiser', 'Quantum Cookie Singularity', 'Admin Cookie Creator')
  {cookies: cookies, producers: user_producers, prices: prices}
end
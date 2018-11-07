include Currents, Errors, Permissions

class GameController < ApplicationController
  def game

  end

  def get_results
    unless check_curr_user
      return
    end
    @cookies = current_user.user_cookies
    @producers = current_user.producers.first
    @prices = current_user.prices.first
  end

  def save_results
    unless check_curr_user
      return
    end
    producers = Producer.find_by(user_id: current_user.id)
    if producers
      producers.update_attributes(data[:producers])
    else
      producers = current_user.producers.new(data[:producers])
      unless producers.save
        redirect_to_error 'saving_error'
        return
      end
    end
    prices = Price.find_by(user_id: current_user.id)
    if prices
      prices.update_attributes(data[:prices])
    else
      prices = current_user.prices.new(data[:prices])
      unless prices.save
        redirect_to_error 'saving_error'
      end
    end
  end
end

def check_curr_user
  unless current_user
    redirect_to_error 'not_logged_in'
    return false
  end
  true
end

def data
  data = params.require(:data)
  cookies = data.permit(:user_cookies)
  user_producers = data.require(:user_producers).permit('Auto Clicker', 'Auto Oven', 'Cookie Farm', 'Cookie Factory', 'Cookie Reactor', 'Cookie Materialiser', 'Quantum Cookie Singularity', 'Admin Cookie Creator')
  prices = data.require(:current_prices_of_producers).permit('Auto Clicker', 'Auto Oven', 'Cookie Farm', 'Cookie Factory', 'Cookie Reactor', 'Cookie Materialiser', 'Quantum Cookie Singularity', 'Admin Cookie Creator')
  {cookies: cookies, producers: user_producers, prices: prices}
end
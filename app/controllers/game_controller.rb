include(Game)

class GameController < ApplicationController
  def game

  end

  def leaderboard
    json = []
    User.all.limit(LEADERBOARD_USR_AMOUNT).order(user_cookies: :desc).each do |user|
      json.push({id: user.id, name: user.name, cookies: user.user_cookies})
    end
    json = json.to_json.to_s
    render json: json, content_type: 'application/json'
  end

  def get_results
    unless check_curr_user
      return
    end
    cookies = current_user.user_cookies
    producers = current_user.producers.first
    prices = current_user.prices.first
    @json = {
        userCookies: cookies,
        userProducers: producers,
        currentPricesOfProducers: prices
    }.to_json.to_s
    render json: @json, content_type: 'application/json'
  end

  def save_results
    unless check_curr_user
      return
    end
    current_user.update_attribute(:user_cookies, data[:cookies][:user_cookies].to_i)
    producers = Producer.find_by(user_id: current_user.id)
    if producers
      producers.update_attributes(data[:producers])
    else
      producers = current_user.producers.new(data[:producers])
      if producers.save
      else
        redirect_to_error 'saving_error'
        return
      end
    end
    prices = Price.find_by(user_id: current_user.id)
    if prices
      prices.update_attributes(data[:prices])
    else
      prices = current_user.prices.new(data[:prices])
      if prices.save
      else
        redirect_to_error 'saving_error'
        return
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
  user_producers = data.require(:user_producers).permit(PRODUCER_LIST)
  prices = data.require(:current_prices_of_producers).permit(PRODUCER_LIST)
  {cookies: cookies, producers: user_producers, prices: prices}
end
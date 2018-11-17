module UserAdditionals
  def create_producers
    prod_params = {}
    PRODUCER_LIST.each do |producer|
      prod_params[producer] = DEFAULT_AMOUNT
    end
    self.producers.new(prod_params)
  end

  def create_prices
    price_params = {}
    PRODUCER_LIST.each do |producer|
      price_params[producer] = PRODUCERS[producer.to_sym][:price]
    end
    self.prices.new(price_params)
  end

  def set_default_values
    self.permissions = USERPERMS
    self.user_cookies = BASE_COOKIES
  end
end
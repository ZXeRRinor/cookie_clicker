module Errors
  def redirect_to_error(error_type)
    redirect_to controller: 'errors', action: 'error', type: error_type
  end
end
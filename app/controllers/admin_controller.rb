include(Currents, Errors)

class AdminController < ApplicationController
end

def set_perms_id
  params.require(:user_id)
end
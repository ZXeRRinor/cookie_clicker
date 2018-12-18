include Currents, UserUtils;

class ComponentsController < ApplicationController
  def navbar
    if current_user
      json = {
          permissions: current_user.permissions, current_user: [
              email: current_user.email,
              name: current_user.name,
          ]
      }
    else
      json = {current_user: nil}
    end
    render json: json.to_json.to_s, content_type: 'application/json'
  end

  def generate_modal
    @parameters = {
        title: params[:title],
        open_button: params[:open_button],
        id: params[:id]
    }
  end

  def generate_register_form

  end
end

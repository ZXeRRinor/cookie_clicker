include Currents, UserUtils

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

  def convert_words
    require 'simple_xlsx_reader'
    workbook = SimpleXlsxReader.open 'app/assets/database/dict.xlsx'
    worksheet = workbook.sheets.first
    worksheet.rows.each do |row|
      User.find(0).words.create(id: row[0], mari_word: row[1], mari_word_adapted: row[2], rus: row[3])
    end
    redirect_to '/'
  end

  def generate_register_form

  end

  def generate_login_form

  end
end

include Dictionary

class DictionaryController < ApplicationController
  def translate_to_json
    if params[:backtranslations] == 'true'
      render json: translate_with_backtrans(params[:origin_lang], params[:word]).to_json.to_s, content_type: 'application/json'
    else
      render json: translate_b(params[:origin_lang], params[:word]).to_json.to_s, content_type: 'application/json'
    end
  end
end

include Dictionary

class DictionaryController < ApplicationController
  def translate_to_json
    render json: translate_b(params[:origin_lang], params[:word]).to_json.to_s, content_type: 'application/json'
  end

  def translate_with_backtrans
    translations = translate_b(params[:origin_lang], params[:word])
    result = {}
    result[:translation_result] = []
    translations[:translation_result].each do |word|
      result[:translation_result].push([word, translate_b(params[:target_lang], word)[:translation_result]])
    end
    render json: result.to_json.to_s, content_type: 'application/json'
  end
end

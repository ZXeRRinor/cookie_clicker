include Dictionary

class DictionaryController < ApplicationController
  def translate
    result = nil
    if params[:origin_lang] == 'mari'
      result = {translation_result: find_translations_by_mari(params[:word])}
    end
    if params[:origin_lang] == 'rus'
      result = {translation_result: find_words_by_rus(params[:word])}
    end
    render json: result.to_json.to_s, content_type: 'application/json'
  end
end

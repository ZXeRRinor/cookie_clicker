include Dictionary

class DictionaryController < ApplicationController
  def translate_to_json
    if params[:backtranslations] == 'true'
      render json: translate_with_backtrans(params[:origin_lang], params[:word]).to_json.to_s, content_type: 'application/json'
    else
      render json: translate_b(params[:origin_lang], params[:word]).to_json.to_s, content_type: 'application/json'
    end
  end

  def add_new_word
    values = params[:values]
    word, meanings, origin_lang = values[:word], values[:meanings], values[:origin_lang]
    meanings.delete_if {|elem| elem.blank?}
    meanings = meanings.join(', ')
    if origin_lang == 'mari'
      if Word.find_by(mari_word: word)
        return
      end
      version = current_user.word_versions.new(mari_word: word, rus: meanings)
      version.save
      version.subforums.new(title: word)
    else
      if Word.find_by(rus_word: word)
        return
      end
      version = current_user.word_versions.new(rus_word: word, mari: meanings)
      version.save
      version.subforums.new(title: word)
    end
  end

  def update_word
    values = params[:values]
    word, meanings, origin_lang, id = values[:word], values[:meanings], values[:origin_lang], values[:id]
    meanings.delete_if {|elem| elem.blank?}
    meanings = meanings.join(', ')
    if origin_lang == 'mari'
      vers_num = Word.find_by_mari(word).word_versions.last
      version = current_user.word_versions.new(mari_word: word, rus: meanings, version: ++vers_num)
      version.save
      version.subforums.new(title: word)
    else
      vers_num = Word.find_by_rus(word).word_versions.last
      version = current_user.word_versions.new(rus_word: word, mari: meanings, version: ++vers_num)
      version.save
      version.subforums.new(title: word)
    end
  end
end

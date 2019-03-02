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
    check_current_user do
      values = params[:values]
      word, meanings, origin_lang = values[:word], values[:meanings], values[:origin_lang]
      meanings.delete_if {|elem| elem.blank?}
      meanings = meanings.join(', ')
      if origin_lang == 'mari'
        if Word.find_by(mari_word: word)
          return
        end
        version = current_user.word_versions.new(mari_word: word, rus: meanings)
      else
        if Word.find_by(rus_word: word)
          return
        end
        version = current_user.word_versions.new(rus_word: word, mari: meanings)
      end
      version.save
      discussion = version.subforums.create(title: word)
      discussion.create_vote
    end
  end

  def update_word
    check_current_user do
      values = params[:values]
      word, meanings, origin_lang, id = values[:word], values[:meanings], values[:origin_lang], values[:id]
      meanings.delete_if {|elem| elem.blank?}
      meanings = meanings.join(', ')
      if origin_lang == 'mari'
        vers_num = Word.find_by_mari(word).word_versions.last
        version = current_user.word_versions.new(mari_word: word, rus: meanings, version: ++vers_num)
      else
        vers_num = Word.find_by_rus(word).word_versions.last
        version = current_user.word_versions.new(rus_word: word, mari: meanings, version: ++vers_num)
      end
      version.save
      discussion = version.subforums.create(title: word)
      discussion.create_vote
    end
  end
end

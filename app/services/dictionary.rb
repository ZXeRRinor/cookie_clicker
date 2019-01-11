module Dictionary
  def find_words_by_rus(rus_word)
    regexp = Regexp.new(rus_word.downcase)
    mari_words = []
    Word.find_each do |word|
      if regexp =~ word.rus
        mari_words.push({word: word.mari_word, id: word.id})
      end
    end
    mari_words
  end

  def find_words_by_rus_with_backtrans(rus_word)
    regexp = Regexp.new(rus_word.downcase)
    mari_words = []
    Word.find_each do |word|
      if regexp =~ word.rus
        mari_words.push({mari_word: word.mari_word, rus: word.rus, id: word.id})
      end
    end
    mari_words
  end

  def find_translations_by_mari(mari_word)
    regexp = Regexp.new(mari_word.downcase)
    translations = []
    Word.find_each do |word|
      if regexp =~ word.mari_word
        translations.push({word: word.rus, id: word.id})
      end
    end
    translations
  end

  def translate_b(origin_lang, word)
    result = nil
    if origin_lang == 'mari'
      result = {translation_result: find_translations_by_mari(word)}
    end
    if origin_lang == 'rus'
      result = {translation_result: find_words_by_rus(word)}
    end
    result
  end

  def translate_with_backtrans(origin_lang, word)
    result = nil
    if origin_lang == 'rus'
      result = {translation_result: find_words_by_rus_with_backtrans(word)}
    end
    result
  end
end
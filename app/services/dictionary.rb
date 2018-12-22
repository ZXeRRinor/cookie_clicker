module Dictionary
  def find_words_by_rus(rus_word)
    regexp = Regexp.new(rus_word)
    mari_words = []
    Word.find_each do |word|
      if regexp =~ word.rus
        mari_words.push(word.mari_word)
      end
    end
    mari_words
  end

  def find_translations_by_mari(mari_word)
    regexp = Regexp.new(mari_word)
    translations = []
    Word.find_each do |word|
      if regexp =~ word.mari_word
        translations.push(word.rus)
      end
    end
    translations
  end
end
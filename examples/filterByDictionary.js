/**
 *
 * Picks one language as a source and filters the other languages' keyword to
 * produce a list of possible multilingual keywords
 *
 * @param sl_keywords array of the keywords in the source language
 *
 **/
function FilterByDictionary(sl_keywords) {
  var all_langs = Loaders.GetLanguagesInCorpus(),
    target_langs = [],
    msg = new Utilities.Message(
      "Looking up wiktionary to filter the key word lists...",
      $(".container")
    ),
    bar = new Utilities.ProgressBar(msg.$box);
  filtered_by_dict_keywords = [];
  bar.Initialize(number_of_topicwords);
  msg.Show(999999);
  $.each(all_langs, function (idx, lang) {
    if (lang != source_lang) {
      target_langs.push(lang);
    }
  });
  var filtered = [];
  $.each(sl_keywords, function (idx, word) {
    //Search for translation for each of the key word in the language
    //chosen as source (default: english)
    console.log(word);
    params = {
      action: "GetTranslations",
      source_word: word.lemma,
      langs: target_langs,
    };
    filtered.push(
      $.getJSON("php/ajax/get_frequency_list.php", params, function (data) {
        bar.Progress();
      })
    );
  });
  return $.when.apply($, filtered).done(function () {
    ajax_args = arguments;
    msg.Destroy();
    for (var i = 0; i < ajax_args.length; i++) {
      //Iterating through EACH keyword in the source language
      var word = ajax_args[i][0],
        source_word = Object.keys(word)[0],
        has_at_least_one_translation = false,
        this_keyword = {};
      this_keyword[source_lang] = [source_word];
      $.each(target_langs, function (lidx, lang) {
        //Pick the translations for each target lang
        //and make sure at least one language has some.
        this_keyword[lang] = [];
        if (word[source_word][lang].length) {
          has_at_least_one_translation = true;
          this_keyword[lang] = word[source_word][lang];
        }
      });
      if (has_at_least_one_translation) {
        filtered_by_dict_keywords.push(this_keyword);
      } else {
        //If no translation found, remove this word from the ranked keywords
        sl_keywords_ranked.splice(i, 1);
      }
    }
    console.log(filtered_by_dict_keywords);
  });
}

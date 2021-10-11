library(jsonlite)
library(dplyr)
library(ngram)

path <- 'C:/Users/user/Documents/06_Weiterbildung/02_Full_Stack_DevOps/IC_NLP_React_App/src/backend/jsons/'
list_of_jsons <- c('texts', 'categories', 'concepts', 'entities', 'keywords', 'prices', 'sentiments', 'topics', 'wiki' )

entities <- fromJSON(txt = paste0(path, 'entities.json')) %>%
  dplyr::filter(mention_type %in% c('PROPER', 'COMMON')) %>% 
  dplyr::group_by(name) %>%
  dplyr::summarise(n = n()) 


keywords <- fromJSON(txt = paste0(path, 'keywords.json')) %>%
  dplyr::group_by(text) %>%
  dplyr::summarise(n = n()) 


concepts <- fromJSON(txt = paste0(path, 'concepts.json')) %>%
  dplyr::group_by(text) %>%
  dplyr::summarise(n = n()) 


topics <- fromJSON(txt = paste0(path, 'topics.json')) %>%
  dplyr::group_by(topics) %>%
  dplyr::summarise(n = n()) 


categories <- fromJSON(txt = paste0(path, 'categories.json')) %>%
  tidyr::separate(label, c('l1', 'l2', 'l3','l4', 'l5'), "/", extra = 'merge') %>%
  tidyr::pivot_longer(!c(texts_id, score), names_to = 'irrelevant', values_to = 'label') %>%
  tidyr::drop_na(label) %>%
  dplyr::filter(label != '') %>%
dplyr::group_by(label) %>%
  dplyr::summarise(n = n()) 



unique(input$type)
"ORGANIZATION"  "CONSUMER_GOOD" "PERSON"        "OTHER"         "LOCATION"      "WORK_OF_ART"   "EVENT"         NA              "NUMBER" 
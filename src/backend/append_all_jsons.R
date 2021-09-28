# All jsons to on working JS db
# install.packages("jsonlite")

library(jsonlite)
library(dplyr)
library(ngram)

path <- 'C:/Users/user/Documents/06_Weiterbildung/02_Full_Stack_DevOps/IC_NLP_TOOL/react_app/src/backend/jsons/'
list_of_jsons <- c('texts', 'categories', 'concepts', 'entities', 'keywords', 'prices', 'sentiments', 'topics', 'wiki' )

text_ids <- c(2, 6, 8, 12)

new_json <- list()

# l <- 'texts'
for (l in list_of_jsons){
  if (l == 'texts'){
    input <- fromJSON(txt = paste0(path, l,'.json')) %>%
      dplyr::filter(id %in% text_ids)
    for (i in 1 : length(input$body)){
      input$body[i] <- substring(input$body[i], 1, 3000)
    }
    for (i in 1 : length(input$body_in_english)){
      input$body_in_english[i] <- substring(input$body_in_english[i], 1, 3000)
    }
    new_json[[l]] <- input
    
  }else{
    input <- fromJSON(txt = paste0(path, l,'.json')) %>%
      dplyr::filter(texts_id %in% text_ids)
    new_json[[l]] <- input
  }
  
} 

# wordcount(new_json$texts$body[1], sep = " ", count.function = sum)
# tt <- substring(input$body[1], 1, 3000)
# wordcount(tt, sep = " ", count.function = sum)

jsonData <- toJSON(new_json, pretty = T)
json_to_js <- c("const db = \n [", jsonData, "];\n export default db")

writeLines(json_to_js, paste0(path, 'test_db.js'), useBytes = T)




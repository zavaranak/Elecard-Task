# Чеклист задач
# API: http://contest.elecard.ru/frontend_data/
-----------------------------------
## Второй чеклист - 28 июня
## Замечание 
### DONE -- Размещать scss стили рядом с компонентом к которому эти стили относятся.
### DONE -- Все файлы и папки относящиеся к redux размещаться в папке store
## Баги
### DONE -- Добавить сортировку радиобатонами (от меньшеного к большему)
### DONE -- В карточке отобразить все поля по которым выполняется сортировка.
### DONE -- Скрол бар не отображается при первой загрузки страницы
### DONE -- После выполнения действия удаления карточки остаться на данной странице
### DONE -- Крестик в модальном окне располагается в верхнем правом углу
### DONE -- Вид дерева похож на пример



## Первый чеклист 
### DONE -- Header/Footer (fixed position)
### DONE -- 2 view types of content: treeListView and cardListView
### DONE -- Radiobutton for switching between views
### DONE -- treeListView is not affected by state-updating action from cardListView

### DONE -- cardListView: Each card(assumed to be component) is able to close with 'x' button
### DONE -- cardListView: Closed cards are stored at localStorage 
### DONE -- cardListView: Cards sort by timestamp/name/size
### DONE -- cardListView: Cards filter by category
### DONE -- cardListView: Cards distribution to pages with navigation (nextpage/previouspage/firstpage/lastpage) 
### DONE -- cardListView: Notification at successful data fetching 
### DONE -- cardListView: Card shows information of field, which is applied for sorting
### DONE -- cardListView: Animation on DELETE action

### DONE -- treeListView: Nesting list (assumed nested by catergory)
### DONE -- treeListView: List item's info: thumbnail, timestamp, size

### DONE -- Timestamp in human-readable format
### DONE -- Click evnet shows fullsize Image

### DONE -- React
### DONE -- Redux Toolkit
### DONE -- JS,HTML, SCSS
### DONE -- Naming by BEM
### DONE -- UI design (MUI)
### DONE -- Minial request to server

## Run with:

    npm install
    npm run dev 

## Run docker container

    docker build -t imagename .

    docker run -p port:8080 imagename 

    or

    docker run -p port:8080  --name containername imagename


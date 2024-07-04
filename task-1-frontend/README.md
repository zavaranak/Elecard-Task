# Чеклист задач

# API: http://contest.elecard.ru/frontend_data/

---

# Четвертый чеклист - 04 июля

## Замечание

### DONE -- В карточках необходимо использовать gap:10px вместо margin отступов

### DONE -- заголовке необходимо использовать у дочернего элемента margin: auto, тогда он встанет по центру родителя. И тогда можно убрать лишние padding

### DONE -- Все цвета проекта необходимо вынести в палитру src/styles/palette.scss кроме того цвета необходимо разместить в :root https://developer.mozilla.org/ru/docs/Web/CSS/:root

            "Я видел хороший пример пользования map-get в SCSS для глобальных переменных, так что я вывел все переменные в папку style и достать их через метод map-get($var,"key"). Могу перейдти на метод ":root", если он является лучше вариантом"

### DONE -- Необходимо добавить в проект normalize https://www.npmjs.com/package/normalize.css

### DONE -- Стили относящиеся к Content.jsx нужно вынести в файл Content.scss (+ для Header и Footer)

## Баги

### DONE -- После удаления карточки перекидывает на первую страницу.

### DONE -- Внутренняя кнопка выходит за пределы карточки

### DONE -- Когда в дереве раскрывается стрелочка она становится красной

### DONE -- Несколько раз вызывает запрос на catalog.json.

### DONE -- Несколько раз вызывает запрос на catalog.json.

# Третий чеклист - 01 июля

## Замечание

### DONE -- Переписать стиль App.scss

            https://sass-lang.com/documentation/style-rules/parent-selector/#adding-suffixes

### DONE -- Модификаторы по БЭМ необходимо указывать через одно нижнее подчеркивание

            https://ru.bem.info/methodology/css/

### DONE -- При именовании css классов нужно использовать только Snake case.

### DONE -- Необходимо удалить из кода проекта лишние комментарии.

## Баги

### DONE -- filesize - размер файла (должен выводиться в человекочитаемом формате).

### DONE -- Порядок сортировки не нужно подписывать в карточке.

### DONE -- Thumbnail необходимо отображать одинакового размера для всех картинок.

### DONE -- При отображении картинки в модальном окне прокрутка не блокируется.

## Добавление

### Tree View: Кнопки скролла обратно к началу и определенным веткам дерева

### Tree View: Анимация при открытии списка дерева

### Card View: Анимация при event "hover" на карточку

# Второй чеклист - 28 июня

## Замечание

### DONE -- Размещать scss стили рядом с компонентом к которому эти стили относятся.

### DONE -- Все файлы и папки относящиеся к redux размещаться в папке store

## Баги

### DONE -- Добавить сортировку радиобатонами (от меньшеного к большему)

### !DONE -- В карточке отобразить все поля по которым выполняется сортировка.

### DONE -- Скрол бар не отображается при первой загрузки страницы

### DONE -- После выполнения действия удаления карточки остаться на данной странице

### DONE -- Крестик в модальном окне располагается в верхнем правом углу

### DONE -- Вид дерева похож на пример

# Первый чеклист

### DONE -- Header/Footer (fixed position)

### DONE -- 2 view types of content: treeListView and cardListView

### DONE -- Radiobutton for switching between views

### DONE -- treeListView is not affected by state-updating action from cardListView

### DONE -- cardListView: Each card(assumed to be component) is able to close with 'x' button

### DONE -- cardListView: Closed cards are stored at localStorage

### !DONE -- cardListView: Cards sort by timestamp/name/size

### DONE -- cardListView: Cards filter by category

### !DONE -- cardListView: Cards distribution to pages with navigation (nextpage/previouspage/firstpage/lastpage)

### DONE -- cardListView: Notification at successful data fetching

### !DONE -- cardListView: Card shows information of field, which is applied for sorting

### DONE -- cardListView: Animation on DELETE action

### !DONE -- treeListView: Nesting list (assumed nested by catergory)

### DONE -- treeListView: List item's info: thumbnail, timestamp, size

### DONE -- Timestamp in human-readable format

### DONE -- Click event shows fullsize Image

### DONE -- React

### DONE -- Redux Toolkit

### !DONE -- JS,HTML, SCSS

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

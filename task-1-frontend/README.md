# ЧЕКЛИСТ

    API: http://contest.elecard.ru/frontend_data/

## Седьмой чеклист - 25 июля

### Замечания:

- ✅ -- Unit test оформиляться польностью на английском.
- ✅ -- Установить атрибут data-testid компонетам тестирования.
- ✅ -- Искать компоненты тестирования по атрибуту data-testid.
- ✅ -- Тестировать все props и их влияние на компонент.
- ✅ -- Один ожидание резутата для каждого теста.
- ✅ -- Сохранить svg отдельным файлом.

### Задачи:

- ✅ -- Реализация скачивание картинок (ButtonDownload(url,name)).
- ✅ -- Unit test для скачивания картинок и ещё двух компонентов на выбор:

      -[ButtonDownload, TaskBar, Card]:
      -./src/components/ButtonDownload/**test**/ButtonDownload.test.jsx
      -./src/components/TaskBar/**test**/TaskBar.test.jsx
      -./src/components/CardView/Card/**test**/Card.test.jsx

## Шестой чеклист - 17 июля

### Задачи

- ✅ -- Максимально использовать теги HTML вместо MUI.
- ✅ -- Создать unit test для Alert и Modal (Jest и React Testing Library).
  Конфигурация тестирования:

            Зависимые (npm install --save-dev)

                @testing-library/jest-dom
                # для использования Matcher (toBeInTheDocument/toBeVisible/toHaveTextContent/...)

                jest-environment-jsdom
                # для создания среды тестирования

                @testing-library/react @testing-library/dom
                # для использования инструменотов(render, screen, fireEvent,..) и поиска элементов (getBy.., findBy...)

                jest
                # фремворк тестирования

                babel-jest @babel/preset-env @babel/preset-react
                # для перевода ES6/ES7/JSX на ES5

                identity-obj-proxy
                # для импорта модулей стиля

            Ноывые файлы

                .babelrc # добавить presets

                jest.config.json #config (testEnvironment,moduleNameMapper,transform,setupFilesAfterEnv)

            Обновленный файл

                .eslintrc.cjs # env{jest:true}

## Пятый чеклист - 16 июля

### Замечание

- ✅ -- Исправить стиль, переменные цвета включны в :root, nomarlize.css.

### Задачи

- ✅ -- Добавить darktheme.
- ✅ -- Превращать стиль в модуль.

## Четвертый чеклист - 04 июля

### Замечание

- ⚠️ -- В карточках использовать gap:10px вместо margin отступов.
- ⚠️ -- Использовать у дочернего элемента margin: auto, тогда он встанет по центру родителя.
- ⚠️ -- Все цвета проекта вынести в палитру src/styles/palette.scss.

            "Я видел хороший пример пользования методом map-get в SCSS для глобальных переменных,
            так что я вывел все переменные в папку styles и достать их через метод map-get($var,"key").
            Могу перейдти на метод ":root", если он является лучше вариантом"

- ⚠️ -- Добавить normalize.css
- ✅ -- Стили вынести в файл Content.scss (+ для Header и Footer)

### Баг

- ✅ -- Возникает множество warnings в момент, когда переключаешь вид страницы.

            Решить способом использавать "useSelector" с параметром "createSelector" вместо callback функции.

- ✅ -- Несколько раз вызывает запрос на catalog.json.

            Решить способом вызывать API только один раз при "mounting" Content.jsx.

- ✅ -- После удаления карточки перекидывает на первую страницу.

            Решить способом исправить "reducer cards" и случаи использования "useDispatch"

- ✅ -- Внутренняя кнопка выходит за пределы карточки.

            Решить способом исправить стиль Card.scss.

- ✅ -- Когда в дереве раскрывается стрелочка она становится красной.

            Решить способом исправить стиль Branch.scss

## Третий чеклист - 01 июля

### Замечание

- ✅ -- Переписать стиль App.scss

            https://sass-lang.com/documentation/style-rules/parent-selector/#adding-suffixes

- ✅ -- Модификаторы по БЭМ необходимо указывать через одно нижнее подчеркивание

            https://ru.bem.info/methodology/css/

- ✅ -- При именовании css классов нужно использовать только Snake case.
- ✅ -- Необходимо удалить из кода проекта лишние комментарии.

### Баги

- ✅ -- filesize - размер файла (должен выводиться в человекочитаемом формате).
- ✅ -- Порядок сортировки не нужно подписывать в карточке.
- ✅ -- Thumbnail необходимо отображать одинакового размера для всех картинок.
- ✅ -- При отображении картинки в модальном окне прокрутка не блокируется.

### Добавление

- ➕ Tree View: Кнопки скролла обратно к началу и определенным веткам дерева
- ➕ Tree View: Анимация при открытии списка дерева
- ➕ Card View: Анимация при event "hover" на карточку

## Второй чеклист - 28 июня

### Замечание

- ✅ -- Размещать scss стили рядом с компонентом к которому эти стили относятся.
- ✅ -- Все файлы и папки относящиеся к redux размещаться в папке store

### Баги

- ✅ -- Добавить сортировку радиобатонами (от меньшеного к большему)
- ⚠️ -- В карточке отобразить все поля по которым выполняется сортировка.
- ✅ -- Скрол бар не отображается при первой загрузки страницы.
- ✅ -- После выполнения действия удаления карточки остаться на данной странице.
- ✅ -- Крестик в модальном окне располагается в верхнем правом углу.
- ✅ -- Вид дерева похож на пример.

## Первый чеклист

- ✅ -- Header/Footer (fixed position).
- ✅ -- 2 view types of content: treeListView and cardListView.
- ✅ -- Radiobutton for switching between views.
- ✅ -- treeListView is not affected by state-updating action from cardListView.
- ✅ -- cardListView: Each card(assumed to be component) is able to close with 'x' button.
- ✅ -- cardListView: Closed cards are stored at localStorage.
- ⚠️ -- cardListView: Cards sort by timestamp/name/size.
- ✅ -- cardListView: Cards filter by category.
- ⚠️ -- cardListView: Cards distribution to pages with navigation (nextpage/previouspage/firstpage/lastpage).
- ✅ -- cardListView: Notification at successful data fetching.
- ⚠️ -- cardListView: Card shows information of field, which is applied for sorting.
- ✅ -- cardListView: Animation on DELETE action.
- ⚠️ -- treeListView: Nesting list (assumed nested by catergory).
- ✅ -- treeListView: List item's info: thumbnail, timestamp, size.
- ✅ -- Timestamp in human-readable format.
- ✅ -- Click event shows fullsize Image.
- ✅ -- React.
- ✅ -- Redux Toolkit.
- ⚠️ -- SCSS.
- ✅ -- HTML.
- ✅ -- JS.
- ✅ -- Naming by BEM.
- ✅ -- UI design (MUI).
- ✅ -- Minial request to server.

## Run with:

    npm install
    npm run dev

## Test with:

    npm test

## Run docker container

    docker build -t imagename

    docker run -p port:8080 imagename

    or

    docker run -p port:8080  --name containername imagename

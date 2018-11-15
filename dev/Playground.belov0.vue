<template>
  <r-app>
    <div class="playground">

      <r-smart-render
        onlyBrowser
        visibilityObserver
        elementWidth="100%"
        elementHeight="1000px"
        rootMargin="100px">
        <r-card class="button-margin">
        <r-card-title class="font-display-1">Кнопки</r-card-title>
        <r-card-text>

          <div>
            <!-- На белом фоне -->
            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Простые кнопки</h3>

              <div>
                <r-btn small ripple>Test</r-btn>
                <r-btn ripple>Test</r-btn>
                <r-btn large ripple>Test</r-btn>
              </div>

              <div>
                <r-btn round small ripple>Test</r-btn>
                <r-btn round ripple>Test</r-btn>
                <r-btn round large ripple>Test</r-btn>
              </div>

              <div>
                <r-btn small color="primary">Test</r-btn>
                <r-btn color="primary">Test</r-btn>
                <r-btn large color="primary">Test</r-btn>
              </div>

              <div>
                <r-btn small color="secondary">Test</r-btn>
                <r-btn color="secondary">Test</r-btn>
                <r-btn large color="secondary">Test</r-btn>
              </div>

              <div>
                <r-btn small color="accent">Test</r-btn>
                <r-btn color="accent">Test</r-btn>
                <r-btn large color="accent">Test</r-btn>
              </div>

              <div>
                <r-btn small color="white">Test</r-btn>
                <r-btn color="white">Test</r-btn>
                <r-btn large color="white">Test</r-btn>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Прозрачные кнопки</h3>

              <div>
                <r-btn outline small color="primary">Test</r-btn>
                <r-btn outline color="primary">Test</r-btn>
                <r-btn outline large color="primary">Test</r-btn>
              </div>

              <div>
                <r-btn outline small color="secondary">Test</r-btn>
                <r-btn outline color="secondary">Test</r-btn>
                <r-btn outline large color="secondary">Test</r-btn>
              </div>

              <div>
                <r-btn outline small color="accent">Test</r-btn>
                <r-btn outline color="accent">Test</r-btn>
                <r-btn outline large color="accent">Test</r-btn>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Кнопки c иконками</h3>

              <div>
                <r-btn small flat ripple>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn flat ripple>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn large flat ripple>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn outline small ripple>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn outline ripple>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn outline large ripple>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Кнопки с загрузкой</h3>

              <div>
                <r-btn loading small ripple color="primary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading ripple color="primary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading large ripple color="primary">
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn loading small ripple color="secondary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading ripple color="secondary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading large ripple color="secondary">
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn loading small ripple color="accent">
                  Добавить в избранное
                </r-btn>
                <r-btn loading ripple color="accent">
                  Добавить в избранное
                </r-btn>
                <r-btn loading large ripple color="accent">
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn loading small ripple>
                  Добавить в избранное
                </r-btn>
                <r-btn loading ripple>
                  Добавить в избранное
                </r-btn>
                <r-btn loading large ripple>
                  Добавить в избранное
                </r-btn>
              </div>
            </div>

            <div style="background: #fff;" class="component-group button-blocks">
              <h3 class="text_black">Блочные кнопки</h3>

              <div>
                <r-btn block>Блочная кнопка</r-btn>
              </div>

              <div>
                <r-btn block link>Блочная кнопка</r-btn>
              </div>

              <div>
                <r-btn block color="primary">Блочная кнопка</r-btn>
              </div>

              <div>
                <r-btn block color="secondary">Блочная кнопка</r-btn>
              </div>

              <div>
                <r-btn block>
                  <span>Блочная кнопка</span>
                  <md-chevron-right></md-chevron-right>
                </r-btn>
              </div>

              <div>
                <r-btn block link>
                  <span>Блочная кнопка</span>
                  <md-chevron-right></md-chevron-right>
                </r-btn>
              </div>

              <div>
                <r-btn block color="primary">
                  <span>Блочная кнопка</span>
                  <md-chevron-right></md-chevron-right>
                </r-btn>
              </div>

              <div>
                <r-btn block color="secondary">
                  <span>Блочная кнопка</span>
                  <md-chevron-right></md-chevron-right>
                </r-btn>
              </div>

            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Disabled кнопки</h3>

              <div>
                <r-btn disabled>Disabled кнопка</r-btn>
              </div>

            </div>
          </div>

          <div>
            <!-- На темном фоне -->
            <div style="background: #03012e;" class="component-group">
              <h3 class="text_white">Простые кнопки на темном фоне</h3>

              <div>
                <r-btn small color="primary">Test</r-btn>
                <r-btn color="primary">Test</r-btn>
                <r-btn large color="primary">Test</r-btn>
              </div>

              <div>
                <r-btn small color="secondary">Test</r-btn>
                <r-btn color="secondary">Test</r-btn>
                <r-btn large color="secondary">Test</r-btn>
              </div>

              <div>
                <r-btn small color="accent">Test</r-btn>
                <r-btn color="accent">Test</r-btn>
                <r-btn large color="accent">Test</r-btn>
              </div>

              <div>
                <r-btn small color="white">Test</r-btn>
                <r-btn color="white">Test</r-btn>
                <r-btn large color="white">Test</r-btn>
              </div>
            </div>

            <div style="background: #03012e;" class="component-group">
              <h3 class="text_white">Прозрачные кнопки на темном фоне</h3>

              <div>
                <r-btn outline small color="primary">Test</r-btn>
                <r-btn outline color="primary">Test</r-btn>
                <r-btn outline large color="primary">Test</r-btn>
              </div>

              <div>
                <r-btn outline small color="secondary">Test</r-btn>
                <r-btn outline color="secondary">Test</r-btn>
                <r-btn outline large color="secondary">Test</r-btn>
              </div>

              <div>
                <r-btn outline small color="accent">Test</r-btn>
                <r-btn outline color="accent">Test</r-btn>
                <r-btn outline large color="accent">Test</r-btn>
              </div>

              <div>
                <r-btn outline small color="white">Test</r-btn>
                <r-btn outline color="white">Test</r-btn>
                <r-btn outline large color="white">Test</r-btn>
              </div>
            </div>

            <div style="background: #03012e;" class="component-group">
              <h3 class="text_white">Кнопки на темном фоне c иконками</h3>

              <div>
                <r-btn small flat ripple color="white">
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn flat ripple color="white">
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn large flat ripple color="white">
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn outline small ripple color="white">
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn outline ripple color="white">
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn outline large ripple color="white">
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
              </div>
            </div>

            <div style="background: #03012e;" class="component-group">
              <h3 class="text_white">Кнопки с загрузкой на темном фоне</h3>

              <div>
                <r-btn loading small ripple color="primary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading ripple color="primary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading large ripple color="primary">
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn loading small ripple color="secondary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading ripple color="secondary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading large ripple color="secondary">
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn loading small ripple color="accent">
                  Добавить в избранное
                </r-btn>
                <r-btn loading ripple color="accent">
                  Добавить в избранное
                </r-btn>
                <r-btn loading large ripple color="accent">
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn loading small ripple color="white">
                  Добавить в избранное
                  <r-loading slot="loader" colorful></r-loading>
                </r-btn>
                <r-btn loading ripple color="white">
                  Добавить в избранное
                  <r-loading slot="loader" colorful></r-loading>
                </r-btn>
                <r-btn loading large ripple color="white">
                  Добавить в избранное
                  <r-loading slot="loader" colorful></r-loading>
                </r-btn>
              </div>

              <div>
                <r-btn loading outline small ripple color="primary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading outline ripple color="primary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading outline large ripple color="primary">
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn loading outline small ripple color="secondary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading outline ripple color="secondary">
                  Добавить в избранное
                </r-btn>
                <r-btn loading outline large ripple color="secondary">
                  Добавить в избранное
                </r-btn>
              </div>

              <div>
                <r-btn loading outline small ripple color="accent">
                  Добавить в избранное
                </r-btn>
                <r-btn loading outline ripple color="accent">
                  Добавить в избранное
                </r-btn>
                <r-btn loading outline large ripple color="accent">
                  Добавить в избранное
                </r-btn>
              </div>
            </div>

            <div style="background: #03012e;" class="component-group">
              <h3 class="text_white">Блочные кнопки на темном фоне</h3>

              <div>
                <r-btn block color="white">Блочная кнопка</r-btn>
              </div>

              <div>
                <r-btn block link>Блочная кнопка</r-btn>
              </div>

              <div>
                <r-btn block color="primary">Блочная кнопка</r-btn>
              </div>

              <div>
                <r-btn block color="secondary">Блочная кнопка</r-btn>
              </div>

              <div>
                <r-btn block color="white">
                  <span>Блочная кнопка</span>
                  <md-chevron-right></md-chevron-right>
                </r-btn>
              </div>

              <div>
                <r-btn block link>
                  <span>Блочная кнопка</span>
                  <md-chevron-right></md-chevron-right>
                </r-btn>
              </div>

              <div>
                <r-btn block color="primary">
                  <span>Блочная кнопка</span>
                  <md-chevron-right></md-chevron-right>
                </r-btn>
              </div>

              <div>
                <r-btn block color="secondary">
                  <span>Блочная кнопка</span>
                  <md-chevron-right></md-chevron-right>
                </r-btn>
              </div>

            </div>

            <div style="background: #03012e;" class="component-group">
              <h3 class="text_white">Disabled кнопки</h3>

              <div>
                <r-btn disabled color="white">Disabled кнопка</r-btn>
              </div>

            </div>
          </div>

        </r-card-text>
      </r-card>
      </r-smart-render>

      <r-smart-render
        onlyBrowser
        visibilityObserver
        elementWidth="100%"
        elementHeight="1000px"
        rootMargin="100px">
        <r-card>
          <r-card-title class="font-display-1">Анимация загрузки</r-card-title>
          <r-card-text>

            <div style="background: #fff;" class="component-group loading-group">
              <h3 class="text_black">Цветной</h3>

              <div>
                <r-loading small colorful></r-loading>
                <r-loading colorful></r-loading>
                <r-loading large colorful></r-loading>
              </div>
            </div>

            <div style="background: #03012e;" class="component-group loading-group">
              <h3 class="text_white">На темном фоне</h3>

              <div>
                <r-loading small></r-loading>
                <r-loading></r-loading>
                <r-loading large></r-loading>
              </div>
            </div>

          </r-card-text>
        </r-card>
      </r-smart-render>

      <r-smart-render
        onlyBrowser
        visibilityObserver
        elementWidth="100%"
        elementHeight="1000px"
        rootMargin="100px">
        <r-card>
          <r-card-title class="font-display-1">Ссылки и иконки</r-card-title>
          <r-card-text>
            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Ссылки с иконками</h3>

              <div>
                <r-btn icon small flat link ripple>
                  <md-favorite-border></md-favorite-border>
                </r-btn>
                <r-btn icon flat link ripple>
                  <md-favorite-border></md-favorite-border>
                </r-btn>
                <r-btn icon large flat link ripple>
                  <md-favorite-border></md-favorite-border>
                </r-btn>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Ссылки с иконками (закругленные)</h3>

              <div>
                <r-btn icon small flat link ripple round>
                  <md-favorite-border></md-favorite-border>
                </r-btn>
                <r-btn icon flat link ripple round>
                  <md-favorite-border></md-favorite-border>
                </r-btn>
                <r-btn icon large flat link ripple round>
                  <md-favorite-border></md-favorite-border>
                </r-btn>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Ссылки с иконками и текстом</h3>

              <div>
                <r-btn small flat link>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn flat link>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
                <r-btn large flat link>
                  <md-add-circle-outline></md-add-circle-outline>
                  Добавить в избранное
                </r-btn>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Ссылки без иконок</h3>

              <div>
                <r-btn small flat link>
                  Откликнуться
                </r-btn>
                <r-btn flat link>
                  Откликнуться
                </r-btn>
                <r-btn large flat link>
                  Откликнуться
                </r-btn>
              </div>
            </div>

          </r-card-text>
        </r-card>
      </r-smart-render>

      <r-smart-render
        onlyBrowser
        visibilityObserver
        elementWidth="100%"
        elementHeight="1000px"
        rootMargin="100px">
        <r-card>
          <r-card-title class="font-display-1">Группы компонентов</r-card-title>
          <r-card-text>

            <div style="background: #fff;" class="component-group button-groups">
              <h3 class="text_black">Одиночный выбор</h3>

              <h6 class="text_black" style="font-weight: bold">Средний размер</h6>

              <div>
                <r-btn-toggle mandatory v-model="toggle">
                  <r-btn activeClass="primary">
                    First button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Second button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Third button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle mandatory v-model="toggle">
                  <r-btn activeClass="secondary">
                    First button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Second button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Third button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle mandatory v-model="toggle">
                  <r-btn activeClass="accent">
                    First button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Second button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Third button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle mandatory v-model="toggle">
                  <r-btn activeClass="gray">
                    First button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Second button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Third button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <h6 class="text_black" style="font-weight: bold">Маленький размер</h6>

              <div>
                <r-btn-toggle mandatory v-model="toggle">
                  <r-btn small activeClass="primary">
                    First button
                  </r-btn>
                  <r-btn small activeClass="primary">
                    Second button
                  </r-btn>
                  <r-btn small activeClass="primary">
                    Third button
                  </r-btn>
                  <r-btn small activeClass="primary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle mandatory v-model="toggle">
                  <r-btn small activeClass="secondary">
                    First button
                  </r-btn>
                  <r-btn small activeClass="secondary">
                    Second button
                  </r-btn>
                  <r-btn small activeClass="secondary">
                    Third button
                  </r-btn>
                  <r-btn small activeClass="secondary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle mandatory v-model="toggle">
                  <r-btn small activeClass="accent">
                    First button
                  </r-btn>
                  <r-btn small activeClass="accent">
                    Second button
                  </r-btn>
                  <r-btn small activeClass="accent">
                    Third button
                  </r-btn>
                  <r-btn small activeClass="accent">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle mandatory v-model="toggle">
                  <r-btn small activeClass="gray">
                    First button
                  </r-btn>
                  <r-btn small activeClass="gray">
                    Second button
                  </r-btn>
                  <r-btn small activeClass="gray">
                    Third button
                  </r-btn>
                  <r-btn small activeClass="gray">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

            </div>

            <div style="background: #fff;" class="component-group button-groups">
              <h3 class="text_black">Множественный выбор</h3>

              <div>
                <r-btn-toggle multiple v-model="toggle2">
                  <r-btn activeClass="primary">
                    First button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Second button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Third button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2">
                  <r-btn activeClass="secondary">
                    First button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Second button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Third button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2">
                  <r-btn activeClass="accent">
                    First button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Second button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Third button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2">
                  <r-btn activeClass="gray">
                    First button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Second button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Third button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

            </div>

            <div style="background: #fff;" class="component-group button-groups">
              <h3 class="text_black">Группа кнопок на всю ширину</h3>

              <div>
                <r-btn-toggle multiple v-model="toggle2" autofit>
                  <r-btn activeClass="primary">
                    First button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Second button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Third button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2" autofit>
                  <r-btn activeClass="secondary">
                    First button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Second button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Third button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2" autofit>
                  <r-btn activeClass="accent">
                    First button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Second button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Third button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2" autofit>
                  <r-btn activeClass="gray">
                    First button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Second button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Third button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

            </div>

            <div style="background: #fff;" class="component-group button-groups">
              <h3 class="text_black">Группа кнопок с заданной шириной</h3>

              <div>
                <r-btn-toggle multiple v-model="toggle2" button-width="150px">
                  <r-btn activeClass="primary">
                    First button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Second button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Third button
                  </r-btn>
                  <r-btn activeClass="primary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2" button-width="170px">
                  <r-btn activeClass="secondary">
                    First button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Second button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Third button
                  </r-btn>
                  <r-btn activeClass="secondary">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2" button-width="200px">
                  <r-btn activeClass="accent">
                    First button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Second button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Third button
                  </r-btn>
                  <r-btn activeClass="accent">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

              <div>
                <r-btn-toggle multiple v-model="toggle2" button-width="230px">
                  <r-btn activeClass="gray">
                    First button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Second button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Third button
                  </r-btn>
                  <r-btn activeClass="gray">
                    Fourth button
                  </r-btn>
                </r-btn-toggle>
              </div>

            </div>

          </r-card-text>
        </r-card>
      </r-smart-render>

      <r-smart-render
        onlyBrowser
        visibilityObserver
        elementWidth="100%"
        elementHeight="1000px"
        rootMargin="100px">
        <r-card>
          <r-card-title class="font-display-1">Текстовые поля</r-card-title>
          <r-card-text>
            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Дефолтные поля</h3>

              <h6 class="text_black">С нативным плейсхолдером</h6>
              <div>
                <r-text-field v-model="textfield3" placeholder="Фамилия"></r-text-field>
                <r-text-field v-model="textfield3" placeholder="Фамилия с крестиком" clearable></r-text-field>
                <r-text-field v-model="textfield3" hint="Введите вашу фамилию" placeholder="Фамилия"></r-text-field>
              </div>

              <h6 class="text_black">С заголовком</h6>
              <div>
                <r-text-field v-model="textfield4" label="Фамилия"></r-text-field>
                <r-text-field v-model="textfield4" label="Фамилия с крестиком" clearable></r-text-field>
                <r-text-field v-model="textfield4" hint="Введите вашу фамилию" label="Фамилия"></r-text-field>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Поля с ошибкой</h3>

              <h6 class="text_black">С нативным плейсхолдером</h6>
              <div>
                <r-text-field v-model="textfield5" placeholder="Фамилия" error></r-text-field>
                <r-text-field v-model="textfield5" placeholder="Фамилия с крестиком" clearable error></r-text-field>
                <r-text-field v-model="textfield5" :rules="[v => !!v || 'Введите вашу фамилию']" placeholder="Фамилия" error></r-text-field>
              </div>

              <h6 class="text_black">С заголовком</h6>
              <div>
                <r-text-field v-model="textfield6" label="Фамилия" error></r-text-field>
                <r-text-field v-model="textfield6" label="Фамилия с крестиком" clearable error></r-text-field>
                <r-text-field v-model="textfield6" :rules="[v => !!v || 'Введите вашу фамилию']" label="Фамилия" error></r-text-field>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Disabled</h3>

              <div>
                <r-text-field disabled v-model="textfield7" placeholder="Фамилия"></r-text-field>
                <r-text-field disabled v-model="textfield8" label="Фамилия"></r-text-field>
              </div>
            </div>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Readonly</h3>

              <div>
                <r-text-field readonly v-model="textfield7" placeholder="Фамилия"></r-text-field>
                <r-text-field readonly v-model="textfield8" label="Фамилия"></r-text-field>
              </div>
            </div>


            <div style="background: #03012e;" class="component-group">
              <h3 class="text_white">Поля на темном фоне</h3>

              <h6 class="text_white">С нативным плейсхолдером</h6>
              <div>
                <r-text-field color="white" v-model="textfield3" placeholder="Фамилия"></r-text-field>
                <r-text-field color="white" v-model="textfield3" placeholder="Фамилия с крестиком" clearable></r-text-field>
                <r-text-field color="white" v-model="textfield3" hint="Введите вашу фамилию" placeholder="Фамилия"></r-text-field>
              </div>

              <h6 class="text_white">С заголовком</h6>
              <div>
                <r-text-field color="white" v-model="textfield4" label="Фамилия"></r-text-field>
                <r-text-field color="white" v-model="textfield4" label="Фамилия с крестиком" clearable></r-text-field>
                <r-text-field color="white" v-model="textfield4" hint="Введите вашу фамилию" label="Фамилия"></r-text-field>
              </div>
            </div>

            <div style="background: #f2412f;" class="component-group">
              <h3 class="text_white">Поля на красном фоне</h3>

              <h6 class="text_white">С нативным плейсхолдером</h6>
              <div>
                <r-text-field color="white" v-model="textfield3" placeholder="Фамилия"></r-text-field>
                <r-text-field color="white" v-model="textfield3" placeholder="Фамилия с крестиком" clearable></r-text-field>
                <r-text-field color="white" v-model="textfield3" hint="Введите вашу фамилию" placeholder="Фамилия"></r-text-field>
              </div>

              <h6 class="text_white">С заголовком</h6>
              <div>
                <r-text-field color="white" v-model="textfield4" label="Фамилия"></r-text-field>
                <r-text-field color="white" v-model="textfield4" label="Фамилия с крестиком" clearable></r-text-field>
                <r-text-field color="white" v-model="textfield4" hint="Введите вашу фамилию" label="Фамилия"></r-text-field>
              </div>
            </div>

          </r-card-text>
        </r-card>
      </r-smart-render>




      <div style="display: none;">
        <r-smart-render
          onlyBrowser
          visibilityObserver
          elementWidth="100%"
          elementHeight="1000px"
          rootMargin="100px">
          <r-card>
            <r-card-title class="font-display-1">Диалоги</r-card-title>
            <r-card-text>

              <r-btn ripple outline color="primary" @click="openDialog('left')">
                Открыть диалог (слева)
              </r-btn>

              <r-btn ripple outline color="primary" @click="openDialog('right')">
                <md-favorite-border class="icon primary"></md-favorite-border>
                Открыть диалог (справа)
              </r-btn>

              <r-btn ripple outline color="primary" @click="openDialog()">
                <md-favorite-border class="icon primary"></md-favorite-border>
                Открыть диалог (обычный)
              </r-btn>

              <r-dialog :transition="dialogTransition"
                        :fullscreen="$rabotify.breakpoint.xsAndDown"
                        scrollable
                        lazy
                        :attachRight="dialogDir === 'right'"
                        :attachLeft="dialogDir === 'left'"
                        :fullHeight="dialogDir === 'right' || dialogDir === 'left'"
                        v-model="dialog"
                        maxWidth="590">
                <r-dialog-card toolbarLight toolbarShadow @close="dialog = false">
                  <div slot="title">Редактирование резюме</div>

                  <r-mobile-header slot="header" centeredContent>
                    <div slot="leftAction">
                      <r-btn icon flat round large color="primary" ripple @click="dialog = false">
                        <md-arrow-back></md-arrow-back>
                      </r-btn>
                    </div>
                    <div slot="content" class="vacancies-page__filters-title">
                      <h4>Фильтры</h4>
                    </div>
                    <div slot="rightAction" style="width: 60px;"></div>
                  </r-mobile-header>

                  <r-dialog :transition="transition"
                            :fullscreen="$rabotify.breakpoint.xsAndDown"
                            v-model="dialog2"
                            max-width="290">
                    <r-btn ripple color="primary" slot="activator">
                      <md-favorite-border class="icon white icon_small"></md-favorite-border>
                      Открыть диалог 2
                    </r-btn>

                    <r-dialog-card toolbarLight>
                      <div slot="title">Сохранено!</div>

                      <r-btn slot="close" ripple icon flat round color="secondary" @click.native.stop="dialog2 = false">
                        <md-close class="icon"></md-close>
                      </r-btn>

                      <div slot="actions">
                        <r-btn ripple color="primary"  @click.native.stop="dialog3 = true">Открыть диалог 3</r-btn>
                      </div>

                      <p>Ваш номер: 234435345</p>
                      <r-select
                        v-bind:items="items"
                        item-value="id"
                        item-text="name"
                        v-model="selectMultiple2"
                        :rules="selectRules"
                        label="Select"
                        multiple
                        autocomplete
                        preserveDetails
                        required
                      ></r-select>

                      <r-text-field v-model="textfield1"></r-text-field>

                      <r-dialog :transition="transition"
                                :fullscreen="$rabotify.breakpoint.xsAndDown"
                                :hideOverlay="false"
                                v-model="dialog3"
                                max-width="490">
                        <r-dialog-card toolbarColor="secondary">
                          <div slot="title">Диалог</div>

                          <r-btn slot="close" ripple icon flat round color="white" @click.native.stop="dialog3 = false">
                            <md-close class="icon"></md-close>
                          </r-btn>

                          <r-dialog :transition="transition"
                                    :fullscreen="$rabotify.breakpoint.xsAndDown"
                                    v-model="dialog4"
                                    max-width="390">
                            <r-btn ripple large outline color="primary" slot="activator">
                              <md-favorite-border class="icon primary"></md-favorite-border>
                              Диалог
                            </r-btn>
                            <r-dialog-card toolbarLight>
                              <div slot="title">Сохранено!</div>

                              <r-btn slot="close" ripple icon flat round color="secondary" @click.native.stop="dialog4 = false">
                                <md-close class="icon"></md-close>
                              </r-btn>

                              <p>Ваш номер: 234435345</p>
                            </r-dialog-card>
                          </r-dialog>

                          <div slot="actions">
                            <r-btn flat color="secondary" @click.native.stop="dialog3 = false">Отмена</r-btn>
                            <r-btn color="primary" @click.native.stop="dialog3 = false">Готово</r-btn>
                          </div>
                        </r-dialog-card>
                      </r-dialog>
                    </r-dialog-card>
                  </r-dialog>

                  <template slot="actions">
                    <r-btn flat color="secondary" @click.native.stop="dialog = false">Отмена</r-btn>
                    <r-btn color="primary" @click.native.stop="dialog = false">Готово</r-btn>
                  </template>

                </r-dialog-card>
              </r-dialog>

            </r-card-text>
          </r-card>
        </r-smart-render>

        <r-smart-render
          onlyBrowser
          visibilityObserver
          elementWidth="100%"
          elementHeight="1000px"
          rootMargin="100px">
          <r-card>
            <r-card-title class="font-display-1">Текстовое поле</r-card-title>
            <r-card-text>
              <r-text-field
                v-model="textfield1"
                color="gray-dark"
                label="Имя"></r-text-field>

              <r-text-field
                v-model="textfield1"
                color="gray-dark"
                placeholder="Имя"></r-text-field>

              <r-text-field
                v-model="textfield1"
                label="Имя"
                color="secondary"></r-text-field>

              <r-text-field
                v-model="textfield1"
                placeholder="Имя"
                color="secondary"></r-text-field>

              <r-text-field
                v-model="textfield1"
                label="Имя"
                color="success"></r-text-field>

              <r-text-field
                v-model="textfield1"
                placeholder="Имя"
                color="success"></r-text-field>

              <r-text-field
                v-model="textfield1"
                label="Имя"
              ></r-text-field>

              <r-text-field
                v-model="textfield1"
                placeholder="Имя"
              ></r-text-field>

              <!--<r-scale-transition-group tag="div">-->
              <!--<div style="display: inline-block" v-for="(item, index) in textfield1.split('')" :key="item" v-text="item"></div>-->
              <!--</r-scale-transition-group>-->

              <r-text-field
                name="input-1-3"
                label="Фамилия"
                hint="Подсказка"
                v-model="textfield1"
                :rules="[v => v.length <= 25 || 'Максимум 25 символов', v => v.length >= 5 || 'Минимум 5 символов']"
                :counter="25"></r-text-field>

              <r-text-field
                name="input-1-3"
                placeholder="Фамилия"
                label="Фамилия"
                hint="Подсказка"
                v-model="textfield1"
                :rules="[v => v.length <= 25 || 'Максимум 25 символов', v => v.length >= 5 || 'Минимум 5 символов']"
                :counter="25"></r-text-field>

              <r-text-field
                required
                type="month"
                :rules="[v => !!v || 'Введите дату']"
                hint="Дата рождения"
                persistentHint
                v-model="textfield1">
                <span slot="label">Введите дату</span>
              </r-text-field>

              <r-text-field

                textarea
                autoGrow
                required
                :rules="[v => v.length <= 25 || 'Максимум 25 символов', v => v.length >= 5 || 'Минимум 5 символов']"
                :counter="25"
                clearable
                noResize
                v-model="textfield3">
                <div slot="label">
                  Введите текст
                </div>
              </r-text-field>

              <r-text-field
                v-model="textfield3"
                placeholder="Имя"
                :rules="[v => v.length <= 25 || 'Максимум 25 символов', v => v.length >= 5 || 'Минимум 5 символов']"
                color="secondary"
                clearable></r-text-field>

              <r-card>
                <r-card-text>
                  <r-text-field label="Маска поля" v-model="mask"></r-text-field>
                  <r-text-field label="Поле ввода" :mask="mask" v-model="textfield2"></r-text-field>
                </r-card-text>
              </r-card>
            </r-card-text>
          </r-card>
        </r-smart-render>

        <r-smart-render
          onlyBrowser
          visibilityObserver
          elementWidth="100%"
          elementHeight="1000px"
          rootMargin="100px">
          <r-card>
            <r-card-title class="font-display-1">Чекбокс</r-card-title>
            <r-card-text>
              <r-checkbox ripple small color="primary" :label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1"></r-checkbox>
              <r-checkbox ripple color="primary" :label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1"></r-checkbox>
              <r-checkbox ripple large color="primary" :label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1"></r-checkbox>

              <r-checkbox ripple small color="secondary" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>
              <r-checkbox ripple color="secondary" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>
              <r-checkbox ripple large color="secondary" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>

              <r-checkbox ripple small color="success" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>
              <r-checkbox ripple color="success" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>
              <r-checkbox ripple large color="success" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>

              <r-checkbox ripple small  :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>
              <r-checkbox ripple  :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>
              <r-checkbox ripple large  :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>

              <r-checkbox ripple small color="error" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>
              <r-checkbox ripple color="error" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>
              <r-checkbox ripple large color="error" :label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2"></r-checkbox>

              <r-checkbox ripple small color="gray-dark" :label="`Checkbox 3: ${ex3.toString()}`" v-model="ex3"></r-checkbox>
              <r-checkbox ripple color="gray-dark" :label="`Checkbox 3: ${ex3.toString()}`" v-model="ex3"></r-checkbox>
              <r-checkbox ripple large color="gray-dark" :label="`Checkbox 3: ${ex3.toString()}`" v-model="ex3"></r-checkbox>
            </r-card-text>
          </r-card>
        </r-smart-render>

        <r-smart-render
          onlyBrowser
          visibilityObserver
          elementWidth="100%"
          elementHeight="1000px"
          rootMargin="100px">
          <r-card>
            <r-card-title class="font-display-1">Радио элемент</r-card-title>
            <r-card-text>
              <r-radio-group v-model="ex4" :mandatory="false">
                <r-radio disabled color="secondary" ripple label="Radio 1" value="radio-1"></r-radio>
                <r-radio color="primary" ripple label="Radio 2" value="radio-2"></r-radio>
              </r-radio-group>

              <r-radio-group v-model="ex14">
                <r-radio color="primary" ripple label="Radio 2" value="radio-1"></r-radio>
                <r-radio color="secondary" ripple label="Radio 1" value="radio-2"></r-radio>
                <r-radio color="success" ripple label="Radio 3" value="radio-3"></r-radio>
                <r-radio color="error" ripple label="Radio 4" value="radio-4"></r-radio>
                <r-radio  ripple label="Radio 5" value="radio-5"></r-radio>
              </r-radio-group>
            </r-card-text>
          </r-card>
        </r-smart-render>

        <r-smart-render
          onlyBrowser
          visibilityObserver
          elementWidth="100%"
          elementHeight="1000px"
          rootMargin="100px">
          <r-card>
            <r-card-title class="font-display-1">Переключатель</r-card-title>
            <r-card-text>
              <r-switch ripple small disabled color="primary" label="John" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple disabled color="primary" label="John" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple large disabled color="primary" label="John" v-model="ex5" value="Jacob"></r-switch>

              <r-switch ripple small color="secondary" label="Jacob" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple color="secondary" label="Jacob" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple large color="secondary" label="Jacob" v-model="ex5" value="Jacob"></r-switch>

              <r-switch ripple small color="success" label="Jacob" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple color="success" label="Jacob" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple large color="success" label="Jacob" v-model="ex5" value="Jacob"></r-switch>

              <r-switch ripple small color="error" label="Jacob" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple color="error" label="Jacob" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple large color="error" label="Jacob" v-model="ex5" value="Jacob"></r-switch>

              <r-switch ripple small  label="Jacob" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple  label="Jacob" v-model="ex5" value="Jacob"></r-switch>
              <r-switch ripple large  label="Jacob" v-model="ex5" value="Jacob"></r-switch>
            </r-card-text>
          </r-card>
        </r-smart-render>

        <r-smart-render
          onlyBrowser
          visibilityObserver
          elementWidth="100%"
          elementHeight="1000px"
          rootMargin="100px">
          <r-card>
            <r-card-title class="font-display-1">Контейнер</r-card-title>
            <r-card-text>
              <r-card color="secondary">
                <r-card-media height="60px">
                  <r-card-title class="text_white">Title</r-card-title>
                </r-card-media>
                <r-card-text class="text_white">Text content</r-card-text>
                <r-card-actions>
                  <r-btn ripple flat color="white" @click.native.stop="dialog = true">Отмена</r-btn>
                  <r-btn ripple color="primary" @click.native.stop="dialog = true">Готово</r-btn>
                </r-card-actions>
              </r-card>
              <div style="height: 20px;"></div>
              <r-card>
                <r-card-title class="text_secondary">Title</r-card-title>
                <r-card-text class="text_secondary">Text content</r-card-text>
                <r-card-actions>
                  <r-btn ripple flat outline color="primary" @click.native.stop="dialog = true">Отмена</r-btn>
                  <r-btn ripple color="primary" @click.native.stop="dialog = true">Готово</r-btn>
                </r-card-actions>
              </r-card>
            </r-card-text>
          </r-card>
        </r-smart-render>

        <r-smart-render
          onlyBrowser
          visibilityObserver
          elementWidth="100%"
          elementHeight="1000px"
          rootMargin="100px">
          <r-card>
            <r-card-title class="font-display-1">Формы</r-card-title>
            <r-card-text>
              <r-form v-model="valid" ref="form">
                <r-select
                  v-bind:items="items"
                  item-value="id"
                  item-text="name"
                  v-model="selectMultiple2"
                  :rules="selectRules"
                  label="Select"
                  multiple
                  autocomplete
                  preserveDetails
                  required
                ></r-select>
                <r-checkbox
                  ripple

                  label="Вы согласны отдать все свои деньги мне?"
                  staticLabel
                  v-model="formEx1"
                  :rules="checkboxRules"
                  required
                ></r-checkbox>
                <r-switch
                  ripple

                  label="Вы согласны отдать все свои деньги мне?"
                  staticLabel
                  v-model="formEx2"
                  :rules="switchRules"
                  required
                ></r-switch>
                <r-radio-group v-model="formEx3"
                               :rules="radioRules"
                               required
                               :mandatory="false">
                  <r-radio ripple  ripple label="Отдать все деньги" value="radio-1"></r-radio>
                  <r-radio ripple color="secondary" ripple label="Не отдавать" value="radio-2"></r-radio>
                </r-radio-group>

                <r-text-field
                  color="secondary"
                  :rules="[v => v.length <= 25 || 'Максимум 25 символов', v => v.length >= 5 || 'Минимум 5 символов']"
                  clearable
                  detailsContainer="auto"
                  placeholder="Введите текст"
                  optional
                  small
                  v-model="textfield1">
                  <!--<span slot="label">Введите текст</span>-->
                  <template slot="prependIcon">
                    <md-favorite-border></md-favorite-border>
                  </template>
                </r-text-field>

                <r-text-field
                  color="secondary"
                  textarea
                  autoGrow
                  detailsContainer="auto"
                  required
                  :rules="[v => v.length <= 25 || 'Максимум 25 символов', v => v.length >= 5 || 'Минимум 5 символов']"
                  clearable
                  noResize
                  v-model="textfield33">
                  <span slot="label">Введите текст 2</span>
                </r-text-field>

                <r-btn
                  @click="submit"

                  :disabled="!valid">
                  Отправить
                </r-btn>
                <r-btn @click="clear">Очистить</r-btn>
              </r-form>
            </r-card-text>
          </r-card>
        </r-smart-render>
      </div>
    </div>
  </r-app>
</template>

<script>
  import MdFavoriteBorder from 'md-svg-vue/dist/action/MdFavoriteBorder';
  import MdClose from 'md-svg-vue/dist/navigation/MdClose';
  import MdAddCircleOutline from 'md-svg-vue/dist/content/MdAddCircleOutline.vue';
  import MdArrowBack from 'md-svg-vue/dist/navigation/MdArrowBack';
  import MdChevronRight from 'md-svg-vue/dist/navigation/MdChevronRight';

  export default {
    components: {
      MdFavoriteBorder,
      MdClose,
      MdAddCircleOutline,
      MdArrowBack,
      MdChevronRight
    },
    data: () => ({
      dialog: false,
      dialogDir: 'right',
      dialog2: false,
      dialog3: false,
      dialog4: false,
      loading: false,
      disabled: false,
      toggle: [],
      toggle2: [],

      text: '',
      mask: 'credit-card',

      textfield1: '',
      textfield2: '',
      textfield3: '',
      textfield4: '',
      textfield5: '',
      textfield6: '',
      textfield7: '',
      textfield8: 'С текстом',
      textfield9: '',
      textfield10: '',
      textfield11: '',
      textfield12: '',
      textfield33: '',

      ex1: false,
      ex2: true,
      ex3: false,

      ex4: '',
      ex14: '',

      ex5: false,

      valid: true,
      formEx1: false,
      formEx2: false,
      formEx3: 'radio-2',
      selectRules: [
        v => v.length > 0 || 'Вы должны согласиться отдать мне деньги! (select)'
      ],
      checkboxRules: [
        v => !!v || 'Вы должны согласиться отдать мне деньги!'
      ],
      switchRules: [
        v => !!v || 'Вы должны согласиться отдать мне деньги!'
      ],
      radioRules: [
        v => v === 'radio-1' || 'Вы должны согласиться отдать мне деньги!'
      ],

      select: null,
      select2: null,
      select3: [1,3,5,7,9,11,100,200],
      selectMultiple: [],
      selectMultiple2: [],

      MdClose,

      demoText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
    }),
    watch: {
      toggle (val) {
        console.log(val);
      }
    },
    methods: {
      getItems (repeat = 1) {
        let base = this.demoText.split(/\s+/);
        let result = [];
        function* autoIncrement(isStickerGenerator = false) {
          let _id = 0;
          for (;;) {
            if (_id >= 2979 && isStickerGenerator) {
              _id = 0;
            }
            yield ++_id;
          }
        }
        let id = autoIncrement();
        let stickerId = autoIncrement(true);

        for (let i = 0; i < repeat; ++i) {
          result.push(...base.map(name => {
            return {
              id: id.next().value,
              stickerId: stickerId.next().value,
              name
            };
          }));
        }
        result.push({
          id: id.next().value,
          stickerId: stickerId.next().value,
          name: 'Саша'
        });
        console.log(result);
        return result;
      },
      toggleLoading() {
        this.loading = !this.loading;
        if (this.loading) {
          this.disabled = true;
        }
      },
      openDialog (dir) {
        this.dialogDir = dir;
        this.dialog = true;
      },
      submit () {
        if (this.$refs.form.validate()) {
          console.log('Form:', {
            checkbox: this.checkbox
          });
        }
      },
      clear () {
        this.$refs.form.reset();
      },
      test (item) {
        console.log(item);
      }
    },
    computed: {
      transition() {
        return this.$rabotify.breakpoint.xsAndDown ?
          'scale-transition' : 'dialog-transition';
      },
      dialogTransition () {
        if (this.dialogDir === 'left') {
          return 'slide-x-transition';
        } else if (this.dialogDir === 'right') {
          return 'slide-x-reverse-transition';
        } else {
          return this.transition;
        }
      },
      items () {
        return this.getItems();
      },
      itemsLarge () {
        return this.getItems();
      }
    }
  }
</script>

<style lang="scss">
  .playground {
    > .card {
      margin: 12px;
    }

    &:after {
      height: 300px;
      content: '';
      width: 100%;
      display: block;
    }

    .input-group {
      margin: 18px 0 0;
    }

    .r-btn {
      margin: {
        top: 4px;
        bottom: 4px;
      };
    }

    .button-margin {
      .r-btn {
        margin: {
          top: 16px;
          bottom: 16px;
        };
      }
    }

    .component-group {
      padding: 16px;
      margin-bottom: 16px;
      background: #fff;
    }

    .button-blocks {
      .r-btn {
        margin: 0;
      }
    }

    .button-groups {
      h3 {
        margin-bottom: 16px;
      }

      h6 {
        margin-top: 32px;
      }

      .r-btn-toggle {
        margin-bottom: 16px !important;
      }
    }

    .loading-group {
      .loading {
        margin-bottom: 8px;
      }
    }

    h3 {
      margin-bottom: 16px;
    }

    h6 {
      margin-top: 32px;
    }
  }

  .demo {
    &-circle {
      width: 24px;
      height: 24px;
      background: #8f9aae;
      display: inline-block;
      margin-right: 12px;
      vertical-align: middle;
      border-radius: 50px;
      background: url('https://vk.com/images/stickers/3805/128.png') no-repeat center center/contain;
      background-size: contain;
    }

    &-text {
      display: inline-block;
      vertical-align: middle;
    }

    &__scroller {
      .virtual-scroller {
        max-height: 400px;
      }
    }
  }
</style>

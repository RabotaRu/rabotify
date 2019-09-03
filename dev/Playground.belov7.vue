<template>
  <r-app>
    <div class="playground page7">

      <r-card>
        <r-card-title class="font-display-1">RRichTextField</r-card-title>
        <r-card-text>

          <!-- bidirectional data binding -->
          <r-rich-text-field v-model="content"
                        ref="myQuillEditor"
                        :options="editorOptions">
          </r-rich-text-field>

        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  import MdFavoriteBorder from '@rabota/md-svg-vue/dist/action/MdFavoriteBorder';
  import MdClose from '@rabota/md-svg-vue/dist/navigation/MdClose';
  import MdFormatBold from '@rabota/md-svg-vue/dist/editor/MdFormatBold.vue';

  export default {
    components: {
      MdFormatBold,
      MdFavoriteBorder,
      MdClose
    },

    data: () => ({
      ex1: '',
      ex2: '',
      ex3: '',
      ex4: '',
      ex5: '',
      ex6: '',
      ex7: '',
      ex8: '',
      ex9: '',
      ex10: '',
      ex11: '',
      ex12: '',
      ex13: '',
      ex14: '',
      ex15: '',
      ex16: '',
      ex17: '',
      ex18: '',
      ex19: '',

      lorem: 'Lorem ipsum dolor sit amet, mel at clita quando. ' +
      'Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. ' +
      'Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',

      content: '<h3><strong>Требования:</strong></h3><ul><li>Опыт работы не обязателен!</li><li>Образование от среднего, опыт работы поваром приветствуется.</li><li>Коммуникабельность, энергичность, доброжелательность.</li></ul><p><br></p><h3><strong>Должностные обязанности:</strong></h3><ul><li>Работа в торговых точках, приготовление блюд (блины, каши, супы, салаты, и т.д.).</li><li>Расчёты с покупателями на кассе.</li></ul><p><br></p><h3><strong>Условия работы и компенсации:</strong></h3><ul><li>Заработная плата от 36 500 до 55 000 руб., стабильная работа гарантирована.</li><li>График работы 2/2, 3/3, вахта, с 9.00 - 22.00 или с 10.00 - 23.00.</li><li>Работа рядом с домом (распределение с учётом места проживания).</li><li>Карьерный рост (администратор).</li><li>Стипендия за обучение - 10 000 руб.</li><li>Компенсация стоимости проживания в общежитии</li><li>Бесплатная униформа, питание.</li><li>Оплата проезда в первый месяц работы.</li><li>Оформление строго по ТК РФ.</li></ul><p><br></p>',
      editorOptions: {
        placeholder: 'Оформление вакансии',
        theme: 'snow'
      }
    })
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
  }
</style>

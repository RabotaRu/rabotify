<template>
  <r-app>
    <div class="playground page6">

      <r-card>
        <r-card-title class="font-display-1">RTextField: Cleave.js</r-card-title>
        <r-card-text>

          <r-text-field placeholder="Enter a text" v-model="ex1"></r-text-field>

          <r-text-field placeholder="Enter a credit card" cleaveMask :cleaveOptions="cleaveOptions" v-model="ex1" clearable></r-text-field>
          <r-text-field placeholder="Enter a credit card" cleaveMask :cleaveOptions="cleaveOptions2" v-model="ex2" clearable></r-text-field>

          <r-text-field placeholder="Enter a phone" cleaveMask :cleaveOptions="cleaveOptionsPhone" v-model="ex3"></r-text-field>

          <r-text-field placeholder="Enter a date" cleaveMask :cleaveOptions="cleaveOptionsDate" v-model="ex4"></r-text-field>

          <r-text-field placeholder="Enter a number" cleaveMask :cleaveOptions="cleaveOptionsNumeral1" v-model="ex5"></r-text-field>
          <r-text-field placeholder="Enter a number" cleaveMask :cleaveOptions="cleaveOptionsNumeral2" v-model="ex6"></r-text-field>
          <r-text-field placeholder="Enter a number" cleaveMask :cleaveOptions="cleaveOptionsNumeral3" v-model="ex7"></r-text-field>
          <r-text-field placeholder="Enter a number" cleaveMask :cleaveOptions="cleaveOptionsNumeral4" v-model="ex8"></r-text-field>
          <r-text-field placeholder="Enter a number" cleaveMask :cleaveOptions="cleaveOptionsNumeral5" v-model="ex9"></r-text-field>

          <r-text-field placeholder="Enter a text" cleaveMask :cleaveOptions="cleaveOptionsBlocks1" v-model="ex10"></r-text-field>
          <r-text-field placeholder="Enter a text" cleaveMask :cleaveOptions="cleaveOptionsBlocks2" v-model="ex11"></r-text-field>
          <r-text-field placeholder="Enter a text" cleaveMask :cleaveOptions="cleaveOptionsBlocks3" v-model="ex12"></r-text-field>
          <r-text-field placeholder="Enter a text" cleaveMask :cleaveOptions="cleaveOptionsBlocks4" v-model="ex13"></r-text-field>
          <r-text-field placeholder="Enter a text" cleaveMask :cleaveOptions="cleaveOptionsBlocks5" v-model="ex14"></r-text-field>
          <r-text-field placeholder="Enter a text" cleaveMask :cleaveOptions="cleaveOptionsBlocks6" v-model="ex15"></r-text-field>

        </r-card-text>
      </r-card>

      <r-card>
        <r-card-title class="font-display-1">Пример: Введите данные карты</r-card-title>
        <r-card-text>

          <r-card style="max-width: 500px; margin: auto">
            <r-card-title v-if="$refs.card">{{ $refs.card.cleave.properties.creditCardType }}</r-card-title>
            <r-card-text>
              <r-layout column>
                <r-flex>
                  <r-text-field ref="card" placeholder="Card number" cleaveMask :cleaveOptions="cleaveOptions" v-model="ex16" clearable></r-text-field>
                </r-flex>
                <r-layout row>
                  <r-flex xs-12 xs-and-up-3>
                    <r-text-field placeholder="02/2022" cleaveMask :cleaveOptions="cleaveOptionsDate2" v-model="ex17" clearable></r-text-field>
                  </r-flex>
                  &nbsp;
                  <r-flex xs-12 xs-and-up-3>
                    <r-text-field placeholder="CVC/CVV2" cleaveMask :cleaveOptions="cleaveOptionsNumeral6" v-model="ex18" clearable></r-text-field>
                  </r-flex>
                  &nbsp;
                  <r-flex xs-12 xs-and-up-6>
                    <r-text-field placeholder="Cardholder name" v-model="ex19" clearable></r-text-field>
                  </r-flex>
                </r-layout>
              </r-layout>
            </r-card-text>
          </r-card>

        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  import MdFavoriteBorder from 'md-svg-vue/dist/action/MdFavoriteBorder';
  import MdClose from 'md-svg-vue/dist/navigation/MdClose';

  export default {
    components: {
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

      lorem: 'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',

      // https://github.com/nosir/cleave.js/blob/master/doc/options.md#creditcardstrictmode
      cleaveOptions: {
        creditCard: true
      },
      cleaveOptions2: {
        creditCard: true,
        delimiter: ' - '
      },
      cleaveOptions3: {
        blocks: [1, 0],
        uppercase: true
      },
      cleaveOptionsPhone: {
        phone: true,
        phoneRegionCode: 'ru'
      },
      cleaveOptionsDate: {
        date: true,
        delimiter: '.',
        datePattern: ['d', 'm', 'Y']
      },
      cleaveOptionsDate2: {
        date: true,
        delimiter: '/',
        blocks: [2, 2],
        datePattern: ['m', 'Y']
      },
      cleaveOptionsNumeral1: {
        numeral: true
      },
      cleaveOptionsNumeral2: {
        numeral: true,
        numeralThousandsGroupStyle: 'wan',
        numeralIntegerScale: 4
      },
      cleaveOptionsNumeral3: {
        numeral: true,
        numeralDecimalScale: 4
      },
      cleaveOptionsNumeral4: {
        numeral: true,
        numeralDecimalMark: ',',
        delimiter: '.'
      },
      cleaveOptionsNumeral5: {
        numeral: true,
        numeralPositiveOnly: true
      },
      cleaveOptionsNumeral6: {
        numeral: true,
        numeralIntegerScale: 3,
        numeralDecimalScale: 0
      },
      cleaveOptionsBlocks1: {
        blocks: [2, 5, 5]
      },
      cleaveOptionsBlocks2: {
        blocks: [3, 3, 3, 2],
        delimiters: ['.', '.', '-']
      },
      cleaveOptionsBlocks3: {
        blocks: [3, 3, 3, 2],
        delimiters: ['.', '.', '-'],
        delimiterLazyShow: true
      },
      cleaveOptionsBlocks4: {
        prefix: '$',
        numeral: true
      },
      cleaveOptionsBlocks5: {
        prefix: '$',
        numeral: true,
        noImmediatePrefix: true
      },
      cleaveOptionsBlocks6: {
        prefix: '$',
        numeral: true,
        noImmediatePrefix: true,
        uppercase: true
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

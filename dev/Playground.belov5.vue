<template>
  <r-app>
    <div class="playground page5">

      <r-card>
        <r-card-title class="font-display-1">RTooltip</r-card-title>
        <r-card-text>

          <r-tooltip bottom white lazy>
            <r-btn color="accent" slot="activator">Button</r-btn>
            <span>Tooltip</span>
          </r-tooltip>
          <r-tooltip top lazy close-delay="0" open-delay="0">
            <r-btn color="accent" slot="activator">Button</r-btn>
            <span>Tooltip</span>
          </r-tooltip>
          <r-tooltip left lazy>
            <r-btn color="accent" slot="activator">Button</r-btn>
            <span>Tooltip</span>
          </r-tooltip>
          <r-tooltip right lazy>
            <r-btn color="accent" slot="activator">Button</r-btn>
            <span>Tooltip</span>
          </r-tooltip>

        </r-card-text>
      </r-card>

      <r-card>
        <r-card-title class="font-display-1">RCheckbox</r-card-title>
        <r-card-text>


          <r-btn @click="test = !test">toggle</r-btn>
          <r-checkbox ripple :indeterminate="test" color="primary" :label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1"></r-checkbox>

          <r-checkbox ripple small disabled color="primary" :label="`Checkbox 1: ${ex1.toString()}`" staticLabel v-model="ex1"></r-checkbox>
          <r-checkbox ripple small color="primary" :label="`Checkbox 1: ${ex1.toString()}`" staticLabel v-model="ex1"></r-checkbox>
          <r-checkbox ripple color="primary" :label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1"></r-checkbox>
          <r-checkbox ripple color="primary" :label="`Checkbox 1: ${ex1.toString()}`" staticLabel v-model="ex1"></r-checkbox>
          <r-checkbox ripple large color="primary" :label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1"></r-checkbox>
          <r-checkbox ripple large color="primary" :label="`Checkbox 1: ${ex1.toString()}`" staticLabel v-model="ex1"></r-checkbox>

        </r-card-text>
      </r-card>

      <r-card>
        <r-card-title class="font-display-1">RRadioGroup & RRadio</r-card-title>
        <r-card-text>
          <r-radio-group v-model="ex4" :mandatory="false">
            <r-radio disabled color="secondary" ripple label="Radio 1" value="radio-1"></r-radio>
            <r-radio color="primary" ripple label="Radio 2" value="radio-2"></r-radio>
          </r-radio-group>

          <r-radio-group v-model="ex5" row>
            <r-radio color="primary" ripple label="Radio 1" staticLabel value="radio-1"></r-radio>
            <r-radio color="secondary" ripple label="Radio 2" staticLabel value="radio-2"></r-radio>
            <r-radio color="success" ripple label="Radio 3" staticLabel value="radio-3"></r-radio>
            <r-radio color="error" ripple label="Radio 4" staticLabel value="radio-4"></r-radio>
            <r-radio color="info" ripple label="Radio 5" staticLabel value="radio-5"></r-radio>
          </r-radio-group>

          <r-radio-group v-model="ex5" column>
            <r-radio color="secondary" ripple label="Radio 1" value="radio-1"></r-radio>
            <r-radio color="primary" ripple label="Radio 2" value="radio-2"></r-radio>
            <r-radio color="success" ripple label="Radio 3" value="radio-3"></r-radio>
            <r-radio color="error" ripple label="Radio 4" value="radio-4"></r-radio>
            <r-radio color="info" ripple label="Radio 5" value="radio-5"></r-radio>
          </r-radio-group>
        </r-card-text>
      </r-card>

      <r-card>
        <r-card-title class="font-display-1">RGrid: RContainer, RLayout & RFlex</r-card-title>
        <r-card-text>
          <r-container>
            <r-layout row wrap>
              <r-flex d-flex xs-12 sm-7>
                <r-layout row wrap>
                  <r-flex d-flex>
                    <r-card color="secondary" tile flat>
                      <r-card-text
                        v-text="lorem.slice(0, 70)">
                      </r-card-text>
                    </r-card>
                  </r-flex>
                  <r-flex d-flex>
                    <r-layout row>
                      <r-flex
                        d-flex
                        v-for="n in 2"
                        :key="n">
                        <r-card
                          color="primary"
                          tile
                          flat>
                          <r-card-text
                            v-text="lorem.slice(0, 20)">
                          </r-card-text>
                        </r-card>
                      </r-flex>
                    </r-layout>
                  </r-flex>
                </r-layout>
              </r-flex>
              <r-flex d-flex xs-12 sm-5>
                <r-layout column>
                  <r-flex d-flex>
                    <r-card color="primary" tile flat>
                      <r-card-text
                        v-text="lorem">
                      </r-card-text>
                    </r-card>
                  </r-flex>
                  <r-flex d-flex>
                    <r-card color="accent" tile flat>
                      <r-card-text
                        v-text="lorem">
                      </r-card-text>
                    </r-card>
                  </r-flex>
                </r-layout>
              </r-flex>
              <r-flex d-flex xs-12 sm-4 child-flex>
                <r-card color="success" tile flat>
                  <r-card-text
                    v-text="lorem.slice(0, 90)">
                  </r-card-text>
                </r-card>
              </r-flex>
              <r-flex d-flex sm-8 xs-12>
                <r-card color="info" tile flat>
                  <r-card-text
                    v-text="lorem.slice(0, 100)">
                  </r-card-text>
                </r-card>
              </r-flex>
            </r-layout>
          </r-container>
        </r-card-text>
      </r-card>

      <r-card>
        <r-card-title class="font-display-1">RBtn link prop</r-card-title>
        <r-card-text>
          <r-btn ripple link>Link button</r-btn>
          <r-btn ripple link color="secondary">Link button</r-btn>
        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  import MdFavoriteBorder from '@rabota/md-svg-vue/dist/action/MdFavoriteBorder';
  import MdClose from '@rabota/md-svg-vue/dist/navigation/MdClose';

  export default {
    components: {
      MdFavoriteBorder,
      MdClose
    },

    data: () => ({
      ex1: false,
      ex2: false,
      ex3: false,
      ex4: null,
      ex5: 'radio-2',
      test: false,

      lorem: 'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.'
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

  .page5 {
    .loading {
      margin-top: 12px;
    }
  }
</style>

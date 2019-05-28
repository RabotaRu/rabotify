<template>
  <r-app>
    <div class="playground">

      <r-smart-render
        onlyBrowser
        visibilityObserver
        elementWidth="100%"
        elementHeight="1000px"
        rootMargin="100px">
        <r-card>
          <r-card-title class="font-display-1">RDialog</r-card-title>
          <r-card-text>

            <div style="background: #fff;" class="component-group">
              <h3 class="text_black">Стандартный диалог</h3>

              <r-btn ripple
                     outline
                     color="primary"
                     @click="openDialog({ scrollable: false })">Открыть (scrollable=false)</r-btn>

              <r-btn ripple
                     outline
                     color="primary"
                     @click="openDialog({ scrollable: true })">Открыть (scrollable=true)</r-btn>

              <r-btn ripple
                     outline
                     color="primary"
                     @click="openDialog({ scrollable: true, direction: 'right' })">Открыть (scrollable=true, direction=right)</r-btn>

            </div>

            <r-dialog :transition="dialogTransition"
                      :fullscreen="$rabotify.breakpoint.xsAndDown"
                      :scrollable="dialogScrollable"
                      :fullHeight="!!dialogDirection"
                      :attachRight="dialogDirection === 'right'"
                      :attachLeft="dialogDirection === 'left'"
                      lazy
                      v-model="dialog"
                      maxWidth="590">

              <r-dialog-card @close="dialog = false">
                <div slot="title">Заголовок диалога</div>

                <div>
                  test
                  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                  test
                  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                  test
                </div>

                <div slot="actions">
                  <r-btn color="primary">Action</r-btn>
                  <r-btn color="secondary" flat>Cancel</r-btn>
                </div>

              </r-dialog-card>

            </r-dialog>

          </r-card-text>
        </r-card>
      </r-smart-render>

      <r-card>
        <r-card-title class="font-display-1">
          <span id="scroll-target-1">Селекты</span>
        </r-card-title>
        <r-card-text>
          <div>
            <r-subheader>Scoped slots (Selection)</r-subheader>
          </div>
          <div>
            <r-btn @click="toggleLazy">Push {{ lazyLimit }} items. Total: {{ lazyItems.length }} / {{ itemsLarge.length }}</r-btn>
            <r-select
              label="Select"
              ref="scrollContent"
              v-bind:items="lazyItems"
              item-text="name"
              item-value="id"
              autocomplete
              multiple
              virtual
              lazy
              chips
              deletable-chips
              fit-to-content
              v-model="select3">

              <!-- &lt;!&ndash; Scoped slot for selected item &ndash;&gt;
              <template slot="selection" slot-scope="data">
                <r-chip
                  close
                  color="secondary"
                  @input="data.parent.selectItem(data.item)"
                  :selected="data.selected"
                  outline
                  class="chip_select-multi"
                  :key="data.item.id">
                  <div class="demo-circle" :style="{'background-image': `url('https://vk.com/images/stickers/${3805 + data.item.stickerId}/128.png')`}"></div>
                  <div class="demo-text">
                    {{ data.item.name }}
                  </div>
                </r-chip>
              </template>

              &lt;!&ndash; Virtual scoped slot for item &ndash;&gt;
              <template slot="item" slot-scope="props">
                <r-list-tile :key="props.itemKey" @click="props.selectItem(props.item)">
                  <div class="demo-circle" :style="{'background-image': `url('https://vk.com/images/stickers/${3805 + props.item.stickerId}/128.png')`}"></div>
                  <r-list-tile-content>
                    <r-list-tile-title v-html="props.item.name" :class="{'text_info': props.selected}"></r-list-tile-title>
                  </r-list-tile-content>
                </r-list-tile>
              </template>-->

            </r-select>

            <r-subheader>Virtual lists ({{ itemsLarge.length }} elements)</r-subheader>

            <div class="demo__scroller">
              <r-list class="demo-list"
                      virtual
                      :items="itemsLarge"
                      pool-size="400"
                      :itemHeight="32">
                <template slot="item" slot-scope="props">
                  <r-list-tile :key="props.itemKey" @click="test(props.item)">
                    <div class="demo-circle" :style="{'background-image': `url('https://vk.com/images/stickers/${3805 + props.item.stickerId}/128.png')`}"></div>
                    <r-list-tile-content>
                      <r-list-tile-title v-html="props.item.name"></r-list-tile-title>
                    </r-list-tile-content>
                  </r-list-tile>
                </template>
              </r-list>
            </div>
          </div>
        </r-card-text>
      </r-card>

      <r-card>
        <r-card-title class="font-display-1">Табы</r-card-title>
        <r-card-text>
          <div style="padding: 20px 0;">
            <h2>Простые табы</h2>
          </div>
          <div>
            <r-tabs
              v-model="active"
              slider-color="primary">
              <r-tab
                v-for="n in 3"
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active2"
              slider-color="secondary">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active3"
              slider-color="accent">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active4"
              slider-color="success">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active5"
              slider-color="info">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>
          </div>

          <div style="padding: 20px 0;">
            <h2>Закрашенные табы</h2>
          </div>
          <div>
            <r-tabs
              v-model="active"
              color="primary"
              slider-color="accent">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active2"
              color="secondary"
              slider-color="white">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active3"
              color="accent"
              slider-color="primary">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active4"
              color="success"
              slider-color="accent">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active5"
              color="info"
              slider-color="accent">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>
          </div>

          <div style="padding: 20px 0;">
            <h2>Разные виды</h2>
          </div>
          <div>
            <r-tabs
              v-model="active"
              fixed-tabs
              slider-color="primary">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active2"
              grow
              slider-color="primary">
              <r-tab
                v-for="n in 3"
                ripple
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 3"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>

            <r-tabs
              v-model="active3"
              show-arrows
              slider-color="primary">
              <r-tab
                v-for="n in 30"
                :ripple="{ style: { color: '#673AB8' }, alpha: .4 }"
                :key="n">
                Item {{ n }}
              </r-tab>
              <r-tab-item
                v-for="n in 30"
                :key="n">
                <r-card flat>
                  <r-card-text>{{ demoTextShort }}</r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs>

            <r-tabs-items v-model="active3">
              <r-tab-item
                v-for="n in 30"
                :key="n"
                :id="`tab-${n}`">
                <r-card flat>
                  <r-card-text v-text="demoTextShort"></r-card-text>
                </r-card>
              </r-tab-item>
            </r-tabs-items>

            <div style="height: 30px;"></div>
            <r-divider></r-divider>
            <div style="height: 30px;"></div>
          </div>
        </r-card-text>
      </r-card>

      <r-card>
        <r-card-title class="font-display-1">scrollTo</r-card-title>
        <r-card-text>
          <div>
            <r-subheader>Scroll to Vue component</r-subheader>
          </div>
          <div>
            <r-btn @click="scrollTo('vue')">Vue component</r-btn>
            <r-btn @click="scrollTo('dom')">DOMElement</r-btn>
            <r-btn @click="scrollTo('selector')">Selector</r-btn>
            <r-btn @click="scrollTo('number')">Offset top</r-btn>
          </div>
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
      dialog: false,
      dialogScrollable: false,
      dialogDirection: 'right',

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

      demoText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
      demoTextShort: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and',
      active: '',
      active2: '',
      active3: '',
      active4: '',
      active5: '',
      active6: '',
      active7: '',

      lazyOffset: 0,
      lazyLimit: 200,
      lazyItems: []
    }),
    watch: {
      toggle (val) {
        console.log(val);
      }
    },
    methods: {
      toggleLazy () {
        this.lazyItems.push(...this.itemsLarge.slice(this.lazyOffset, this.lazyOffset + this.lazyLimit));
        this.lazyOffset += this.lazyLimit;
      },
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
        return result;
      },
      toggleLoading() {
        this.loading = !this.loading;
        if (this.loading) {
          this.disabled = true;
        }
      },
      openDialog ({ scrollable, direction }) {
        this.dialogScrollable = scrollable;
        this.dialogDirection = direction;
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
      },
      scrollTo (type) {
        let options = {
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic'
        };
        let target = '#scroll-target-1';
        switch (type) {
          case 'selector': {
            target = '#scroll-target-1';
            break;
          }
          case 'vue': {
            target = this.$refs.scrollContent;
            break;
          }
          case 'number': {
            target = 100;
            options.offset = -100;
            break;
          }
        }
        this.$rabotify.scrollTo(target, options);
      }
    },
    computed: {
      transition() {
        return this.$rabotify.breakpoint.xsAndDown ?
          'scale-transition' : 'dialog-transition';
      },

      dialogTransition () {
        if (this.dialogDirection === 'left') {
          return 'slide-x-transition';
        } else if (this.dialogDirection === 'right') {
          return 'slide-x-reverse-transition';
        } else {
          return this.transition;
        }
      },

      items () {
        return this.getItems();
      },

      itemsLarge () {
        return this.getItems(100);
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

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
          <r-card-title class="font-display-1">Блоки для селекта</r-card-title>
          <r-card-text>
            <r-chip>Тест</r-chip>
            <r-chip close>Тест</r-chip>
            <r-chip color="primary">Тест</r-chip>
            <r-chip color="secondary">Тест</r-chip>
            <r-chip color="info">Тест</r-chip>
            <r-chip color="primary" close>Тест</r-chip>
            <r-chip color="secondary" close>Тест</r-chip>
            <r-chip color="info" close>Тест</r-chip>
            <r-chip color="secondary" close disabled>Тест</r-chip>

            <br>

            <r-chip outline>Тест</r-chip>
            <r-chip outline close>Тест</r-chip>
            <r-chip outline color="primary">Тест</r-chip>
            <r-chip outline color="secondary">Тест</r-chip>
            <r-chip outline color="info">Тест</r-chip>
            <r-chip outline color="primary" close>Тест</r-chip>
            <r-chip outline color="secondary" close>Тест</r-chip>
            <r-chip outline color="info" close>Тест</r-chip>
            <r-chip outline color="secondary" close disabled>Тест</r-chip>
          </r-card-text>
        </r-card>
      </r-smart-render>

      <r-smart-render
        onlyBrowser
        visibilityObserver
        elementWidth="100%"
        elementHeight="2000px"
        rootMargin="100px">
        <r-card>
          <r-card-title class="font-display-1">Селекты</r-card-title>
          <r-card-text>
            <div>
              <r-subheader>White</r-subheader>
            </div>
            <div style="background-color: #ccc;padding: 20px;">
              <r-select
                color="white"
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="select"
                label="Select"
                autocomplete
                clearable
                single-line
                staticAttach
              ></r-select>
            </div>

            <div>
              <r-subheader>Standard</r-subheader>
            </div>
            <div>
              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="select"
                label="Select"
                single-line
                staticAttach
              ></r-select>
            </div>

            <div>
              <r-subheader>Combobox</r-subheader>
            </div>
            <div>
              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="select2"
                label="Select"
                combobox
              ></r-select>
            </div>

            <div>
              <r-subheader>Autocomplete</r-subheader>
            </div>
            <div>
              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                label="Select"
                autocomplete
              ></r-select>
            </div>

            <div>
              <r-subheader>Multiple</r-subheader>
            </div>
            <div>
              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                label="Select"
                multiple
              ></r-select>
            </div>

            <div>
              <r-subheader>Chips</r-subheader>
            </div>
            <div>
              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="primary"
                chips-color="primary"
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="success"
                chips-color="success"
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="info"
                chips-color="info"
                deletable-chips
                autocomplete
              ></r-select>

              <r-subheader>Outline chips</r-subheader>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                chips-color="secondary"
                chips-outline
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="primary"
                chips-color="primary"
                chips-outline
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="success"
                chips-color="success"
                chips-outline
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="info"
                chips-color="info"
                chips-outline
                deletable-chips
                autocomplete
              ></r-select>

              <r-subheader>Round chips</r-subheader>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                chips-color="secondary"
                chips-outline
                chips-round
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="primary"
                chips-color="primary"
                chips-outline
                chips-round
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="success"
                chips-color="success"
                chips-outline
                chips-round
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="info"
                chips-color="info"
                chips-outline
                chips-round
                deletable-chips
                autocomplete
              ></r-select>
            </div>

            <div>
              <r-subheader>Tags</r-subheader>
            </div>
            <div>
              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                chips-color="secondary"
                tags
                return-object
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="primary"
                chips-color="primary"
                tags
                return-object
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="success"
                chips-color="success"
                tags
                return-object
                deletable-chips
                autocomplete
              ></r-select>

              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="info"
                chips-color="info"
                tags
                return-object
                clearable
                deletable-chips
                autocomplete
              ></r-select>
            </div>

            <div>
              <r-select
                v-bind:items="items"
                item-value="id"
                item-text="name"
                v-model="selectMultiple"
                placeholder="Select"
                multiple
                chips
                color="info"
                chips-color="info"
                tags
                return-object
                clearable
                deletable-chips
                autocomplete
              ></r-select>
            </div>

            <div>
              <r-subheader>Disabled</r-subheader>
            </div>
            <div>
              <r-select
                label="Select"
                v-bind:items="items"
                v-model="select"
                disabled
              ></r-select>
            </div>

            <div>
              <r-subheader>Scoped slots (Selection)</r-subheader>
            </div>
            <div>
              <r-select
                label="Select"
                v-bind:items="itemsLarge"
                item-text="name"
                item-value="id"
                autocomplete
                multiple
                virtual
                lazy
                v-model="select3">

                <!-- Scoped slot for selected item -->
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

                <!-- Virtual scoped slot for item -->
                <template slot="item" slot-scope="props">
                  <r-list-tile :key="props.itemKey" @click="props.selectItem(props.item)">
                    <div class="demo-circle" :style="{'background-image': `url('https://vk.com/images/stickers/${3805 + props.item.stickerId}/128.png')`}"></div>
                    <r-list-tile-content>
                      <r-list-tile-title v-html="props.item.name" :class="{'text_info': props.selected}"></r-list-tile-title>
                    </r-list-tile-content>
                  </r-list-tile>
                </template>

              </r-select>

              <r-subheader>Virtual lists (~ 380 000 elements)</r-subheader>

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
      </r-smart-render>

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

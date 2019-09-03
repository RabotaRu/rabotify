<template>
  <r-app>
    <div class="playground page10">

      <r-card>
        <r-card-title class="font-display-1">Ошибки в форме</r-card-title>
        <r-card-text>

          <r-form v-model="valid" ref="form" :formErrors="errors">


            <div>

              <r-text-field
                color="secondary"
                :rules="[v => v.length <= 25 || 'Максимум 25 символов', v => v.length >= 5 || 'Минимум 5 символов']"
                error-field="test.a"
                clearable
                detailsContainer="auto"
                placeholder="Введите текст"
                v-model="ex1">

                <template slot="prependIcon">
                  <md-favorite-border></md-favorite-border>
                </template>

              </r-text-field>

              <r-text-field
                color="secondary"
                :rules="[v => v.length <= 25 || 'Максимум 25 символов', v => v.length >= 5 || 'Минимум 5 символов']"
                error-field="test.b"
                clearable
                detailsContainer="auto"
                placeholder="Введите текст"
                v-model="ex1">

                <template slot="prependIcon">
                  <md-favorite-border></md-favorite-border>
                </template>

              </r-text-field>

              <r-dialog v-model="dialog">

                <r-btn slot="activator" style="margin: 18px 40px !important;">Открыть диалог</r-btn>

                <r-dialog-card>
                  <r-select
                    v-bind:items="items"
                    item-value="id"
                    item-text="name"
                    v-model="ex2"
                    :rules="selectRules"
                    error-field="test.c"
                    label="Select"
                    multiple
                    autocomplete
                    chips
                    preserveDetails
                    required
                  ></r-select>
                </r-dialog-card>
              </r-dialog>

              <br>

              <div style="margin: 0 40px 30px;">


                <r-checkbox
                  ripple
                  color="secondary"
                  label="Вы согласны отдать все свои деньги мне?"
                  staticLabel
                  v-model="ex3"
                  :rules="checkboxRules"
                  error-field="test.a"
                  required
                ></r-checkbox>

                <br>

                <r-switch
                  ripple
                  color="secondary"
                  label="Вы согласны отдать все свои деньги мне?"
                  staticLabel
                  v-model="ex4"
                  :rules="switchRules"
                  error-field="test.b"
                  required
                ></r-switch>

                <br>

                <r-radio-group v-model="ex5"
                               :rules="radioRules"
                               error-field="test.c"
                               required
                               :mandatory="false">
                  <r-radio ripple color="accent" ripple label="Отдать все деньги" value="radio-1"></r-radio>
                  <r-radio ripple color="secondary" ripple label="Не отдавать" value="radio-2"></r-radio>
                </r-radio-group>

                <div class="error-fields">
                  <h3 style="margin: 16px 0 0;">Ошибки, выведенные отдельно от инпутов</h3>
                  <r-form-field-error error-field="test.a"></r-form-field-error>
                  <r-form-field-error error-field="test.b"></r-form-field-error>
                  <r-form-field-error error-field="test.c"></r-form-field-error>
                  <r-form-field-error error-field="test.e"></r-form-field-error>
                </div>
              </div>

            </div>

            <r-btn
              @click="submit"
              color="primary"
              :disabled="!valid">
              Отправить
            </r-btn>

            <r-btn @click="addErrors" color="secondary">
              Добавить ошибки на форму
            </r-btn>

            <r-btn @click="clear">Очистить</r-btn>
          </r-form>

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
      dialog: false,
      ex1: 'sdf',
      ex2: null,
      ex3: null,
      ex4: null,
      ex5: null,
      valid: false,

      errors: [],

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
      demoText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          console.log('valid');
        }
      },
      clear () {
        this.$refs.form.reset();
      },
      addErrors () {
        this.errors.splice(0, 1e7);
        this.errors.push(
          ...[{
            message: 'Test 1',
            field: 'test.a'
          }, {
            message: 'Test 2',
            field: 'test.b'
          }, {
            message: 'Test 3',
            field: 'test.c'
          }, {
            message: 'Test 4',
            field: 'test.d'
          }, {
            message: 'Test 5',
            field: 'test.e'
          }]
        );
        const form = this.$refs.form;

        console.log( form.getErrorFields(), form.getUnusedErrorFields(), form.getUnusedErrors() );
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
        return result;
      },
    },
    computed: {
      items () {
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

    .error-fields {
      .input-group {
        margin: 0;
      }
    }
  }
</style>

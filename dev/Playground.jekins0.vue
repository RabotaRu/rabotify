<template>
  <r-app>
    <div class="playground jekins0" style="max-width: 600px;margin: 50px auto;">

      <r-card>
        <r-card-text>
          <r-select v-model="textfield1"
                    item-value="id"
                    item-text="name"
                    browser-autocomplete="nope"
                    :open-on-clear="false"
                    chips
                    chips-outside
                    deletable-chips
                    :items="items"
                    autocomplete
                    :arrow-navigation="false"
                    :backspace-deletable="false"
                    :hide-menu-after-select="true"
                    multiple
                    hide-selected
                    return-object></r-select>
        </r-card-text>
      </r-card>

      <r-card>
        <r-card-text>
          <r-select v-model="textfield2"
                    item-value="id"
                    item-text="name"
                    browser-autocomplete="nope"
                    :open-on-clear="false"
                    hide-no-data
                    creatable-chips
                    chips
                    chips-outside
                    deletable-chips
                    :items="items"
                    :arrow-navigation="false"
                    :backspace-deletable="false"
                    :hide-menu-after-select="true"
                    autocomplete
                    multiple
                    hide-selected
                    return-object></r-select>
        </r-card-text>
      </r-card>

      <r-card>
        <r-card-text>
          <r-select v-model="textfield3"
                    item-value="id"
                    item-text="name"
                    browser-autocomplete="nope"
                    :open-on-clear="false"
                    chips
                    chips-outside
                    deletable-chips
                    :items="items"
                    :arrow-navigation="false"
                    :backspace-deletable="false"
                    :hide-menu-after-select="true"
                    multiple
                    hide-selected
                    return-object></r-select>
        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  export default {
    data: () => ({
        textfield3: null,
        textfield2: null,
        textfield1: null,
        items2: [],
        items: [
          {
            id: 1,
            name: 'Moscow'
          },
          {
            id: 2,
            name: 'Piter'
          },
          {
            id: 3,
            name: 'Paris'
          },
          {
            id: 4,
            name: 'Germany'
          },
          {
            id: 7,
            name: 'PMR'
          },
          {
            id: 8,
            name: 'Denmark'
          },
          {
            id: 9,
            name: 'Russia'
          },
          {
            id: 10,
            name: 'Swiss'
          }
        ]
    }),
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

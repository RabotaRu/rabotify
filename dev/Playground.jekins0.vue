<template>
  <r-app>
    <div class="playground jekins0">

      <r-card>
        <r-card-title class="font-display-1">RFormGroup</r-card-title>
        <r-card-text>
          <r-form-group label="test label"
                        label-top
                        required>
	        <r-text-field v-model="textfield1"></r-text-field>
          </r-form-group>
          <r-form-group label="test label vertical"
                        required
                        vertical></r-form-group>
          <h1>Heading h1</h1>
          <h2>Heading h2</h2>
          <h3>Heading h3</h3>
          <h4>Heading h4</h4>
        </r-card-text>
        <br>
        <r-chip color="info">Светлый чип</r-chip>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  export default {
    data: () => ({
        textfield1: ''
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

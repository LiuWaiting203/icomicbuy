<template>
  <v-row class="pa-5" justify="center">
    <v-col v-for="step in stepNumber" :key="step" class="step-number-wrapper text-center" cols="2">
      <v-chip class="step-number" :class="{ 'bg-primary font-weight-bold': step == currentStep }" rounded>{{ step
      }}</v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'molecules-stepper',
  props: {
    stepNumber: Number,
    currentStep: Number
  }
}
</script>

<style scope lang="scss">
.step-number-wrapper {
  .step-number {
    border-radius: 100%;
    position: relative;
    overflow: visible;

    &:after {
      content: "・・・";
      font-weight: bold;
      position: absolute;
      left: 140%;
      color: #aaa;
    }
  }

  &:nth-last-of-type(1) {
    .step-number {
      &:after {
        content: "";
      }
    }
  }
}
</style>

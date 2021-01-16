<template>
  <div v-editable="blok">
    <component
      :is="blok.component | dashify"
      v-for="b in blok.body"
      :key="b._uid"
      :blok="b"
    ></component>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div :class="classes"
       class="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 flex items-center justify-center">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    classes: {
      type: String,
      required: false,
      default: () => ''
    }
  }
}
</script>
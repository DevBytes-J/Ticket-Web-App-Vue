<template>
  <div v-if="show" :class="toastClasses">
    <i :data-lucide="iconType" class="w-5 h-5"></i>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'ToastComponent',
  props: {
    show: Boolean,
    message: String,
    type: String
  },
  computed: {
    toastClasses() {
      return `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
        this.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white flex items-center gap-3`;
    },
    iconType() {
      return this.type === 'success' ? 'check-circle' : 'alert-circle';
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$nextTick(() => lucide.createIcons());
      }
    }
  }
};
</script>
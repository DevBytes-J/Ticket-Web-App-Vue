<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavbarComponent 
      :user="user" 
      :showTicketsLink="true" 
      :showDashboardLink="false"
      @logout="$emit('logout')"
      @navigate="$emit('navigate', $event)"
    />
    
    <div class="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p class="text-gray-600">Overview of your ticket management system</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="text-gray-600 mb-2 font-semibold">Total Tickets</div>
          <div class="text-4xl font-bold text-gray-800">{{ stats.total }}</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="text-gray-600 mb-2 font-semibold">Open</div>
          <div class="text-4xl font-bold text-green-600">{{ stats.open }}</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="text-gray-600 mb-2 font-semibold">In Progress</div>
          <div class="text-4xl font-bold text-amber-600">{{ stats.inProgress }}</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="text-gray-600 mb-2 font-semibold">Closed</div>
          <div class="text-4xl font-bold text-gray-600">{{ stats.closed }}</div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <button @click="$emit('navigate', 'tickets')" class="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition inline-flex items-center gap-2">
          <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
          Manage Tickets
        </button>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '../layout/NavbarComponent.vue';
import FooterComponent from '../layout/FooterComponent.vue';

export default {
  name: 'DashboardPage',
  components: {
    NavbarComponent,
    FooterComponent
  },
  props: {
    user: Object,
    stats: Object
  },
  emits: ['logout', 'navigate'],
  mounted() {
    lucide.createIcons();
  },
  updated() {
    this.$nextTick(() => lucide.createIcons());
  }
};
</script>

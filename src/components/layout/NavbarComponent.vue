<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
      <!-- Logo -->
      <div class="flex items-center">
        <Ticket class="w-8 h-8 text-indigo-600 mr-3" />
        <span class="text-2xl font-bold text-gray-800">SwiftPass</span>
      </div>

      <!-- Links & Actions -->
      <div class="flex items-center gap-4 flex-wrap">
        <!-- Tickets button -->
        <button
          @click="$emit('navigate', 'tickets')"
          class="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <LayoutDashboard class="w-5 h-5" />
          Tickets
        </button>

        <!-- Dashboard button -->
        <button
          @click="$emit('navigate', 'dashboard')"
          class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <Home class="w-5 h-5" />
          Dashboard
        </button>

        <!-- User greeting -->
        <span class="text-gray-700">Hello, {{ user?.name }}</span>

        <!-- Logout button -->
        <button
          @click="$emit('logout')"
          class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <LogOut class="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { Ticket, LogOut, Home, LayoutDashboard } from "lucide-vue-next";

export default {
  name: "NavbarComponent",
  props: {
    user: Object
  },
  emits: ["logout", "navigate"],
  components: {
    Ticket,
    LogOut,
    Home,
    LayoutDashboard
  }
};
</script>

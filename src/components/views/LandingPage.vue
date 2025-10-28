\
<template>
  <div class="min-h-screen flex flex-col">
    <div
      class="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden"
    >
      <div
        class="absolute top-10 right-10 w-64 h-64 bg-white opacity-10 rounded-full"
      ></div>
      <div
        class="absolute bottom-20 left-10 w-40 h-40 bg-white opacity-10 rounded-full"
      ></div>

      <div class="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div class="text-center text-white mb-16">
          <i data-lucide="ticket" class="w-20 h-20 mx-auto mb-6"></i>
          <h1 class="text-6xl font-bold mb-4">SwiftPass</h1>
          <p class="text-2xl mb-8"> The ultimate platform for streamlined support, tracking, and issue
          resolution.</p>
          <div class="flex gap-4 justify-center flex-wrap">
            <button
              @click="$emit('navigate', 'auth')"
              class="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Login
            </button>
            <button
              @click="$emit('navigate', 'auth')"
              class="bg-indigo-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-900 transition shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <svg
        class="absolute bottom-0 w-full"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        ></path>
      </svg>
    </div>
    <!-- Features Section -->
    <div class="bg-white py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-gray-900">
          Why Choose TicketFlow?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature Card 1: Real-time Status -->
          <div
            class="p-6 bg-white rounded-xl shadow-2xl transition duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <div
              class="text-5xl text-gray-800 mb-4 flex items-center justify-center"
            >
              <Activity class="w-12 h-12 text-gray-800" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900">
              Real-time Status
            </h3>
            <p class="text-gray-600">
              Track issues with three strict statuses: Open, In Progress, and
              Closed.
            </p>
          </div>

          <!-- Feature Card 2: Secure Sessions -->
          <div
            class="p-6 bg-white rounded-xl shadow-2xl transition duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <div
              class="text-5xl text-primary mb-4 flex items-center justify-center"
            >
              <Lock class="w-12 h-12 text-indigo-600" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900">
              Secure Sessions
            </h3>
            <p class="text-gray-600">
              Protected routes ensure data integrity and user privacy.
            </p>
          </div>

          <!-- Feature Card 3: Full CRUD -->
          <div
            class="p-6 bg-white rounded-xl shadow-2xl transition duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <div
              class="text-5xl text-gray-800 mb-4 flex items-center justify-center"
            >
              <Edit3 class="w-12 h-12 text-gray-800" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900">Full CRUD</h3>
            <p class="text-gray-600">
              Create, Read, Update, and Delete tickets with ease and
              confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="relative py-16 bg-gray-50">
      <div
        class="absolute top-10 right-20 w-32 h-32 bg-indigo-200 opacity-30 rounded-full"
      ></div>
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">
          Ready to Get Started?
        </h2>
        <p class="text-gray-600 mb-8 text-lg">
          Join thousands of teams managing their tickets efficiently
        </p>
        <button
          @click="$emit('navigate', 'auth')"
          class="bg-indigo-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
        >
          Start Free Trial
        </button>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from '../layout/FooterComponent.vue';

import { Activity, Lock, Edit3 } from 'lucide-vue-next';

export default {
  name: 'LandingPage',
  components: {
    FooterComponent,
    Activity,
    Lock,
    Edit3

  },
  emits: ['navigate'],
  mounted() {
    lucide.createIcons();
  }
};
</script>

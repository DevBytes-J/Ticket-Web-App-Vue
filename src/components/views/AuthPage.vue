<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <i data-lucide="ticket" class="w-16 h-16 mx-auto mb-4 text-indigo-600"></i>
          <h2 class="text-3xl font-bold text-gray-800">{{ authMode === 'login' ? 'Welcome Back' : 'Create Account' }}</h2>
        </div>
        <div>
          <div v-if="authMode === 'register'" class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Name</label>
            <input 
              v-model="localAuthForm.name" 
              @input="updateAuthForm"
              type="text" 
              :class="inputClass(authErrors.name)" 
              placeholder="Your name"
            />
            <p v-if="authErrors.name" class="text-red-500 text-sm mt-1">{{ authErrors.name }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              v-model="localAuthForm.email" 
              @input="updateAuthForm"
              type="email" 
              :class="inputClass(authErrors.email)" 
              placeholder="your@email.com"
            />
            <p v-if="authErrors.email" class="text-red-500 text-sm mt-1">{{ authErrors.email }}</p>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              v-model="localAuthForm.password" 
              @input="updateAuthForm"
              type="password" 
              :class="inputClass(authErrors.password)" 
              placeholder="••••••••"
            />
            <p v-if="authErrors.password" class="text-red-500 text-sm mt-1">{{ authErrors.password }}</p>
          </div>
          <button @click="$emit('auth')" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            {{ authMode === 'login' ? 'Sign In' : 'Sign Up' }}
          </button>
        </div>
        <div class="mt-6 text-center">
          <button @click="toggleAuthMode" class="text-indigo-600 hover:text-indigo-800 font-semibold">
            {{ authMode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in' }}
          </button>
        </div>
        <div class="mt-4 text-center">
          <button @click="$emit('navigate', 'landing')" class="text-gray-600 hover:text-gray-800 flex items-center gap-2 mx-auto">
            <i data-lucide="home" class="w-4 h-4"></i>
            Back to home
          </button>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import FooterComponent from '../layout/FooterComponent.vue';

export default {
  name: 'AuthPage',
  components: {
    FooterComponent
  },
  props: {
    authMode: String,
    authForm: Object,
    authErrors: Object
  },
  emits: ['update:authMode', 'update:authForm', 'auth', 'navigate'],
  setup(props, { emit }) {
    const localAuthForm = ref({ ...props.authForm });

    watch(() => props.authForm, (newVal) => {
      localAuthForm.value = { ...newVal };
    }, { deep: true });

    const updateAuthForm = () => {
      emit('update:authForm', localAuthForm.value);
    };

    const toggleAuthMode = () => {
      emit('update:authMode', props.authMode === 'login' ? 'register' : 'login');
    };

    const inputClass = (error) => {
      return `w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`;
    };

    return {
      localAuthForm,
      updateAuthForm,
      toggleAuthMode,
      inputClass
    };
  },
  mounted() {
    lucide.createIcons();
  },
  updated() {
    this.$nextTick(() => lucide.createIcons());
  }
};
</script>

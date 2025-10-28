<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <NavbarComponent 
      :user="user" 
      :showTicketsLink="false" 
      :showDashboardLink="true"
      @logout="$emit('logout')"
      @navigate="$emit('navigate', $event)"
    />
    
    <div class="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
      <div class="bg-white rounded-xl shadow-lg border border-gray-100">
        <div class="p-6 border-b flex flex-wrap justify-between items-center gap-4">
          <h2 class="text-2xl font-bold text-gray-800">All Tickets</h2>
          <button @click="$emit('open-modal')" class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            <i data-lucide="plus" class="w-5 h-5"></i>
            New Ticket
          </button>
        </div>
        <div class="p-6">
          <div v-if="tickets.length === 0" class="text-center py-12 text-gray-500">
            <i data-lucide="ticket" class="w-16 h-16 mx-auto mb-4 opacity-50"></i>
            <p class="text-xl">No tickets yet. Create your first ticket!</p>
          </div>
          <div v-else class="grid gap-4">
            <TicketCard 
              v-for="ticket in tickets" 
              :key="ticket.id" 
              :ticket="ticket" 
              @edit="$emit('open-modal', $event)" 
              @delete="$emit('confirm-delete', $event)" 
            />
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />

    <!-- Ticket Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div class="p-6 border-b flex justify-between items-center">
          <h3 class="text-2xl font-bold text-gray-800">{{ editingTicket ? 'Edit Ticket' : 'New Ticket' }}</h3>
          <button @click="$emit('close-modal')" class="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
        </div>
        <div class="p-6">
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Title *</label>
            <input 
              v-model="localFormData.title" 
              @input="updateFormData"
              type="text" 
              :class="`w-full px-4 py-3 border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`"
              placeholder="Enter ticket title"
            />
            <p v-if="formErrors.title" class="text-red-500 text-sm mt-1">{{ formErrors.title }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea 
              v-model="localFormData.description" 
              @input="updateFormData"
              :class="`w-full px-4 py-3 border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`"
              rows="4"
              placeholder="Enter ticket description"
            ></textarea>
            <p v-if="formErrors.description" class="text-red-500 text-sm mt-1">{{ formErrors.description }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">Priority</label>
            <select 
              v-model="localFormData.priority" 
              @change="updateFormData"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">Status *</label>
            <select 
              v-model="localFormData.status" 
              @change="updateFormData"
              :class="`w-full px-4 py-3 border ${formErrors.status ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="formErrors.status" class="text-red-500 text-sm mt-1">{{ formErrors.status }}</p>
          </div>
          <div class="flex gap-3">
            <button @click="$emit('submit-ticket')" class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              {{ editingTicket ? 'Update' : 'Create' }}
            </button>
            <button @click="$emit('close-modal')" class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to delete this ticket? This action cannot be undone.</p>
        <div class="flex gap-3">
          <button @click="$emit('delete-ticket')" class="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Delete
          </button>
          <button @click="$emit('cancel-delete')" class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import NavbarComponent from '../layout/NavbarComponent.vue';
import FooterComponent from '../layout/FooterComponent.vue';
import TicketCard from '../tickets/TicketCard.vue';

export default {
  name: 'TicketsPage',
  components: {
    NavbarComponent,
    FooterComponent,
    TicketCard
  },
  props: {
    user: Object,
    tickets: Array,
    showModal: Boolean,
    showDeleteConfirm: Boolean,
    formData: Object,
    formErrors: Object,
    editingTicket: Object
  },
  emits: ['logout', 'navigate', 'open-modal', 'close-modal', 'submit-ticket', 'confirm-delete', 'cancel-delete', 'delete-ticket', 'update:formData'],
  setup(props, { emit }) {
    const localFormData = ref({ ...props.formData });

    watch(() => props.formData, (newVal) => {
      localFormData.value = { ...newVal };
    }, { deep: true });

    const updateFormData = () => {
      emit('update:formData', localFormData.value);
    };

    return {
      localFormData,
      updateFormData
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
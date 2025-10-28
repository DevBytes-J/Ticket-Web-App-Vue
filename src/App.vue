<template>
  <div>
    <LandingPage v-if="currentPage === 'landing'" @navigate="handleNavigate" />
    
    <AuthPage v-else-if="currentPage === 'auth'" 
      :authMode="authMode"
      :authForm="authForm"
      :authErrors="authErrors"
      @update:authMode="authMode = $event"
      @update:authForm="authForm = $event"
      @auth="handleAuth"
      @navigate="handleNavigate"
    />
    
    <DashboardPage v-else-if="currentPage === 'dashboard'"
      :user="user"
      :stats="stats"
      @logout="handleLogout"
      @navigate="requireAuth"
    />
    
    <TicketsPage v-else-if="currentPage === 'tickets'"
      :user="user"
      :tickets="tickets"
      :showModal="showModal"
      :showDeleteConfirm="showDeleteConfirm"
      :formData="formData"
      :formErrors="formErrors"
      :editingTicket="editingTicket"
      @logout="handleLogout"
      @navigate="requireAuth"
      @open-modal="openModal"
      @close-modal="closeModal"
      @submit-ticket="handleTicketSubmit"
      @confirm-delete="confirmDelete"
      @cancel-delete="showDeleteConfirm = false"
      @delete-ticket="deleteTicket"
      @update:formData="formData = $event"
    />
    
    <ToastComponent :show="toast.show" :message="toast.message" :type="toast.type" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import LandingPage from './components/views/LandingPage.vue';
import AuthPage from './components/views/AuthPage.vue';
import DashboardPage from './components/views/DashboardPage.vue';
import TicketsPage from './components/views/TicketsPage.vue';
import ToastComponent from './components/layout/ToastComponent.vue';

export default {
  name: 'App',
  components: {
    LandingPage,
    AuthPage,
    DashboardPage,
    TicketsPage,
    ToastComponent
  },
  setup() {
    const currentPage = ref('landing');
    const user = ref(null);
    const tickets = ref([]);
    const showModal = ref(false);
    const showDeleteConfirm = ref(false);
    const deleteTicketId = ref(null);
    const editingTicket = ref(null);
    const formData = ref({ title: '', description: '', priority: 'medium', status: 'open' });
    const formErrors = ref({});
    const authMode = ref('login');
    const authForm = ref({ email: '', password: '', name: '' });
    const authErrors = ref({});
    const toast = ref({ show: false, message: '', type: '' });

    const stats = computed(() => ({
      total: tickets.value.length,
      open: tickets.value.filter(t => t.status === 'open').length,
      inProgress: tickets.value.filter(t => t.status === 'in_progress').length,
      closed: tickets.value.filter(t => t.status === 'closed').length
    }));

    const getSession = async () => {
      try {
        const data = localStorage.getItem('ticketapp_session');
        return data ? JSON.parse(data) : null;
      } catch {
        return null;
      }
    };

    const setSession = async (userData) => {
      localStorage.setItem('ticketapp_session', JSON.stringify(userData));
    };

    const clearSession = async () => {
      localStorage.removeItem('ticketapp_session');
    };

    const getTickets = async () => {
      try {
        const data = localStorage.getItem('ticketapp_tickets');
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    };

    const setTickets = async (ticketData) => {
      localStorage.setItem('ticketapp_tickets', JSON.stringify(ticketData));
    };

    const validateAuthForm = () => {
      const errors = {};
      if (!authForm.value.email) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(authForm.value.email)) errors.email = 'Email is invalid';
      if (!authForm.value.password) errors.password = 'Password is required';
      else if (authForm.value.password.length < 6) errors.password = 'Password must be at least 6 characters';
      if (authMode.value === 'register' && !authForm.value.name) errors.name = 'Name is required';
      authErrors.value = errors;
      return Object.keys(errors).length === 0;
    };

    const validateTicketForm = () => {
      const errors = {};
      if (!formData.value.title || formData.value.title.trim() === '') errors.title = 'Title is required';
      if (!formData.value.status) errors.status = 'Status is required';
      if (!['open', 'in_progress', 'closed'].includes(formData.value.status)) {
        errors.status = 'Status must be open, in_progress, or closed';
      }
      if (formData.value.description && formData.value.description.length > 500) {
        errors.description = 'Description must be less than 500 characters';
      }
      formErrors.value = errors;
      return Object.keys(errors).length === 0;
    };

    const showToast = (message, type = 'success') => {
      toast.value = { show: true, message, type };
      setTimeout(() => {
        toast.value = { show: false, message: '', type: '' };
      }, 4000);
    };

    const handleNavigate = (page) => {
      currentPage.value = page;
    };

    const requireAuth = (page) => {
      if (!user.value) {
        showToast('Your session has expired — please log in again.', 'error');
        currentPage.value = 'auth';
        return false;
      }
      currentPage.value = page;
      return true;
    };

    const handleAuth = async () => {
      if (!validateAuthForm()) {
        showToast('Please fix the errors in the form', 'error');
        return;
      }
      const newUser = { 
        email: authForm.value.email, 
        name: authForm.value.name || authForm.value.email.split('@')[0] 
      };
      user.value = newUser;
      await setSession(newUser);
      currentPage.value = 'dashboard';
      showToast(`Welcome ${newUser.name}!`, 'success');
    };

    const handleLogout = async () => {
      user.value = null;
      await clearSession();
      currentPage.value = 'landing';
      showToast('Logged out successfully', 'success');
    };

    const saveTickets = async (newTickets) => {
      tickets.value = newTickets;
      await setTickets(newTickets);
    };

    const handleTicketSubmit = async () => {
      if (!validateTicketForm()) {
        showToast('Please fix the errors in the form', 'error');
        return;
      }
      
      if (editingTicket.value) {
        const updated = tickets.value.map(t => 
          t.id === editingTicket.value.id 
            ? { ...formData.value, id: t.id, createdAt: t.createdAt, updatedAt: new Date().toISOString() } 
            : t
        );
        await saveTickets(updated);
        showToast('Ticket updated successfully', 'success');
      } else {
        const newTicket = {
          ...formData.value,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await saveTickets([...tickets.value, newTicket]);
        showToast('Ticket created successfully', 'success');
      }
      closeModal();
    };

    const confirmDelete = (id) => {
      deleteTicketId.value = id;
      showDeleteConfirm.value = true;
    };

    const deleteTicket = async () => {
      await saveTickets(tickets.value.filter(t => t.id !== deleteTicketId.value));
      showDeleteConfirm.value = false;
      deleteTicketId.value = null;
      showToast('Ticket deleted successfully', 'success');
    };

    const openModal = (ticket = null) => {
      if (ticket) {
        editingTicket.value = ticket;
        formData.value = { 
          title: ticket.title, 
          description: ticket.description, 
          priority: ticket.priority, 
          status: ticket.status 
        };
      } else {
        editingTicket.value = null;
        formData.value = { title: '', description: '', priority: 'medium', status: 'open' };
      }
      formErrors.value = {};
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      editingTicket.value = null;
      formData.value = { title: '', description: '', priority: 'medium', status: 'open' };
      formErrors.value = {};
    };

    onMounted(async () => {
      const sessionUser = await getSession();
      const storedTickets = await getTickets();
      if (sessionUser) {
        user.value = sessionUser;
        currentPage.value = 'dashboard';
      }
      tickets.value = storedTickets;
    });

    return {
      currentPage,
      user,
      tickets,
      showModal,
      showDeleteConfirm,
      editingTicket,
      formData,
      formErrors,
      authMode,
      authForm,
      authErrors,
      toast,
      stats,
      handleNavigate,
      requireAuth,
      handleAuth,
      handleLogout,
      handleTicketSubmit,
      confirmDelete,
      deleteTicket,
      openModal,
      closeModal
    };
  }
};
</script>
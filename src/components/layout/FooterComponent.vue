<template>
  <footer class="bg-gray-800 text-white py-12 px-4 mt-auto">
    <div class="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h4 class="text-xl font-bold mb-4 text-primary">SwiftPass</h4>
        <p class="text-sm text-gray-400">
          © 2025 SwiftPass, Inc. All rights reserved.
        </p>
      </div>

      <div>
        <h4 class="font-semibold mb-4 border-b border-primary/50 pb-1">
          Quick Links
        </h4>
        <ul class="space-y-2 text-sm text-gray-300">
          <li>
            <button
              @click="onNavigate('landing')"
              class="hover:text-primary transition"
            >
              Home
            </button>
          </li>
          <li>
            <a href="#" class="hover:text-primary transition"> About Us </a>
          </li>
          <li>
            <a href="#" class="hover:text-primary transition"> Event Guide </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-semibold mb-4 border-b border-primary/50 pb-1">
          Support
        </h4>
        <ul class="space-y-2 text-sm text-gray-300">
          <li>
            <a href="#" class="hover:text-primary transition"> FAQ </a>
          </li>
          <li>
            <a href="#" class="hover:text-primary transition">
              Ticket Guarantee
            </a>
          </li>
          <li>
            <a href="#" class="hover:text-primary transition">
              Contact Support
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  mounted() {
    if (window.lucide) lucide.createIcons();
  },
  methods: {
    onNavigate(page) {
      console.log("Navigate to", page);
    },
  },
};
</script>

<template>
  <div class="min-h-screen flex bg-slate-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div class="px-6 py-6 flex items-center gap-3 border-b border-slate-100">
        <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span class="text-primary font-semibold">E</span>
        </div>
        <div>
          <p class="text-sm font-semibold text-slate-900">E-Commerce</p>
          <p class="text-xs text-slate-500">Admin Panel</p>
        </div>
      </div>

      <nav class="flex-1 px-3 py-4 space-y-1 text-sm">
        <RouterLink
          to="/products"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
          :class="{
            'bg-primary/5 text-primary font-medium':
              $route.name === 'products'
          }"
        >
          <span class="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center" />
          <span>Products</span>
        </RouterLink>
        <!-- Add Dashboard, Orders, Customers if you want (UI only) -->
      </nav>

      <div class="px-3 py-4 border-t border-slate-100 space-y-2">
        <button
          class="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-xs text-slate-600 hover:bg-slate-50"
        >
          <span class="h-4 w-4 rounded-full border border-slate-300" />
          <span>Settings</span>
        </button>
        <button
          @click="logout"
          class="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white py-2 text-sm font-medium hover:bg-primary/90"
        >
          Logout
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <header
        class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8"
      >
        <div class="text-sm text-slate-500">
          <span class="font-semibold text-slate-900">Product Management</span>
        </div>
        <div class="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search"
            class="hidden md:block w-64 rounded-full border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button class="h-9 w-9 rounded-full border border-slate-200" />
          <div class="h-9 w-9 rounded-full bg-primary/10 border border-primary/20" />
        </div>
      </header>

      <main class="flex-1 px-8 py-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push({ name: "login" });
};
</script>

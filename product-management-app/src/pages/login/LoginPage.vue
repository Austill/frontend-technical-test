<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="w-full max-w-md">
      <div class="mb-10 text-center">
        <div
          class="mx-auto mb-3 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white"
        >
          <span class="text-sm font-semibold">PM</span>
        </div>
        <h1 class="text-primary font-semibold text-lg">Platform Logo</h1>
      </div>

      <div class="bg-white rounded-3xl shadow-md px-8 py-8">
        <h2 class="text-xl font-semibold text-center mb-1">Welcome Back</h2>
        <p class="text-sm text-slate-500 text-center mb-6">
          Sign in to manage your products.
        </p>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">
              Email or Username
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="you@example.com"
              class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs"
                @click="showPassword = !showPassword"
              >
                👁
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-600">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="rounded border-slate-300" />
              <span>Remember me</span>
            </label>
            <button type="button" class="text-primary font-medium">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            class="w-full mt-2 rounded-xl bg-primary text-white py-2.5 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
            :disabled="auth.loading"
          >
            <span v-if="!auth.loading">Login</span>
            <span v-else>Signing in...</span>
          </button>

          <p v-if="auth.error" class="text-xs text-red-500 text-center mt-2">
            {{ auth.error }}
          </p>
        </form>
      </div>

      <p class="mt-6 text-xs text-slate-400 text-center">
        © 2024 Platform Inc. All Rights Reserved.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const username = ref("emilys"); // DummyJSON demo user
const password = ref("emilyspass");    // DummyJSON demo password
const showPassword = ref(false);

const handleSubmit = async () => {
  try {
    await auth.login(username.value, password.value);
    router.push({ name: "products" });
  } catch {
    // error handled in store
  }
};
</script>

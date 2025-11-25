<template>
  <AppShell>
    <div v-if="product">
      <div class="flex items-center justify-between mb-6">
        <router-link to="/products" class="text-sm text-gray-600 hover:underline">
          &larr; Back to Products
        </router-link>
        <div>
          <button class="px-4 py-2 mr-2 text-white rounded-md bg-primary hover:bg-opacity-90">Edit</button>
          <button class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <img :src="product.thumbnail" :alt="product.title" class="w-full rounded-lg shadow-md" />
        </div>
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h1 class="mb-2 text-3xl font-bold">{{ product.title }}</h1>
          <p class="mb-4 text-gray-600">{{ product.category }}</p>
          <p class="mb-4 text-3xl font-bold text-primary">${{ product.price }}</p>
          <div class="mb-4">
            <span :class="['px-2 py-1 text-xs font-medium rounded-full', product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
              {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
          <p class="text-gray-700">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../../stores/products'
import AppShell from '../../components/layout/AppShell.vue'
import type { Product } from '../../stores/products'

const route = useRoute()
const productStore = useProductsStore()
const product = ref<Product | null>(null)

onMounted(async () => {
  const productId = Number(route.params.id)
  product.value = await productStore.fetchProductById(productId)
})
</script>

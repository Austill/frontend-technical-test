<template>
  <AppShell>
    <div>
      <h1 class="mb-6 text-2xl font-bold">Add New Product</h1>

      <form @submit.prevent="handleSubmit" class="p-6 bg-white rounded-lg shadow-md">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" v-model="product.title" id="title" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" v-model="product.category" id="category" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
          </div>
          <div class="md:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="product.description" id="description" rows="4" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required></textarea>
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" v-model.number="product.price" id="price" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
          </div>
          <div>
            <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" v-model.number="product.stock" id="stock" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
          </div>
          <div class="md:col-span-2">
            <label for="thumbnail" class="block text-sm font-medium text-gray-700">Thumbnail URL</label>
            <input type="text" v-model="product.thumbnail" id="thumbnail" class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Product Image</label>
            <div class="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg class="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <p class="pl-1">Drag and drop your image here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-6 mt-6 border-t border-gray-200">
          <router-link to="/products" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancel
          </router-link>
          <button type="submit" class="px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../../stores/products'
import AppShell from '../../components/layout/AppShell.vue'
import type { Product } from '../../stores/products'

const router = useRouter()
const productStore = useProductsStore()

const product = ref<Partial<Product>>({
  title: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  thumbnail: '',
})

const handleSubmit = async () => {
  await productStore.addProduct(product.value)
  router.push({ name: 'products' })
}
</script>

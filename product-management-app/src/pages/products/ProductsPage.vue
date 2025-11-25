<template>
  <AppShell>
    <section>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">Products</h1>
          <p class="text-sm text-slate-500">
            Manage your inventory and view product performance.
          </p>
        </div>
        <RouterLink
          to="/products/new"
          class="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2.5 text-sm font-medium hover:bg-primary/90"
        >
          <span class="text-lg leading-none">＋</span>
          <span>Add New Product</span>
        </RouterLink>
      </div>

      <!-- Filters -->
      <div
        class="bg-white rounded-2xl border border-slate-200 px-4 py-3 mb-4 flex flex-col md:flex-row gap-3 md:items-center"
      >
        <div class="flex-1 relative">
          <span class="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
          <input
            v-model="search"
            type="search"
            placeholder="Search by product name..."
            class="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <select
          v-model="categoryFilter"
          class="rounded-xl border border-slate-200 px-3 py-2 text-sm min-w-[150px]"
        >
          <option value="">Category</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>

        <select
          v-model="stockFilter"
          class="rounded-xl border border-slate-200 px-3 py-2 text-sm min-w-[150px]"
        >
          <option value="">Stock Status</option>
          <option value="in">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-slate-500">
            <tr>
              <th class="text-left font-medium px-6 py-3">Product</th>
              <th class="text-left font-medium px-6 py-3">Category</th>
              <th class="text-left font-medium px-6 py-3">Price</th>
              <th class="text-left font-medium px-6 py-3">Stock</th>
              <th class="w-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="store.loading"
              class="border-t border-slate-100"
            >
              <td colspan="5" class="px-6 py-6 text-center text-slate-400">
                Loading products...
              </td>
            </tr>

            <tr
              v-else-if="filteredProducts.length === 0"
              class="border-t border-slate-100"
            >
              <td colspan="5" class="px-6 py-6 text-center text-slate-400">
                No products found.
              </td>
            </tr>

            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="border-t border-slate-100 hover:bg-slate-50 cursor-pointer"
              @click="goToDetails(product.id)"
            >
              <td class="px-6 py-3">
                <div class="flex items-center gap-3">
                  <img
                    :src="product.thumbnail"
                    alt=""
                    class="h-10 w-10 rounded-full object-cover bg-slate-100"
                  />
                  <div>
                    <p class="font-medium text-slate-900">
                      {{ product.title }}
                    </p>
                    <p class="text-xs text-slate-500 max-w-xs truncate">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-3">
                <span
                  class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="categoryBadgeClass(product.category)"
                >
                  {{ formatCategory(product.category) }}
                </span>
              </td>
              <td class="px-6 py-3">
                {{ formatCurrency(product.price) }}
              </td>
              <td class="px-6 py-3">
                <div class="flex items-center gap-2">
                  <span
                    class="h-2.5 w-2.5 rounded-full"
                    :class="stockDotClass(product.stock)"
                  />
                  <span class="text-xs text-slate-700">
                    {{ stockLabel(product.stock) }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-3 pr-4 text-right">
                <button
                  class="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-lg"
                  @click.stop
                >
                  ⋮
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {{ filteredProducts.length }} results</span>
          <div class="flex gap-2">
            <button
              class="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center"
            >
              ‹
            </button>
            <button
              class="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "../../stores/products";
import AppShell from "../../components/layout/AppShell.vue";
import { useRouter } from "vue-router";

const store = useProductsStore();
const router = useRouter();

const search = ref("");
const categoryFilter = ref("");
const stockFilter = ref("");

onMounted(() => {
  if (!store.products.length) {
    store.fetchProducts();
  }
});

const categories = computed(() => {
  const set = new Set(store.products.map((p) => p.category));
  return Array.from(set).sort();
});

const filteredProducts = computed(() => {
  return store.products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchesCategory =
      !categoryFilter.value || p.category === categoryFilter.value;

    let matchesStock = true;
    if (stockFilter.value === "in") matchesStock = p.stock > 20;
    if (stockFilter.value === "low") matchesStock = p.stock > 0 && p.stock <= 20;
    if (stockFilter.value === "out") matchesStock = p.stock === 0;

    return matchesSearch && matchesCategory && matchesStock;
  });
});

const goToDetails = (id: number) => {
  router.push({ name: "product-details", params: { id } });
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const formatCategory = (c: string) => {
  if (!c) return "";
  return c.charAt(0).toUpperCase() + c.slice(1);
};

const categoryBadgeClass = (category: string) => {
  if (category.includes("grocer")) {
    return "bg-purple-50 text-purple-600";
  }
  if (category.includes("apparel") || category.includes("clothing")) {
    return "bg-rose-50 text-rose-600";
  }
  return "bg-sky-50 text-sky-600";
};

const stockDotClass = (stock: number) => {
  if (stock === 0) return "bg-rose-500";
  if (stock <= 20) return "bg-amber-400";
  return "bg-emerald-500";
};

const stockLabel = (stock: number) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 20) return `${stock} Low Stock`;
  return `${stock} In Stock`;
};
</script>

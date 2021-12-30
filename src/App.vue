<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useFormatting } from "./composables/useFormatting"

const store = useStore()
const router = useRouter()
const formatting = useFormatting()

const tab = ref('verifying')

const menuItems = ref([
  {
    name: 'About',
    click: () => router.push('/about')
  }
])

const connectAddress = computed(() => {
  return `Connected to ${formatting.simplifyAddress(store.getters.account)}`
})

async function connectWallet() {
  await store.dispatch('connectWallet')
}

onBeforeMount(async () => {
  await store.dispatch('readOnlyConnect')
})
</script>

<template>
  <q-layout>

    <q-toolbar>

      <q-btn
          flat
          dense
          label="DevDIDs"
          icon="cast"
          @click="$router.replace('/')"
      />

      <q-toolbar-title>
        <q-tabs
            v-model="tab"
            dense
            indicator-color="transparent"
            active-class = "drawer_tab2"
            class="bg-white text-black q-mt-sm the_tab"
            style="max-width: fit-content;
            text-align: center;
            margin: 10px auto 0 45%;
            border-radius: 20px;
            position: center;"
        >
          <q-route-tab
              class="drawer_tab"
              name="holding"
              label="Holding"
              to="/holder"
          />

          <q-route-tab
              class="drawer_tab"
              name="verifying"
              label="Verifying"
              to="/verify"
          />

          <q-route-tab
              class="drawer_tab"
              name="issuing"
              label="Issuing"
              to="/issue"
          />

        </q-tabs>
      </q-toolbar-title>

      <q-btn
          v-if="!store.getters.account"
          class="q-mr-md"
          rounded
          color="pink"
          outline
          @click="connectWallet"
      >
        Connect Wallet
      </q-btn>
      <q-btn
          v-else
          class="q-mr-md"
          rounded
          color="green"
      >
        {{ connectAddress }}
      </q-btn>

      <q-btn
          style="background-color: white"
          flat
          rounded
          icon="more_horiz"
          aria-label="Menu"
      >
        <q-menu auto-close>
          <q-list style="min-width: 100px">

            <q-item
                v-for="(menuItem, i) in menuItems"
                :key="i"
                @click="menuItem.click"
                clickable
            >
              <q-item-section>{{ menuItem.name }}</q-item-section>
            </q-item>

          </q-list>
        </q-menu>
      </q-btn>

    </q-toolbar>


    <q-page-container class="q-layout-container overflow-hidden">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(#f7ebf3, #f7f8fa);
}

.the_tab
{
  position:relative;
  right:40px;
}

.drawer_tab {
  margin: 4px;
  border-radius: 20px;
}

.drawer_tab2 {
  /* background-color:#9BFF9E !important;
  color:#11A816 !important; */
  background-color:#E6E6E6 !important;
  color:#000 !important;
}
</style>
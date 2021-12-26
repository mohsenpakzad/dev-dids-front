<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('verifying')
</script>

<template>
  <q-layout>

    <q-toolbar>

      <div>DevDIDs</div>

      <q-toolbar-title>
        <q-tabs
            v-model="tab"
            class="bg-white text-black"
            style="max-width: fit-content; text-align: center; margin: 10px auto 0 45%; border-radius: 20px"
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
          class="q-mr-md"
          rounded
          color="pink"
          outline
      >
        Connect Wallet
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
            <q-item clickable>
              <q-item-section>New tab</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>History</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Downloads</q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable>
              <q-item-section>Help &amp; Feedback</q-item-section>
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

.drawer_tab {
  margin: 4px;
  border-radius: 20px;
}
</style>
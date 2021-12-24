<script setup lang="ts">
import { ref } from 'vue'

</script>

<template>
  <q-layout>

    <q-toolbar>

      <div>DevDIds</div>

      <q-toolbar-title >
                <q-tabs

                    v-model="tab"

                    class="bg-white text-black"
                    style="max-width: fit-content; text-align: center; margin: 10px auto 0 45%; border-radius: 20px"
                >
                  <q-tab name="Verify"  label="Verify" class="drawer_tab"/>
                  <q-tab name="Issue"  label="Issue" class="drawer_tab"/>
                  <q-tab name="Create Vp"  label="Create Vp" class="drawer_tab"/>
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

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  background-image: linear-gradient(#f7ebf3, #f7f8fa);
}
.drawer_tab {
  margin: 4px;
  border-radius: 20px;
}
</style>
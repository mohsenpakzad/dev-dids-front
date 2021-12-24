<script setup lang="ts">
import { ref } from 'vue'

</script>

<template>
  <q-layout>

    <q-toolbar>

      <div>DevDIds</div>

      <q-toolbar-title>
        <!--        <q-tabs-->
        <!--            stretch-->
        <!--            v-model="tab"-->
        <!--            inline-label-->
        <!--            class="bg-purple text-white shadow-2"-->
        <!--        >-->
        <!--          <q-tab name="mails" icon="mail" label="Mails" />-->
        <!--          <q-tab name="alarms" icon="alarm" label="Alarms" />-->
        <!--          <q-tab name="movies" icon="movie" label="Movies" />-->
        <!--        </q-tabs>-->
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-image: linear-gradient(#f7ebf3, #f7f8fa);
}
</style>
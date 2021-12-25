<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

const verify = reactive({
  vpId: '',
  holder: '',
  date: '',
})
</script>

<template>

  <q-page
      class="row items-center justify-evenly"
      style="min-height: 700px"
  >

    <q-card
        class="q-px-lg q-pb-lg"
        style="min-width: 50em; border-radius: 30px"
        flat
        bordered
    >

      <div class="q-pa-md q-gutter-sm">
        <q-banner inline-actions rounded class="text-white bg-red">
          You have lost connection to the internet. This app is offline.

        <template v-slot:action>
          <q-btn flat label="Turn ON Wifi" />
          <q-btn flat label="Dismiss" />
        </template>
        </q-banner>
      </div>

      <q-card-section>
        Verify
      </q-card-section>

      <q-form
          class="q-gutter-md"
      >
        <q-input
            filled
            v-model="verify.vpId"
            label="Verifiable Presentation Id"
            lazy-rules
            :rules="[ val => val !== null && val !== '' || 'Please type vpId']"
        />

        <q-input
            filled
            v-model="verify.holder"
            label="Holder Address"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type holder Address'
        ]"
        />

        <q-input
            filled
            v-model="verify.date"
            label="Verifiable Presentation Date"
            mask="date"
            :rules="['date']"
        >

          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="verify.date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

        </q-input>


        <div>
          <q-btn label="Verify" type="submit" color="primary"/>
        </div>
      </q-form>

    </q-card>
  </q-page>
</template>
<style scoped>
* {
  text-align: center;
}
</style>

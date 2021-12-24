<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

const issue = reactive({
  to: '',
  subject: '',
  data: '',
  validFrom: '',
  validTo: ''
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

      <q-card-section>
        Issue
      </q-card-section>

      <q-form
          class="q-gutter-md"
      >
        <q-input
            filled
            v-model="issue.to"
            label="To"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
            filled
            v-model="issue.subject"
            label="Subject"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
        />

        <q-input
            filled
            v-model="issue.validFrom"
            label="Valid From"
            mask="date"
            :rules="['date']"
        >

          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="issue.validFrom">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

        </q-input>


        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
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

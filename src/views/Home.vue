<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

const issue = reactive({
  to: '',
  subject: '',
  data: '',
  validFrom: '',
  validTo: ''
})

const tab =  ref('Issues')

</script>



<template>

  <q-page
      class="row items-center justify-evenly"
      style="min-height: 700px"
  >

    <q-card
        class="q-px-lg q-pb-lg"
        style="min-width: 50em;
        margin:20px;
          border-radius: 5px;
          padding:0px !important;"
        flat
        bordered
    >

      <q-tabs
        v-model="tab"
        align="justify"
        class="bg-grey-3"
      >
        <q-tab class="text-green" name="Issues" icon="check_circle" label="Issue" style="padding:10px 0px 10px 0px !important;"/>
        <q-tab class="text-red" name="Revokes" icon="delete_forever" label="Revoke" style="fpadding:10px 0px 10px 0px !important;"/>
        <q-tab name="movies" icon="movie" label="Movies" style="padding:10px 0px 10px 0px !important;"/>
      </q-tabs>

      <template v-if="tab==='Issues'">
        <q-card-section class="div_issuer_header">
          <q-icon color="green" name="check_circle"/>
          Issue
        </q-card-section>

        <q-form
            class="q-gutter-md the_form"
        >
          <q-input
              outlined
              v-model="issue.to"
              label="To (Address)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
              outlined
              v-model="issue.subject"
              label="Subject"
              lazy-rules
              :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
          />

          <q-input
              outlined
              v-model="issue.data"
              label="Data"
              lazy-rules
              :rules="[
            val => val !== null && val !== '' || 'Please type your data',
          ]"
          />

          <q-input
              outlined
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


          <q-input
              outlined
              v-model="issue.validTo"
              label="Valid To"
              mask="date"
              :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="issue.validTo">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>


          <div>
            <q-btn label="Submit" type="submit" icon="send" color="secondary"/>
            <q-btn label="Reset" type="reset" icon-right="cancel" color="red" class="q-ml-sm"/>
          </div>
        </q-form>
      </template>


      <template v-if="tab==='Revokes'">
        <q-card-section class="div_issuer_header">
          <q-icon color="red" name="delete_forever"/>
          Revoke
        </q-card-section>
      </template>

    </q-card>


  </q-page>
</template>
<!-- font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif !important;

  font-family: "Samim", Avenir, Helvetica, Arial, sans-serif; -->

<style scoped>
* {
  text-align: center;
}

.ui.raised.segment {
    -webkit-box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);
    box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);
}

.div_issuer_header {
    margin: 30px 0px 0px 0px !important;
    font-size: 1.71428571rem;
    line-height: 1.28571429em;
    font-weight: 500;
    padding: 0;
}

.the_form
{
  padding:30px !important;
}

</style>

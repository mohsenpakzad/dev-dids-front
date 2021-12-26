<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

const verify = reactive({
  vpId: '',
  holder: '',
  date: '',
})

const tab =  ref('verifies')

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
        <q-tab class="text-green" name="verifies" icon="check_circle" label="Verify" style="padding:10px 0px 10px 0px !important;"/>

      </q-tabs>

      <template v-if="tab==='verifies'">
        <q-card-section class="div_issuer_header">
          <q-icon color="green" name="check_circle"/>
          Verify
        </q-card-section>

        <q-form
            class="q-gutter-md the_form"
        >
          <q-input
              outlined
              v-model="verify.vpId"
              label="Verifiable Presentation Id"
              lazy-rules
              :rules="[ val !== null && val !== '' || 'Please type Id']"
          />

          <q-input
              outlined
              v-model="verify.holder"
              label="Address of Holder"
              lazy-rules
              :rules="[
            val => val !== null && val !== '' || 'Please type address of holder'
          ]"
          />

          <q-input
              outlined
              v-model="verify.date"
              label="Date"
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
            <q-btn label="Verify" type="submit" icon="done_all" color="secondary"/>
          </div>
        </q-form>
<!-- 
        <div class="q-pa-md q-gutter-sm">
          <q-banner class="bg-grey-3">
            <template v-slot:avatar>
              <q-icon name="verified" color="primary" />
            </template>
              This Verifiable Presentation is valid

            <template v-slot:action>  
              <q-btn flat label="Dismiss" />
            </template>
          </q-banner>
        </div> -->

        <div class="q-pa-md q-gutter-sm">
          <q-banner inline-actions rounded class="text-white bg-red">
            Unfortunately! This Verifiable Presentation is not Valid. The reason is that ....

            <template v-slot:action>
              <q-btn flat label="Dismiss" />
            </template>
          </q-banner>
        </div>

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

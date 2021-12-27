<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRepository } from "../composables/useRepository";

const repository = useRepository()

const verify = reactive({
  base64Vp: '',
  holderAddress: '',
})

const tab = ref('verifies')

</script>

<template>

  <q-page
      class="items-center justify-evenly"
      style="min-height: 700px"
  >

    <q-card
        class="q-px-lg q-pb-lg"
        style="width:95%;
        max-width: 1000px;
        border-radius: 5px;
        padding:0px 0px 20px 0px !important;
        margin:20px auto 20px !important;"
        flat
        bordered
    >

      <q-tabs
          v-model="tab"
          align="justify"
          class="bg-grey-3"
      >
        <q-tab class="text-green" name="verifies" icon="verified" label="Verify"
               style="padding:10px 0px 10px 0px !important;"/>

      </q-tabs>

      <template v-if="tab==='verifies'">
        <q-card-section class="div_issuer_header">
          <q-icon color="green" name="how_to_reg"/>
          Verify
        </q-card-section>

        <q-form
            class="q-gutter-md the_form"
        >
          <q-input
              outlined
              v-model="verify.base64Vp"
              label="Verifiable Presentation"
          />

          <q-input
              outlined
              v-model="verify.holderAddress"
              label="Address of Holder"
          />

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
            Unfortunately! This Verifiable Presentation is not Valid. Its date is expired.

            <!-- <template v-slot:action>
              <q-btn flat label="Dismiss" />
            </template> -->
          </q-banner>
        </div>

      </template>


    </q-card>


  </q-page>
</template>

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

.the_form {
  padding: 30px !important;
}

</style>

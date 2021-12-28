<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useEthereum } from '../composables/useEthereum'

const ethereum = useEthereum()


const verifyForm = reactive({
  base64Vp: '',
  holderAddress: '',
})

const loading = ref(false)
const verifyResult = ref<Array<string | boolean>>([])

async function verify() {
  loading.value = true

  try {
    verifyResult.value = await ethereum.verify(
        verifyForm.base64Vp,
        verifyForm.holderAddress,
        10 // TODO: bind this to current date timestamp
    )
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

function reset() {
  verifyForm.base64Vp = ''
  verifyForm.holderAddress = ''
  verifyResult.value = []
}
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
        padding:0 0 20px 0 !important;
        margin:20px auto 20px !important;"
        flat
        bordered
    >

      <q-tabs
          align="justify"
          class="bg-grey-3"
      >
        <q-tab
            class="text-green"
            icon="verified"
            label="Verify"
            name="verify"
            style="padding:10px 0 10px 0 !important;"
        />
      </q-tabs>

      <q-card-section class="div_issuer_header">
        <q-icon color="green" name="how_to_reg"/>
        Verify
      </q-card-section>

      <q-form
          class="q-gutter-md the_form"
      >
        <q-input
            outlined
            v-model="verifyForm.base64Vp"
            type="textarea"
            autogrow
            clearable
            clear-icon="clear"
            label="Verifiable Presentation"
        />

        <q-input
            outlined
            v-model="verifyForm.holderAddress"
            label="Address of Holder"
            clearable
            clear-icon="clear"
        />

        <q-btn
            label="Verify"
            type="submit"
            icon="done_all"
            color="secondary"
            :loading="loading"
            @click.prevent="verify"
        />
      </q-form>

      <template v-if="verifyResult[0] === true" class="q-pa-md q-gutter-sm">
        <q-banner inline-actions class="bg-grey-3">

          <template v-slot:avatar>
            <q-icon name="verified" color="primary"/>
          </template>

          This Verifiable Presentation is valid

          <template v-slot:action>
            <q-btn flat label="Reset Form" @click="reset"/>
          </template>

        </q-banner>
      </template>

      <template v-else-if="verifyResult[0] === false" class="q-pa-md q-gutter-sm">
        <q-banner inline-actions rounded class="text-white bg-red">

          <template v-slot:avatar>
            <q-icon name="gpp_bad" color="white"/>
          </template>

          {{ verifyResult[1] }}

          <template v-slot:action>
            <q-btn flat label="Reset" @click="reset"/>
          </template>

        </q-banner>
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

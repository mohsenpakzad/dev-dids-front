<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useEthereum } from '../composables/useEthereum'
import { useFieldRules } from '../composables/useFieldRules'
import { useUtils } from '../composables/useUtils'
import { useFormatting } from '../composables/useFormatting'

import { BigNumber } from 'ethers'

const ethereum = useEthereum()
const fieldRules = useFieldRules()
const utils = useUtils()
const formatting = useFormatting()


const columns = [
  {
    name: 'subject',
    required: true,
    label: 'subject',
    align: 'left',
    field: 'subject'
  },
  {
    name: 'issuer',
    align: 'center',
    label: 'Issuer',
    field: 'issuer',
    sortable: true
  },
  {
    name: 'data',
    label: 'Data',
    field: 'data',
    sortable: true
  },
  {
    name: 'validFrom',
    label: 'Issuance Date',
    field: (row: any) => formatting.timestampToStringDate(row.validFrom.toNumber())
  },
  {
    name: 'validTo',
    label: 'Expiration Date',
    field: (row: any) => formatting.timestampToStringDate(row.validTo.toNumber())
  }
]

const verifyForm = reactive({
  base64Vp: '',
  holderAddress: '',
})

const loading = ref(false)
const tab = ref('verify')
const verifyResult = ref<Array<string | boolean>>([])
const verifiedVcs = ref<any>([])

async function getVcs(vcIds: BigNumber[]) {
  const devDIDs = ethereum.devDIDs()

  verifiedVcs.value = []
  for (let i = 0; i < vcIds.length; i++) {
    if (vcIds[i].isZero()) continue

    const myVc = await devDIDs.getVc(vcIds[i])
    verifiedVcs.value.push({...myVc, id: vcIds[i]})
  }
}

async function verify() {
  loading.value = true

  try {
    verifyResult.value = await ethereum.verify(
        verifyForm.base64Vp,
        verifyForm.holderAddress,
        utils.getCurrentTimestamp()
    )

    // parse verified vcs
    const stringVp = atob(verifyForm.base64Vp)
    const vp = JSON.parse(stringVp)
    await getVcs(vp[0].map((e: any) => BigNumber.from(e)))
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
          v-model="tab"
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
            :rules="[fieldRules.required, fieldRules.validVp]"
        />

        <q-input
            outlined
            v-model="verifyForm.holderAddress"
            label="Address of Holder"
            clearable
            clear-icon="clear"
            :rules="[fieldRules.required, fieldRules.ethereumAddress]"
        />

        <q-btn
            class="q-px-lg q-py-sm btn_verifier"
            padding="10"
            label="Verify"
            type="submit"
            icon="done_all"
            color="secondary"
            :loading="loading"
            @click.prevent="verify"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left"/>
            Verifying...
          </template>
          <!--          <template v-slot:loading>-->
          <!--            <q-icon name="verified"/>-->
          <!--            Verifying...-->
          <!--          </template>-->
        </q-btn>
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

        <q-table
            class="q-pa-md"
            title="Verified Vcs"
            :rows="verifiedVcs"
            :columns="columns"
            row-key="id"
            grid
            hide-header
        >

          <template v-slot:item="props" class="card_container1">

            <div
                class="q-pa-lg grid-style-transition center_horizon card_container2"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card :class="props.selected ? 'bg-grey-2 card_container3' : 'card_container3'">

                <q-card-section>
                  {{ props.row.subject }}
                </q-card-section>

                <q-separator/>

                <q-list dense class="card_container2">

                  <q-item
                      v-for="col in props.cols"
                      :key="col.name"
                  >

                    <q-item-section>

                      <q-item-label>
                        <q-icon
                            rounded
                            color="blue-grey-4"
                            size="25px"
                            name="title"
                            v-if="col.label === 'Data'"
                        />
                        <q-icon
                            rounded
                            color="teal-5"
                            size="25px"
                            name="verified"
                            v-else-if="col.label === 'Issuer'"
                        />
                        <q-icon
                            rounded
                            color="accent"
                            size="25px"
                            name="subject"
                            v-else-if="col.label === 'subject'"
                        />
                        <q-icon
                            rounded
                            color="green-6"
                            size="25px"
                            name="today"
                            v-else-if="col.label === 'Issuance Date'"
                        />
                        <q-icon
                            rounded
                            style="color:#F31E48"
                            size="25px"
                            name="today"
                            v-if="col.label === 'Expiration Date'"
                        />
                        {{ col.label }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label
                          caption
                          style="padding:11px 0 11px 0 !important;"
                          v-if="col.label === 'Issuer'"
                      >
                        {{ formatting.formatLongStrings(col.value) }}
                      </q-item-label>
                      <q-item-label
                          caption
                          style="padding:11px 0 11px 0 !important;"
                          v-else
                      >
                        {{ col.value }}
                      </q-item-label>
                    </q-item-section>

                  </q-item>
                </q-list>

              </q-card>
            </div>

          </template>

        </q-table>

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

.div_issuer_header {
  margin: 30px 0 0 0 !important;
  font-size: 1.71428571rem;
  line-height: 1.28571429em;
  font-weight: 500;
  padding: 0;
  text-align: center !important;
}

.btn_verifier {
  display: block !important;
  margin: 20px auto 0 !important;
}

.the_form {
  padding: 30px !important;
}

.card_container1 {
  display: flex !important;
  flex-wrap: wrap !important;
}

.card_container2 {
  margin: 0 auto 0 !important;
}

</style>

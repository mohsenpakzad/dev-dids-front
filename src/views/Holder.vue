<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store'
import { useEthereum } from '../composables/useEthereum'
import { BigNumber } from 'ethers'
import { useFormatting } from '../composables/useFormatting'

import BannerConnectWallet from '../components/BannerConnectWallet.vue'

const store = useStore()
const ethereum = useEthereum()
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

const loading = ref(false)
const tab = ref('holder')
const deleting = ref(false)
const selectedVcs = ref<any[]>([])

const minDate = ref('')
const maxDate = ref('')
const model = ref({from: minDate.value, to: maxDate.value})

const confirmDeleteDialog = ref(false)
const generatedVpDialog = ref(false)
const copyVpDialog = ref(false)
const setVpDateDialog = ref(false)
const wrongDateRangeDialog = ref(false)
const generatedVp = ref<any>(null)
const searchFilter = ref('')

function copy() {
  navigator.clipboard.writeText(generatedVp.value[1]);
  copyVpDialog.value = true
}

async function setDates() {
  if (!store.account) return

  await allowableRange()
  setVpDateDialog.value = true
  console.log(minDate.value.substring(0, 7))
}

async function generateVp() {
  loading.value = true

  if (minDate.value > model.value.from || model.value.from > maxDate.value
      || model.value.to > maxDate.value || model.value.to < minDate.value) {
    loading.value = false
    wrongDateRangeDialog.value = true

    return
  }
  try {
    const vcIds = selectedVcs.value.map(vc => BigNumber.from(vc.id))
    generatedVp.value = await ethereum.generateVp(
        vcIds,
        formatting.stringDateToTimestamp(model.value.from),
        formatting.stringDateToTimestamp(model.value.to)
    )

    console.log()
    generatedVpDialog.value = true
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

function allowableRange() {
  let max = selectedVcs.value[0].validFrom
  let min = selectedVcs.value[0].validTo

  for (let i = 1, len = selectedVcs.value.length; i < len; i++) {
    let v1 = selectedVcs.value[i].validFrom
    let v2 = selectedVcs.value[i].validTo
    max = (v1 > max) ? v1 : max
    min = (v2 < min) ? v2 : min
  }

  minDate.value = formatting.timestampToStringDate(max.toNumber())
  maxDate.value = formatting.timestampToStringDate(min.toNumber())

  console.log(minDate.value, maxDate.value)
}

async function deleteVcs() {
  deleting.value = true
  try {
    const devDIDs = ethereum.devDIDs()
    const vcIds = selectedVcs.value.map(vc => BigNumber.from(vc.id))
    for (let i = 0; i < vcIds.length; i++) {
      const deleteTxn = await devDIDs.delete_(vcIds[i])
      const recipient = await deleteTxn.wait()
      console.log(recipient)
    }
    await store.fetchUserHeldVcs()
  } catch (err) {
    console.log(err)
  } finally {
    deleting.value = false
  }
}

function openDeleteDialog() {
  if (!store.account || selectedVcs.value.length === 0) return
  confirmDeleteDialog.value = true
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
            class="text-accent"
            name="holder"
            icon="account_circle"
            label="Holder"
        />
      </q-tabs>

      <q-card-section class="div_issuer_header">
        <q-icon name="badge" color="accent"/>
        Your Verifiable Credentials
      </q-card-section>

      <div
          v-if="store.loadingHeldVcs"
          class="row justify-center q-pa-xl"
      >
        <q-spinner
            color="pink"
            size="3em"
        />
      </div>

      <q-table
          v-else
          class="q-pa-md"
          :rows="store.userHeldVcs"
          :columns="columns"
          row-key="id"
          selection="multiple"
          v-model:selected="selectedVcs"
          grid
          hide-header
          :filter="searchFilter"
      >
        <template v-slot:top-right>
          <q-input
              v-model="searchFilter"
              dense
              debounce="300"
              placeholder="Search"
              color="accent"
          >
            <template v-slot:append>
              <q-icon name="search" color="accent"/>
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">


          <div
              class="q-pa-lg grid-style-transition center_horizon"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card :class="props.selected ? 'bg-grey-2' : ''">

              <q-card-section>
                <q-checkbox
                    dense
                    v-model="props.selected"
                    :label="props.row.subject"
                />
              </q-card-section>

              <q-separator/>

              <q-list dense>

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


      <div style="text-align: center">

        <q-btn
            color="secondary"
            @click="setDates"
            :loading="loading"
        >
          <q-icon name="settings_suggest" style="margin-right: 5px;"></q-icon>
          Generate VP

          <template v-slot:loading>
            <q-spinner-gears class="on-left"/>
            Generating...
          </template>

          <q-popup-proxy v-if="!store.account">
            <BannerConnectWallet/>
          </q-popup-proxy>
        </q-btn>

        <q-dialog v-model="setVpDateDialog">
          <q-card>
            <q-card-section bg-gray>


              <div class="q-pa-md">
                <div class="q-pb-sm">
                  Pick A Validity Range


                </div>

                <div class="q-pb-sm">
                  From {{ model.from }} To {{ model.to }}
                </div>
                <q-date v-model="model" range

                />


              </div>


            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat label="Cancel" color="gray" v-close-popup/>
              <q-btn flat label="Generate"
                     @click="generateVp"
                     color="primary"
                     v-close-popup/>
            </q-card-actions>

          </q-card>
        </q-dialog>
        <q-dialog v-model="wrongDateRangeDialog" position='top'>
          <q-card style="width: 350px">
            <q-linear-progress :value="1" color="red"/>

            <q-card-section class="row items-center no-wrap">
              <div>
                <div class="text-weight-bold">Your Validation dates must be between {{ minDate }} and {{ maxDate }}
                </div>

              </div>

            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog
            v-model="generatedVpDialog"
            transition-show="scale"
            transition-hide="scale"
        >

          <q-card class="dialog_info">
            <q-card-section class="items-center dialog_header_info">
              <q-avatar
                  size="50px"
                  font-size="28px"
                  color="warning"
                  icon="info"
                  text-color="white"
                  class="avatar_info"
              />
              <span class="q-ml-sm header_info">Information of the VP</span>
            </q-card-section>

            <q-list
                class="shadow-2 rounded-borders"
                style="margin:0 auto 0;width:95%;"
            >
              <!-- Holder Begins -->
              <q-item>
                <q-item-section avatar>
                  <q-icon rounded color="teal" size="34px" name="manage_accounts"/>
                </q-item-section>

                <div class="dialog_info_items1">Holder</div>
                <div class="dialog_info_items2">:</div>
                <div class="dialog_info_items3">{{ formatting.formatLongStrings(store.account) }}</div>
              </q-item>
              <!-- Holder Ends -->

              <q-separator inset/>

              <!-- Subject Begins -->
              <q-item>
                <q-item-section avatar>
                  <q-icon rounded color="blue-grey-4" size="34px" name="title"/>
                </q-item-section>
                <div class="dialog_info_items1">User VCs</div>
                <div class="dialog_info_items2">:</div>
                <div class="dialog_info_items3">
                  <span v-for="vc in generatedVp[0].vcs">{{ vc._hex }}, </span>
                </div>
              </q-item>
              <!-- Subject Ends -->

              <q-separator inset/>

              <!-- Date Begins -->
              <q-item>
                <q-item-section avatar>
                  <q-icon rounded size="34px" name="auto_delete" style="color:#F31E48;"/>
                </q-item-section>
                <div class="dialog_info_items1">Validity</div>
                <div class="dialog_info_items2">:</div>
                <div class="dialog_info_items3">
                  From {{ formatting.timestampToStringDate(generatedVp[0].validFrom.toNumber()) }} To
                  {{ formatting.timestampToStringDate(generatedVp[0].validTo.toNumber()) }}
                </div>
              </q-item>
              <!-- Date Ends -->

              <q-separator inset/>

              <q-item>
                <q-item-section avatar>
                  <q-icon rounded size="34px" name="code" style="color:#000000;"/>

                </q-item-section>
                <div class="dialog_info_items1">Verify Code</div>
                <div class="dialog_info_items2">:</div>
                <div class="dialog_info_items3">
                  {{ formatting.formatLongStrings(generatedVp[1]) }}
                  <q-btn flat dense>
                    <q-icon
                        @click="copy"
                        rounded
                        name="content_copy"
                        size="20px"
                        style="color:gray;"
                    />

                  </q-btn>

                  <q-dialog v-model="copyVpDialog" position='right'>
                    <q-card style="width: 350px">
                      <q-linear-progress :value="1" color="green"/>

                      <q-card-section class="row items-center no-wrap">
                        <div>
                          <div class="text-weight-bold">Verify Code Copied Successfully!</div>

                        </div>

                      </q-card-section>
                    </q-card>
                  </q-dialog>


                </div>

              </q-item>

            </q-list>


            <!-- Notice v-close-popup -->
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup/>
            </q-card-actions>
          </q-card>

        </q-dialog>


        <q-btn
            label="Delete"
            type="Delete"
            color="red"
            icon-right="delete_forever"
            :loading="deleting"
            @click="openDeleteDialog"
            style="margin-left: 5px; width: 130px;"
        >
          <template v-slot:loading>
            Deleting...
            <q-spinner class="on-right"/>
          </template>

          <q-popup-proxy v-if="!store.account">
            <BannerConnectWallet/>
          </q-popup-proxy>
        </q-btn>

        <q-dialog v-model="confirmDeleteDialog">
          <q-card>

            <q-card-section class="row items-center">
              <q-avatar font-size="40px" icon="delete_forever" text-color="red"/>
              <span class="q-ml-xs">Are you sure You want to delete
                these VCs?</span>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat label="Cancel" color="primary" v-close-popup/>
              <q-btn
                  flat label="Delete"
                  @click="deleteVcs"
                  color="red"
                  v-close-popup
              />
            </q-card-actions>

          </q-card>
        </q-dialog>

      </div>
    </q-card>
  </q-page>
</template>


<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>

<style>
.div_issuer_header {
  margin: 30px 0 0 0 !important;
  font-size: 1.71428571rem;
  line-height: 1.28571429em;
  font-weight: 500;
  padding: 0;
  text-align: center;
}


.dialog_info_items1, .dialog_info_items2,
.dialog_info_items3 {
  min-width: 40px;
  text-align: left !important;
  font-size: 15px;
  display: table-cell !important;
  padding-top: 10px;
}

.dialog_info_items1 {
  width: 13% !important;
  min-width: 50px !important;
}

.dialog_info_items2 {
  width: 1% !important;
}

.dialog_info_items3 {
  width: 70% !important;
}

.dialog_header_info {
  background-color: #F0E68E !important;
  margin-bottom: 5px;
}

.avatar_info {
  display: block !important;
  margin: 0 auto 10px !important;
}

.header_info {
  display: block !important;
  font-size: 18px !important;
  text-align: center;
}

.dialog_info {
  width: 95% !important;
  max-width: 600px !important;
}

.center_horizon {
  margin: 0 auto 0 !important;
}

</style>
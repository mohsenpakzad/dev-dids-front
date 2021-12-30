<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useEthereum } from '../composables/useEthereum'
import { useFieldRules } from '../composables/useFieldRules'
import { useFormatting } from '../composables/useFormatting'


const store = useStore()
const ethereum = useEthereum()
const fieldRules = useFieldRules()
const formatting = useFormatting()


const issueForm = reactive({
  holder: '',
  subject: '',
  data: '',
  validFrom: '',
  validTo: ''
})

const tab = ref('Issues')
const vcId = ref(0)
const selectedVc = ref(0)
const vcStat = ref(false)

const columns = ref([
  {
    name: 'holder',
    required: true,
    label: 'Holder',
    align: 'center',
    field: 'holder',
    headerStyle: 'font-size:17px',
  },
  {name: 'subject', align: 'center', label: 'Subject', field: 'subject', headerStyle: 'font-size:17px'},
  {name: 'data', align: 'center', label: 'Data', field: 'data', headerStyle: 'font-size:17px'},
  {name: 'more', align: 'center', label: 'Status  , Revoke', field: 'more', headerStyle: 'font-size:17px'},
])


const dialog = ref(false)
const confirm = ref(false)
const prompt = ref(false)
const alert = ref(false)
const error_kind = ref('')


async function issue() {
  
  if(store.getters.account.toLowerCase() == issueForm.holder.toLowerCase())
  {
    alert.value = true
    error_kind.value = '1'
  }

  else
  {
    const issueTxn = await ethereum.devDIDs().issue(
        issueForm.holder,
        issueForm.subject,
        issueForm.data,
        formatting.stringDateToTimestamp(issueForm.validFrom),
        formatting.stringDateToTimestamp(issueForm.validTo),
    )
    const recipient = await issueTxn.wait()
    console.log(recipient)
  }

}


function assignVcId(thisVcId: number){

  confirm.value = true
  vcId.value = thisVcId

}


function assignVcStatus(thisVcId: number, thisVcStat: boolean){

  vcId.value = thisVcId

  prompt.value = true
  vcStat.value = thisVcStat

}

async function revoke(thisVcId: number){

  const tnx = await ethereum.devDIDs().revoke(thisVcId)
  await tnx.wait()

  store.dispatch('fetchUserIssuedVcs')

}

async function changeVcStat(thisVcId: number, thisVcStat: boolean){

  console.log(thisVcId)

  const tnx = await ethereum.devDIDs().setSuspended(thisVcId, thisVcStat)
  await tnx.wait()

  store.dispatch('fetchUserIssuedVcs')

}

function reset() {
  issueForm.holder = ''
  issueForm.subject = ''
  issueForm.data = ''
  issueForm.validFrom = ''
  issueForm.validTo = ''
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
            name="Issues"
            icon="check_circle"
            label="Issue"
            style="padding:10px 0 10px 0 !important;"
        />
        <q-tab
            class="text-teal"
            name="VCs"
            icon="badge"
            label="VCs"
            style="padding:10px 0 10px 0 !important;"
        />
        <q-tab
            class="text-red"
            name="Suspend"
            icon="lock"
            label="Suspend"
            style="padding:10px 0 10px 0 !important;"
        />
      </q-tabs>

      <template v-if="tab === 'Issues'">
        <q-card-section class="div_issuer_header">
          <q-icon color="green" name="check_circle"/>
          Issue
        </q-card-section>

        <q-form
            class="q-gutter-md the_form"
        >
          <q-input
              outlined
              v-model="issueForm.holder"
              label="To (Address)"
              lazy-rules
              :rules="[fieldRules.required, fieldRules.ethereumAddress]"
          />

          <q-input
              outlined
              v-model="issueForm.subject"
              label="Subject"
              lazy-rules
              :rules="[fieldRules.required]"
          />

          <q-input
              outlined
              v-model="issueForm.data"
              label="Data"
              lazy-rules
              :rules="[fieldRules.required]"
          />

          <q-input
              outlined
              v-model="issueForm.validFrom"
              label="Valid From"
              mask="date"
              :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="issueForm.validFrom">
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
              v-model="issueForm.validTo"
              label="Valid To"
              mask="date"
              :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="issueForm.validTo">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>


          <div>
            <q-btn
                label="Submit"
                icon="send"
                color="secondary"
                @click.prevent="issue"
            />
            <q-btn
                label="Reset"
                icon-right="cancel"
                color="red"
                class="q-ml-sm"
                @click.prevent="reset"
            />
          </div>
        </q-form>

        <!-- Dialog Form Error Begins -->
        <q-dialog v-model="alert">
          <q-card class="dialog_error">
            <q-card-section class="items-center dialog_header_error">
              <q-avatar font-size="50px" icon="cancel"
                        class="avatar_error"/>
              <span class="q-ml-sm header_error">Error</span>
            </q-card-section>

            <q-card-section class="q-pt-none text_error" v-if="error_kind === '1'">
              Holder and Issuer have same addresses
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- Dialog Form Error Ends -->
      </template>


      <template v-else-if="tab==='VCs'">
        <q-card>
          <q-card-section class="div_issuer_header2">
            <q-icon color="teal" name="badge"/>
            VCs
          </q-card-section>

          <div class="q-pa-md table_container">
            <q-table
                style="
                    max-width:1000px !important;
                    width:95% !important;
                    margin:0 auto 0 !important;"
                flat
                :table-header-style="{ fontSize: '30px !important' }"
                :rows="store.getters.userIssuedVcs"
                :columns="columns"
                row-key="name"
            >
              <template v-slot:body="props">
                <q-tr :props="props" class="revoked1">
                  <q-td key="holder" :props="props" class="table_data" @click="dialog = true">
                    {{ props.row.holder }}
                  </q-td>
                  <q-td key="subject" :props="props" class="table_data" @click="dialog = true">
                    <q-badge color="green" class="table_badge">
                      {{ props.row.subject }}
                    </q-badge>
                  </q-td>
                  <q-td key="data" :props="props" class="table_data" @click="dialog = true">
                    {{ props.row.data }}
                  </q-td>
                  <q-td key="more" :props="props" class="table_data" v-if="props.row.suspended == true">
                    <!-- <q-icon color="orange" name="info" class="data_icon"/> -->
                    <q-icon color="teal" name="block" class="data_icon" @click="assignVcStatus(props.row.id ,props.row.suspended)"/>
                    <q-icon color="red" name="delete_forever" class="data_icon" @click="assignVcId(props.row.id)"/>
                  </q-td>
                  <q-td key="more" :props="props" class="table_data" v-if="props.row.suspended == false">
                    <!-- <q-icon color="orange" name="info" class="data_icon"/> -->
                    <q-icon color="teal" name="done_all" class="data_icon" @click="assignVcStatus(props.row.id, props.row.suspended)"/>
                    <q-icon color="red" name="delete_forever" class="data_icon" @click="assignVcId(props.row.id)"/>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <!-- Dialogs Begin -->
          <div class="q-pa-md">
            <!-- Dialog Information Begins -->
            <q-dialog v-model="dialog">
              <q-card class="dialog_info">
                <q-card-section class="items-center dialog_header_info">
                  <q-avatar size="50px" font-size="28px" color="warning" icon="info" text-color="white"
                            class="avatar_info"/>
                  <span class="q-ml-sm header_info">Information of the VC</span>
                </q-card-section>

                <q-list class="shadow-2 rounded-borders" style="margin:0 auto 0;width:95%;">
                  <!-- Holder Begins -->
                  <q-item>
                    <q-item-section avatar>
                      <q-icon rounded color="teal" size="34px" name="manage_accounts"/>
                    </q-item-section>
                    <div class="dialog_info_items1">Holder</div>
                    <div class="dialog_info_items2">:</div>
                    <div class="dialog_info_items3">{{ props.row.holder }}</div>
                  </q-item>
                  <!-- Holder Ends -->

                  <q-separator inset/>

                  <!-- Subject Begins -->
                  <q-item>
                    <q-item-section avatar>
                      <q-icon rounded color="blue-grey-4" size="34px" name="title"/>
                    </q-item-section>
                    <div class="dialog_info_items1">Subject</div>
                    <div class="dialog_info_items2">:</div>
                    <div class="dialog_info_items3">Employment</div>
                  </q-item>
                  <!-- Subject Ends -->

                  <q-separator inset/>

                  <!-- Data Begins -->
                  <q-item>
                    <q-item-section avatar>
                      <q-icon rounded color="green-6" size="34px" name="edit_note"/>
                    </q-item-section>
                    <div class="dialog_info_items1">Data</div>
                    <div class="dialog_info_items2">:</div>
                    <div class="dialog_info_items3">0xF28122CA</div>
                  </q-item>
                  <!-- Data Ends -->

                  <q-separator inset/>

                  <!-- Date Begins -->
                  <q-item>
                    <q-item-section avatar>
                      <q-icon rounded size="34px" name="auto_delete" style="color:#F31E48;"/>
                    </q-item-section>
                    <div class="dialog_info_items1">Validity</div>
                    <div class="dialog_info_items2">:</div>
                    <div class="dialog_info_items3">
                      From
                      <span
                          style="color:green; font-weight:700; display:inline-block; padding:0 2px 0 2px;">
                        26/12/2021
                      </span>
                      To
                      <span style="color:crimson; font-weight:700; display:inline-block; padding:0 2px 0 2px;">
                        26/12/2022
                      </span>
                    </div>
                  </q-item>
                  <!-- Date Ends -->

                </q-list>


                <!-- Notice v-close-popup -->
                <q-card-actions align="right">
                  <q-btn flat label="Close" color="primary" v-close-popup/>
                </q-card-actions>
              </q-card>
            </q-dialog>
            <!-- Dialog Information Ends -->

            <!-- Dialog Revoke Begins -->
            <q-dialog v-model="confirm">
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar font-size="40px" icon="delete_forever" text-color="red"/>
                  <span class="q-ml-xs">Are you sure You want to revoke this VC?</span>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat label="Cancel" color="primary" v-close-popup/>
                  <q-btn flat label="Revoke" color="red" v-close-popup @click.prevent="revoke(vcId)"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
            <!-- Dialog Revoke Ends -->

            
            <!-- Dialog Suspened Begins -->
            <q-dialog v-model="prompt" v-if="vcStat == true">
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar font-size="40px" icon="delete_forever" text-color="red"/>
                  <span class="q-ml-xs">Are you sure You want to unsuspend this VC?</span>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat label="Cancel" color="primary" v-close-popup/>
                  <q-btn flat label="Unsuspend" color="red" v-close-popup @click.prevent="changeVcStat(vcId, false)"/>
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="prompt" v-if="vcStat == false">
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar font-size="40px" icon="delete_forever" text-color="red"/>
                  <span class="q-ml-xs">Are you sure You want to suspend this VC?</span>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat label="Cancel" color="primary" v-close-popup/>
                  <q-btn flat label="Suspend" color="red" v-close-popup @click.prevent="changeVcStat(vcId, true)"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
            
            <!-- Dialog Suspened Ends -->

            <!-- Dialog Extend Begins -->
            <!-- <q-dialog v-model="prompt">
              <q-card style="min-width: 350px">
                <q-card-section>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon rounded size="34px" name="auto_delete" style="color:#F31E48;"/>
                    </q-item-section>
                    <div class="dialog_info_items1">Validity</div>
                    <div class="dialog_info_items2">:</div>
                    <div class="dialog_info_items3">
                      From
                      <span
                          style="color:green; font-weight:700; display:inline-block; padding:0 2px 0 2px;">
                        26/12/2021
                      </span>
                      To
                      <span style="color:crimson; font-weight:700; display:inline-block; padding:0 2px 0 2px;">
                        26/12/2022
                      </span>
                    </div>
                  </q-item>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input
                      outlined
                      v-model="newExp"
                      label="New Expiration Date"
                      mask="date"
                      :rules="['date']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="newExp">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat/>
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup/>
                  <q-btn flat label="Extend" color="green-10" v-close-popup/>
                </q-card-actions>
              </q-card>
            </q-dialog> -->
            <!-- Dialog Extend Ends -->
          </div>
          <!-- Dialogs End -->
        </q-card>
      </template>

    </q-card>


  </q-page>
</template>

<style scoped lang="scss">
* {
  text-align: center;
}

.ui.raised.segment {
  -webkit-box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);
  box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);
}

.div_issuer_header, .div_issuer_header2 {
  margin: 30px 0 0 0 !important;
  font-size: 1.71428571rem;
  line-height: 1.28571429em;
  font-weight: 500;
  padding: 0;
}

.revoked {
  background-color: rgb(241, 241, 241) !important;
}

.revoked td:first-child {
  background-color: rgb(241, 241, 241) !important;
}

tr:hover {
  cursor: pointer;
}

.div_issuer_header2 {
  margin: 30px 0 30px 0 !important;
}

.the_form {
  padding: 30px !important;
}

.data_icon {
  margin: 0 3px 0 3px !important;
  font-size: 22px !important;
}

.table_badge {
  padding: 10px !important;
  color: white;
  font-weight: 700;
  background-color: #1CD26B !important;
  font-size: 13px;
}

.table_container {
  width: 100% !important;
  // background-color:red !important;
  padding: 0px !important;
}

.table_data {
  min-width: 160px !important;
  width: 25% !important;
  text-align: center !important;
  font-size: 15px;
}

td:first-child {
  background-color: #f5f5dc;
  background-color: white;
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

.dialog_header_error
{
  background-color: #FF293F !important;
  margin-bottom: 5px;
}

.avatar_info, .avatar_error {
  display: block !important;
  margin: 0 auto 10px !important;
}

.avatar_error
{
  position:relative;
  left:4px;
  color:#980606;
}

.header_info, .header_error {
  display: block !important;
  font-size: 18px !important;
}

.header_error
{
  color:#980606;
  font-size:21px !important;
}

.text_error
{
  margin-top:24px;
  margin-bottom:-20px;
  font-size:18px;
}

.dialog_info, .dialog_error {
  width: 95% !important;
  max-width: 600px !important;
}

</style>

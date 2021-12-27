<script>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'

const columns = [
  {
    name: 'subject',
    required: true,
    label: 'subject',
    align: 'left',
    field: row => row.subject,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'issuer', align: 'center', label: 'Issuer', field: 'issuer', sortable: true },
  { name: 'data', label: 'Data' , field:  'data', sortable: true },
  { name: 'validFrom', label:'Issuance Date', field: 'validFrom' },
  { name: 'validTo', label: 'Expiration Date', field: 'validTo' }
 ]



export default {
  setup () {
    const store = useStore()
    const selected = ref([])
    const persistent = ref(false)
    const tab =  ref('Holder')
    const rows = ref([])
    const progress = ref([
      { loading: false, percentage: 0 },
      { loading: false, percentage: 0 },
      { loading: false, percentage: 0 }
    ])

    const intervals = [ null, null, null ]

    function startComputing (id) {
      const devDIDs = store.getters.devDIDs
      console.log(JSON.stringify(selected))
      // const VP = await devDIDs.generateVp(selec)


      progress.value[ id ].loading = true
      progress.value[ id ].percentage = 0

      intervals[ id ] = setInterval(() => {
        progress.value[ id ].percentage += Math.floor(Math.random() * 10 + 10)
        if (progress.value[ id ].percentage >= 100) {
          clearInterval(intervals[ id ])
          progress.value[ id ].loading = false
          this.persistent = true
        }
      }, 500)

    }
    async function getUserVCs() {

      const devDIDs = store.getters.devDIDs

      const VCIds = await devDIDs.vcsOfHolder(store.getters.account)
      console.log(VCIds)
      for(let i=0; i<VCIds.length;i++){
          try {

          const myVC = await devDIDs.getVc(VCIds[i])
          rows.value.push({...myVC, id: VCIds[i]})
          } catch (err){
            console.log(err)
          }
      }


    }

    onBeforeUnmount(() => {
      intervals.forEach(val => {
        clearInterval(val)
      })
    })
    // onMounted(()=>{
    //  getUserVCs()
    // })

    return {
      progress,
      getUserVCs,
      startComputing,
      filter: ref(''),
      persistent,
      selected,
      columns,
      tab,
      confirm: ref(false),
      rows,
      getSelectedString () {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
      }
    }
  }
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
        <q-tab class="text-accent" name="Holder" icon="account_circle" label="Holder" @click="getUserVCs"  />

      </q-tabs>
      <q-card-section class="div_issuer_header">
        <q-icon name="badge" color="accent"></q-icon>
        Your Verifiable Credentials
      </q-card-section>
    <div class="q-pa-md">

    <q-table
        :rows="rows"
        :columns="columns"
        row-key="subject"
        selection="multiple"
        v-model:selected="selected"
        :filter="filter"
        grid
        hide-header
    >
      <template v-slot:top-right>
        <q-input  dense debounce="300" v-model="filter" placeholder="Search"  color="accent">
          <template v-slot:append>
            <q-icon name="search"  color="accent"/>
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
            class="q-pa-lg grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.subject" />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
<!--                <q-item-section avatar v-if="col.label=='Subject'">-->
<!--                  <q-icon rounded color="accent" size="15px" name="verified"/>-->
<!--                </q-item-section>-->
<!--                <q-item-section avatar v-if="col.label=='Data'">-->
<!--                  <q-icon rounded color="accent" size="15px" name="title"/>-->
<!--                </q-item-section>-->

<!--                <q-item-section avatar v-if="col.label=='Issuer'">-->
<!--                  <q-icon rounded color="accent" size="15px" name="title"/>-->
<!--                </q-item-section>-->
<!--                <q-item-section avatar v-if="col.label=='Issuance Date'">-->
<!--                  <q-icon rounded color="accent" size="15px" name="title"/>-->
<!--                </q-item-section>-->
<!--                <q-item-section avatar v-if="col.label=='Expiration Date'">-->
<!--                  <q-icon rounded color="accent" size="15px" name="title"/>-->
<!--                </q-item-section>-->

                <q-item-section>

                  <q-item-label >
                    <q-icon rounded color="blue-grey-4"  size="25px" name="title" v-if="col.label=='Data'"/>
                    <q-icon rounded color="teal-5" size="25px" name="verified" v-else-if="col.label=='Issuer'"/>
                    <q-icon rounded color="accent" size="25px" name="subject" v-else-if="col.label=='subject'"/>
                    <q-icon rounded color="green-6" size="25px" name="today" v-else-if="col.label=='Issuance Date'"/>
                    <q-icon rounded style="color:#F31E48" size="25px" name="today" v-if="col.label=='Expiration Date'"/>
                    {{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption style="padding:10px !important;">{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

<!--            <q-list class="shadow-2 rounded-borders" style="margin:0 auto 0;width:100%;">-->
<!--              &lt;!&ndash; Issuer Begins &ndash;&gt;-->
<!--              <q-item>-->
<!--                <q-item-section avatar>-->
<!--                  <q-icon rounded color="teal-5" size="34px" name="verified"/>-->
<!--                </q-item-section>-->
<!--                <div class="dialog_info_items4">Issuer</div>-->
<!--                <div class="dialog_info_items5">:</div>-->
<!--                <div class="dialog_info_items6">0x703727c32AfE91BCA9 F70817CB15FA8045F40D96</div>-->
<!--              </q-item>-->
<!--              &lt;!&ndash; Issuer Ends &ndash;&gt;-->

<!--              <q-separator inset/>-->

<!--              &lt;!&ndash; Subject Begins &ndash;&gt;-->
<!--              <q-item>-->
<!--                <q-item-section avatar>-->
<!--                  <q-icon rounded color="blue-grey-4" size="34px" name="title"/>-->
<!--                </q-item-section>-->
<!--                <div class="dialog_info_items4">Subject</div>-->
<!--                <div class="dialog_info_items5">:</div>-->
<!--                <div class="dialog_info_items6">Employment</div>-->
<!--              </q-item>-->
<!--              &lt;!&ndash; Subject Ends &ndash;&gt;-->

<!--              <q-separator inset/>-->

<!--              &lt;!&ndash; Data Begins &ndash;&gt;-->
<!--              <q-item>-->
<!--                <q-item-section avatar>-->
<!--                  <q-icon rounded color="green-6" size="34px" name="edit_note"/>-->
<!--                </q-item-section>-->
<!--                <div class="dialog_info_items4">Data</div>-->
<!--                <div class="dialog_info_items5">:</div>-->
<!--                <div class="dialog_info_items6">0xF28122CA</div>-->
<!--              </q-item>-->
<!--              &lt;!&ndash; Data Ends &ndash;&gt;-->

<!--              <q-separator inset/>-->

<!--              &lt;!&ndash; Date Begins &ndash;&gt;-->
<!--              <q-item>-->
<!--                <q-item-section avatar>-->
<!--                  <q-icon rounded size="34px" name="auto_delete" style="color:#F31E48;"/>-->
<!--                </q-item-section>-->
<!--                <div class="dialog_info_items4">Validity</div>-->
<!--                <div class="dialog_info_items5">:</div>-->
<!--                <div class="dialog_info_items6">From 26/12/2021 To 26/12/2022</div>-->
<!--              </q-item>-->
<!--              &lt;!&ndash; Date Ends &ndash;&gt;-->

<!--            </q-list>-->
          </q-card>
        </div>

      </template>

    </q-table>

  </div>

      <div style="text-align: center">

        <q-btn
            :loading="progress[0].loading"
            :percentage="progress[0].percentage"
            color="secondary"
            @click="startComputing(0);"
            style="width: 150px;"
        >
          Generate VP
          <template v-slot:loading>
            <q-spinner-gears class="on-left" />
            Generating...
          </template>
        </q-btn>
        <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">

              <q-card class="dialog_info">
                <q-card-section class="items-center dialog_header_info">
                  <q-avatar size="50px" font-size="28px" color="warning" icon="info" text-color="white" class="avatar_info"/>
                  <span class="q-ml-sm header_info">Information of the VP</span>
                </q-card-section>

                <q-list class="shadow-2 rounded-borders" style="margin:0 auto 0;width:95%;">
                  <!-- Holder Begins -->
                  <q-item>
                    <q-item-section avatar>
                      <q-icon rounded color="teal" size="34px" name="manage_accounts"/>
                    </q-item-section>

                    <div class="dialog_info_items1">Holder</div>
                    <div class="dialog_info_items2">:</div>
                    <div class="dialog_info_items3">0x703727c32AfE91BCA9 F70817CB15FA8045F40D96</div>
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
                    <div class="dialog_info_items3"> VC1, VC2, VC3</div>
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
                    <div class="dialog_info_items3">From 26/12/2021 To 26/12/2022</div>
                  </q-item>
                  <!-- Date Ends -->

                </q-list>


                <!-- Notice v-close-popup -->
                <q-card-actions align="right">
                  <q-btn flat label="Close" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>

            </q-dialog>


        <q-btn label="Delete" type="Delete" color="red" @click="confirm = true" style="margin-left: 5px"/>
        <q-dialog v-model="confirm">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar font-size="40px" icon= "delete_forever"  text-color="red" />
              <span class="q-ml-xs">Are you sure You want to delete these VCs?</span>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Delete" color="red" v-close-popup />
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
  margin: 30px 0px 0px 0px !important;
  font-size: 1.71428571rem;
  line-height: 1.28571429em;
  font-weight: 500;
  padding: 0;
  text-align: center;
}


.dialog_info_items1, .dialog_info_items2,
.dialog_info_items3
{
  min-width:40px;
  text-align:left !important;
  font-size:15px;
  display:table-cell !important;
  padding-top:10px;

}

.dialog_info_items1
{
  width:13% !important;
  min-width:50px !important;
}

.dialog_info_items2
{
  width:1% !important;
}

.dialog_info_items3
{
  width:70% !important;
}

.dialog_header_info
{
  background-color:#F0E68E !important;
  margin-bottom:5px;
}

.avatar_info
{
  display:block !important;
  margin:0 auto 10px !important;
}

.header_info
{
  display:block !important;
  font-size:18px !important;
  text-align: center;
}

.dialog_info
{
  width:95% !important;
  max-width:600px !important;
}

</style>
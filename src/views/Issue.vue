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


const columns = ref([
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
])

const rows = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
])

const dialog =  ref(false)
const cancelEnabled =  ref(false)


</script>



<template>

  <q-page
    class="items-center justify-evenly"
    style="min-height: 700px"
  >

    <q-card
      class="q-px-lg q-pb-lg"
      style="width:95%;
        max-width: 750px;
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


      <template v-else-if="tab==='Revokes'">
        <q-card>
          <q-card-section class="div_issuer_header">
            <q-icon color="red" name="delete_forever"/>
            Revoke
          </q-card-section>

          <div class="q-pa-md table_container">
            <q-table
              class="my-sticky-header-column-table"
              title="Treats"
              style="width:1000px !important;
                      margin:0 auto 0 !important;"
              flat
              :rows="rows"
              :columns="columns"
              row-key="name"
            />
          </div>
          <div class="q-pa-md">
            <q-btn label="Open Dialog" color="primary" @click="dialog = true" />
            <q-dialog v-model="dialog" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
                  <span class="q-ml-sm">You are currently not connected to any network.</span>
                </q-card-section>

                <q-card-section class="row items-center">
                  <q-toggle v-model="cancelEnabled" label="Cancel button enabled" />
                </q-card-section>

                <!-- Notice v-close-popup -->
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup="cancelEnabled" :disable="!cancelEnabled" />
                  <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </q-card>
      </template>

    </q-card>


  </q-page>
</template>
<!-- font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif !important;

  font-family: "Samim", Avenir, Helvetica, Arial, sans-serif; -->

<style scoped lang="scss">
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

.table_container
{
  width:100% !important;
  background-color:red !important;
  padding:0px !important;
}



.my-sticky-header-column-table
{
  /* height or max-height is important */
  height: 310px;
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 600px;
}

td:first-child
{
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important;
}

tr th
{
    position: sticky;
    /* higher than z-index for td below */
    z-index: 2;
    /* bg color is important; just specify one */
    background: #fff;
}

  /* this will be the loading indicator */
  thead tr:last-child th
{
    /* height of all previous header rows */
    top: 48px;
    /* highest z-index */
    z-index: 3;
}

  thead tr:first-child th
{
    top: 0;
    z-index: 1;
}

  tr:first-child th:first-child
{
    /* highest z-index */
    z-index: 3;
}

  td:first-child
{
    z-index: 1;
}

  td:first-child, th:first-child
{
    position: sticky;
    left: 0;
}

</style>

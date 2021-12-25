<script>
import { ref, onBeforeUnmount } from 'vue'


const columns = [
  {
    name: 'name',
    required: true,
    label: 'VC',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Issuer', align: 'center', label: 'Issuer', field: 'Issuer', sortable: true },
  { name: 'Data', label: 'Data' , field:  'data', sortable: true },
  { name: 'validFrom', label:'Issuance Date', field: 'validFrom' },
  { name: 'validTo', label: 'Expiration Date', field: 'validTo' }
 ]

const rows = [
  {
    name: 'Railway Project',
    Issuer: "0x00Cd65E9664D3cdd0855f80911a7A299cAEaC083",
    subject: 6.0,
    data: "Shima has Worked 3 month",
    validFrom: 4.0,
    validTo: 87,
  },
  {
    name: 'Google',
    Issuer: "0x00Cd65E9664D3cdd0855f80911a7A299cAEaC083",
    subject: 6.0,
    data: 24,
    validFrom: 4.0,
    validTo: 87,
  },
  {
    name: 'Microsoft',
    Issuer: "0x00Cd65E9664D3cdd0855f80911a7A299cAEaC083",
    subject: 6.0,
    data: 24,
    validFrom: 4.0,
    validTo: 87,
  }

]

export default {
  setup () {
    const selected = ref([])
    const persistent = ref(false)
    const progress = ref([
      { loading: false, percentage: 0 },
      { loading: false, percentage: 0 },
      { loading: false, percentage: 0 }
    ])

    const intervals = [ null, null, null ]

    function startComputing (id) {
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

    onBeforeUnmount(() => {
      intervals.forEach(val => {
        clearInterval(val)
      })
    })
    return {
      progress,
      startComputing,
      filter: ref(''),
      persistent,
      selected,
      columns,
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
      class="row items-center justify-evenly"
  >
    <q-card
        class=" q-pb-lg"
        style="min-width: 50em; border-radius: 30px; max-width: 75%; margin-top: 70px"
        flat
        bordered
    >
      <q-tabs

          align="justify"
          class="bg-grey-3"
      >
        <q-tab class="text-accent" name="Holder" icon="account_circle" label="Holder"  />

      </q-tabs>
    <div class="q-pa-md">
    <q-table
        title="Your Verifiable Credentials"
        :rows="rows"
        :columns="columns"
        row-key="name"
        selection="multiple"
        v-model:selected="selected"
        :filter="filter"
        grid
        hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
            class="q-pa-xs grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

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
          <q-card class="my-card bg-secondary">
            <q-card-section>
              <div class="text-h6">VP</div>
              <div class="text-subtitle2">Copy the info about your generated vp </div>
            </q-card-section>

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>

            <q-separator dark />

            <q-card-actions align="center">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>

          </q-card>
        </q-dialog>

        <q-btn label="Delete" type="Delete" color="red" @click="confirm = true" style="margin-left: 5px"/>
        <q-dialog v-model="confirm">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon= "delete" color="deep-orange" text-color="white" />
              <span class="q-ml-xs">Are you sure You want to delete these VCs?</span>
            </q-card-section>


            <q-card-actions align="center">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Delete" color="primary" v-close-popup />
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
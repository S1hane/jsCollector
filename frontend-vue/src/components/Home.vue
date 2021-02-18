<template>
    <div class="main">
        <!-- <div class="sensor">
        <SensorQCODE />
        </div> -->
        <div class="sensor">
        <SensorTEMP />
        </div>
        <div class="sensor">
        <SensorFAN />
        </div>
        <div class="sensor">
        <SensorVCORE />
        </div>
        <div class="sensor">
        <SensorVDRAM />
        </div>
        <div class="sensor">
        <SensorCLOCK />
        </div>
        <div class="sensor">
        <SensorRATIO />
        </div>
        <div class="sensor">
        <SensorBCLK />
        </div>
    </div>
</template>

<script>

export default {
  name: 'home',
  components: {
    SensorVCORE: () => import('./SensorVCORE'),
    SensorVDRAM: () => import('./SensorVDRAM'),
    SensorRATIO: () => import('./SensorRATIO'),
    SensorCLOCK: () => import('./SensorCLOCK'),
    SensorBCLK: () => import('./SensorBCLK'),
    SensorTEMP: () => import('./SensorTEMP'),
    SensorFAN: () => import('./SensorFAN'),
    SensorQCODE: () => import('./SensorQCODE')
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  watch: {

  },
  methods: {

  }
}

</script>

<style scoped>
    .main {

    }
    .sensor {
        display:flexbox
    }

</style>

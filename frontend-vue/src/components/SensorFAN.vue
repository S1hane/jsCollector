<template>
    <div>
        <div class="container-fluid">
            <div class="row text-center">

                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <!-- <h1>Status: {{connStatus}}</h1> -->

                    <!-- Panel div start -->
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">FAN</h3>
                        </div>
                        <div class="panel-body">
                            <!-- Chart container -->
                            <div id="FAN-chart_container" >
                                <div id="FAN-y_axis"></div>
                                <div id="FAN-demo_chart" ref="panel"></div>
                            </div>
                            <!-- End of chart container -->
                        </div>
                        <div class="panel-footer">
                            <p v-if="displayedValues.length > 0">
                                <small>
                                    <span v-bind:style="{ color: dvColors.v1}">{{displayedValues[0].v1}} </span>V
                                </small>
                            </p>
                            Fan Speed: {{this.value}}rpm
                        </div>
                    </div>
                    <!-- Panel div end -->

                    <!-- Range slider chart-refresh control -->
                    <!-- <div class="FAN-col-xs-6 col-xs-offset-3 col-md-6 col-md-offset-3 col-lg-8 col-lg-offset-2">
                        <input v-model="renderEveryNth" type="range" min="1" max="9" value="5">
                        <p>Render after <strong>{{renderEveryNth}}</strong> message(s)</p>
                    </div> -->
                    <!-- End of range slider -->
                </div>
            </div>
            <!-- Footer -->

            <!-- End of footer -->
        </div>
    </div>
</template>

<script>
// import io from 'socket.io-client'
import Rickshaw from 'rickshaw'
import 'rickshaw/rickshaw.min.css'
import 'bootstrap/dist/css/bootstrap.css'
let W3CWebSocket = require('websocket').w3cwebsocket
let fanClient = new W3CWebSocket('ws://localhost:8080/', 'listen-fan')

var magnitudeChart

export default {
  name: 'SensorFAN',
  data () {
    return {
      value: 0,
      messageSeries: [],
      renderEveryNth: 1,
      updateInterval: 20,
      streamFrequency: 50,
      connStatus: 'Disconnected',
      messageIndex: 0,
      displayedValues: [],
      dvColors: {
        v1: '#ffffff'
      }
    }
  },
  mounted () {
    this.initChart()
    this.openWebSocketListener()
  },
  watch: {
    renderEveryNth: function () {
      this.messageSeries = []
      this.messageIndex = 0
    }
  },
  methods: {
    /* Rickshaw.js initialization */
    initChart () {
      magnitudeChart = new Rickshaw.Graph({
        element: document.querySelector('#FAN-demo_chart'),
        width: '500',
        height: '180',
        renderer: 'line',
        min: 350,
        max: 2500,
        series: new Rickshaw.Series.FixedDuration([{
          name: 'v1',
          color: '#ffffff'
        }], undefined, {
          timeInterval: this.updateInterval,
          maxDataPoints: 120,
          timeBase: new Date().getTime() / 1000

        })
      })

      var y_axis = new Rickshaw.Graph.Axis.Y({
        graph: magnitudeChart,
        orientation: 'left',
        tickFormat: function (y) {
          return y.toFixed(1)
        },
        ticks: 5,
        element: document.getElementById('FAN-y_axis')
      })

      this.resizeChart(magnitudeChart)

      window.addEventListener('resize', () => {
        this.resizeChart(magnitudeChart)
      })
    },
    resizeChart (chart) {
      chart.configure({
        width: this.$refs.panel.clientWidth
      })
      chart.render()
    },

    /* Insert received datapoints into the chart */
    insertDatapoints (messages, chart) {
      for (let i = 0; i < messages.length; i++) {
        let data = {
          Magnitude1: messages[i]
        }
        chart.series.addData(data)
        this.value = messages[i]
      }
      chart.render()
    },
    /* Update displayed values every second on average */
    updateDisplayedValues () {
      if (this.messageIndex === this.streamFrequency) {
        this.messageIndex = 0
        this.displayedValues = this.messageSeries
      } else if (this.messageIndex === 0) {
        this.displayedValues = this.messageSeries
        this.messageIndex++
      } else {
        this.messageIndex++
      }
    },
    openWebSocketListener () {
      const promiseToParseAndUpdateState = (input) => {
        return new Promise((resolve, reject) => {
          // console.log('FAN:', input)
          if (this.messageSeries.length < this.renderEveryNth) {
            this.messageSeries.push(input)
          }

          /* Render-time! */
          if (this.messageSeries.length === this.renderEveryNth) {
            this.insertDatapoints(this.messageSeries, magnitudeChart)
            this.messageSeries = []
          }
        })
      }
      fanClient.onerror = () => {
        console.log('Connection Error')
      }

      fanClient.onopen = () => {
        console.log('WebSocket fanClient Connected')
        this.connStatus = 'Connected'
      }

      fanClient.onclose = () => {
        console.log('echo-protocol fanClient Closed')
        this.connStatus = 'Disconnected'
      }

      fanClient.onmessage = (e) => {
        if (typeof e.data === 'string') {
          promiseToParseAndUpdateState(parseInt(e.data)).then((result) => {
            this.updateDisplayedValues()
          })
        }
      }
    }
  }
}

</script>

<style scoped>
    #FAN-chart_container {
        padding-right: 40px;
        padding-bottom: 20px;
        margin-top: 20px;
        position: relative;
    }

    #FAN-demo_chart {
        position: relative;
        left: 40px;
    }

    #FAN-y_axis {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40px;
    }

    .FAN-footy {
        position: relative;
        width: 100%;
        margin-top: 50px;
        height: 60px;
        opacity: 0.2;
    }

    .FAN-glyphicon {
        color: #8E44AD;
        font-weight: bold;
    }

</style>

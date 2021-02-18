import React from 'react';

export default class SingleLineChart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {


  }

  render() {
    return (<div id="sample">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <h1>Status: </h1>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Magnitude</h3>
              </div>
              <div className="panel-body">
                <div id="chart_container" >
                  <div id="y_axis"></div>
                  <div id="demo_chart" ref="panel"></div>
                </div>
              </div>
              <div className="panel-footer">
                <p v-if="displayedValues.length > 0">

                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-xs-offset-3 col-md-6 col-md-offset-3 col-lg-8 col-lg-offset-2">
            <input v-model="renderEveryNth" type="range" min="1" max="9" value="5"></input>
            <p>Render after <strong>2</strong> message(s)</p>
          </div>
        </div>
      </div>
    </div>);
  }

}


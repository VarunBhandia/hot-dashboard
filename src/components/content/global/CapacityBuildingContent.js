/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './CapacityBuildingContent.css';

/** Logos **/
import trainingIMG   from '../../../assets/images/logos/training.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid           from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph from "../../widget/Graph";

/** Plugins **/
import { VictoryPie   }  from 'victory';
import { VictoryChart }  from 'victory';
import { VictoryLine   }  from 'victory';
import { VictoryAxis  }  from 'victory';

/** Themes **/
const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
});


class CapacityBuildingContent extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          <MuiThemeProvider theme={GlobalTheme}>
            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}

              {/* First row */}
              {/* People trained */}
              <Grid item className="grid-item" xs={12} sm={6} md={3}>
                <WidgetIndicator title="Total people trained" img={trainingIMG}  data={this.props.importedIndicators.global.capacitybuilding.trainings.total}/>
              </Grid>

              {/* Monthly training */}
              <Grid item xs={12} sm={6} md={4}>
                {this.props.importedIndicators.global &&
                (<WidgetGraph title = {this.props.importedIndicators.global.capacitybuilding.monthlyDivision.title}
                              graph = {<VictoryChart domainPadding={ {x: 15}}>
                                <VictoryAxis
                                    style={{ tickLabels: { padding: 20, angle: -0 } }}
                                />
                                <VictoryAxis
                                    dependentAxis
                                />
                                <VictoryLine
                                    style={{
                                      data   : { stroke: "#2C3038" },
                                      parent : { border: "1px solid #ccc"}
                                    }}
                                    data   = {[
                                      { x: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data7"].label,
                                        y: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data7"].value
                                      },
                                      { x: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data8"].label,
                                        y: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data8"].value
                                      },
                                      { x: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data9"].label,
                                        y: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data9"].value
                                      },
                                      { x: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data10"].label,
                                        y: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data10"].value
                                      },
                                      { x: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data11"].label,
                                        y: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data11"].value
                                      },
                                      { x: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data12"].label,
                                        y: this.props.importedIndicators.global.capacitybuilding.monthlyDivision.data["data12"].value
                                      }
                                    ]}
                                />
                              </VictoryChart>}/>
                )}
              </Grid>

              {/* Training by genders */}
              <Grid item xs={12} sm={6} md={4}>
                {this.props.importedIndicators.global && (
                    <WidgetGraph title = "Trainings (by gender)"
                                 graph = {<VictoryPie
                                     padAngle    = {2}
                                     innerRadius = {100}
                                     width       = {475}
                                     colorScale  = {[ "#FAA71E", "#D73F3F"]}
                                     style={{ labels: {fontSize: 18} }}
                                     data = {[
                                       { x: "Women", y: this.props.importedIndicators.global.capacitybuilding.trainings.women },
                                       { x: "Men",   y: this.props.importedIndicators.global.capacitybuilding.trainings.men },
                                     ]}
                                 />}/>)}
              </Grid>

            </Grid>
          </MuiThemeProvider>
        </div>
    );
  }
}

export default CapacityBuildingContent;
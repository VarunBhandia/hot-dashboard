/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './MappingContent.css';

/** Logos **/
import mapIMG        from '../../../assets/images/logos/map.png';
import mapathonsIMG from "../../../assets/images/logos/mapathons.png";

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography       from '@material-ui/core/Typography';
import Card             from '@material-ui/core/Card';
import CardContent      from '@material-ui/core/CardContent';
import Grid             from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph     from '../../widget/Graph';

/** Plugins **/
import { VictoryChart }  from 'victory';
import { VictoryBar   }  from 'victory';
import { VictoryAxis   }  from 'victory';
import { VictoryTooltip   }  from 'victory';
import { VictoryStack   }  from 'victory';

/** Themes **/
const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
  palette: {
    primary: {
      main : '#FFFFFF',
    }
  },
});


class MappingContent extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const tableToData = function (data, customLabel, dataDisplayed, sortingChoice) {
      let dataSort = function (a, b) {
        if (a.y < b.y) {
          return -1;
        } else if (a.y > b.y) {
          return 1;
        } else {
          return 0;
        }
      };
      let res = [];
      for (let i=data.length-1; i>=0; i--)
      {
        res.push({
          x: data[i].label,
          y: data[i][dataDisplayed],
          label: data[i][dataDisplayed] + " " + customLabel
        })
      }
      switch (sortingChoice) {
        case "data":
          res.sort(dataSort);
          break;
        default:
      }
      return res;
    };

    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {this.props.importedData.global &&
          (<MuiThemeProvider theme={GlobalTheme}>
                {/* First row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Maps edits */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.main.totalEdits && (<WidgetIndicator title={this.props.importedData.global.main.totalEdits.title}
                                                                                         img={mapIMG}
                                                                                         data={this.props.importedData.global.main.totalEdits.data}/>)}
                  </Grid>

                  {/* Total mappers */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.main.totalMappers && (<WidgetIndicator title={this.props.importedData.global.main.totalMappers.title}
                                                                                                img={mapIMG}
                                                                                                data={this.props.importedData.global.main.totalMappers.data}/>)}
                  </Grid>

                  {/* Mapathons */}
                  <Grid item xs={12} sm={6} md={3}>
                    {/* We're using the totalEvents value because each event is a mapathon so the total number is the length of the list */}
                    {this.props.importedData.global.main.totalEvents && (<WidgetIndicator title={this.props.importedData.global.main.totalEvents.title}
                                                                                               img={mapathonsIMG}
                                                                                               data={this.props.importedData.global.main.totalEvents.data.length}/>)}
                  </Grid>

                  {/* Events conducted */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.main.totalNbEvents &&
                    (<WidgetIndicator title={this.props.importedData.global.main.totalNbEvents.title}
                                      img={mapathonsIMG}
                                      data={this.props.importedData.global.main.totalNbEvents.value}/>)}
                  </Grid>

                  {/* Workshops that happened */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.main.totalNbTrainings &&
                    (<WidgetIndicator title={this.props.importedData.global.main.totalNbTrainings.title}
                                      img={mapIMG}
                                      data={this.props.importedData.global.main.totalNbTrainings.value}/>)}
                  </Grid>

                  {/* Workshops that happened */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.main.totalOrganizationsSupported &&
                    (<WidgetIndicator title={this.props.importedData.global.main.totalOrganizationsSupported.title}
                                      img={mapIMG}
                                      data={this.props.importedData.global.main.totalOrganizationsSupported.value}/>)}
                  </Grid>
                </Grid>

                {/* Second row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Mapped elements (Roads and buildings) */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.main.totalBuildings && (
                        <Card className="widget-container">
                          <CardContent className="widget-text">
                            <Typography variant="caption"> Number of elements mapped </Typography>
                            <div className="widget-mappedElements-text">
                              <Typography className="widget-mappedElements-text-item-green" color="primary">
                                {new Intl.NumberFormat('en-GB', {
                                  minimumFractionDigits : 0,
                                  maximumFractionDigits : 0
                                }).format(this.props.importedData.global.main.totalBuildings.data)} Buildings</Typography>
                              <Typography className="widget-mappedElements-text-item-grey">
                                {new Intl.NumberFormat('en-GB', {
                                  minimumFractionDigits : 0,
                                  maximumFractionDigits : 0
                                }).format(this.props.importedData.global.main.totalRoads.data)} Roads</Typography>
                            </div>
                          </CardContent>
                        </Card>)}
                  </Grid>

                  {/* Number of people participating in an event (gender) */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.main.totalNbParticipantsGender &&
                    (<WidgetGraph title = {this.props.importedData.global.main.totalNbParticipantsGender.title}
                                  graph = {<VictoryChart domainPadding={30}>
                                    <VictoryAxis
                                        style={{ tickLabels: { padding: 20 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                    />
                                    <VictoryStack>
                                      <VictoryBar
                                          labelComponent={<VictoryTooltip/>}
                                          style  = {{ data: { fill: "#D73F3F" } }}
                                          data   = {tableToData(this.props.importedData.global.main.totalNbParticipantsGender.data, "women participants", "female")}
                                      />
                                      <VictoryBar
                                          labelComponent={<VictoryTooltip/>}
                                          style  = {{ data: { fill: "#FAA71E" } }}
                                          data   = {tableToData(this.props.importedData.global.main.totalNbParticipantsGender.data, "men participants", "male")}
                                      />
                                    </VictoryStack>
                                  </VictoryChart>
                                  }/>
                    )}
                  </Grid>

                  {/* Number of attendees trained per training type */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.main.totalNbAttendeesTraining &&
                    (<WidgetGraph title = {this.props.importedData.global.main.totalNbAttendeesTraining.title}
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryAxis
                                        style={{ tickLabels: { padding: 20 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                    />
                                    {<VictoryBar
                                        labelComponent={<VictoryTooltip/>}
                                        style  = {{ data: { fill: "#D73F3F" } }}
                                        data   = {tableToData(this.props.importedData.global.main.totalNbAttendeesTraining.data, "trainings", "value")}
                                    />}
                                  </VictoryChart>}
                                  data = {this.props.importedData.global.main.totalNbAttendeesTraining.data}
                        />

                    )}
                  </Grid>
                </Grid>
              </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default MappingContent;

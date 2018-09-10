/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import Button          from '@material-ui/core/Button';

/** CSS **/
import './ContentFilter.css';

/** Styles **/
const Buttons = {
  background : '#FFFFFF',
  color      : '#D73F3F',
  margin     : '0 0 0 5px',
  fontFamily : "'Barlow Condensed', sans-serif",
  fontSize   :  18
};
const FilterSelected = {
  background : '#D73F3F',
  color      : 'white',
  margin     : '0 0 0 5px',
  fontFamily : "'Barlow Condensed', sans-serif",
  fontSize   :  18,
};


class ContentFilter extends Component {
  constructor(props) {
    super(props);
    this.selectContent = this.selectContent.bind(this);

    this.state = {
      displayedContent : 'mapping'
    };
  }

  /** Open content & close mini menu **/
  selectContent = (content) => () => {
    let selectedContent = []; //Object sended to container (Home)

    // Initialize all content state to false
    let selectedcontentName            = '';
    let mappingContentChanged          = false;
    let capacityBuildingContentChanged = false;
    let awarenessContentChanged        = false;
    let communityContentChanged = false;

    // Check which button is clicked
    if     (content === 'mapping')           { mappingContentChanged          = true;  selectedcontentName='Mapping';           }
    else if(content === 'capacity_building') { capacityBuildingContentChanged = true;  selectedcontentName='Capacity building'; }
    else if(content === 'awareness')         { awarenessContentChanged        = true;  selectedcontentName='Awareness';         }
    else if(content === 'community')         { communityContentChanged        = true;  selectedcontentName='Community';         }

    // Push new item to the array to send
    selectedContent.push({
      contentName             : selectedcontentName,
      mappingContent          : mappingContentChanged,
      capacityBuildingContent : capacityBuildingContentChanged,
      awarenessContent        : awarenessContentChanged,
      communityContent        : communityContentChanged
    });

    this.setState({
      displayedContent : content
    });
    // Sending the array
    this.props.sendToHome(selectedContent)
  };



  render() {
    return (
        <div className="tabs">
          {/* 'Mapping' button */}
          {(this.props.importedData === undefined) ?
              null
              : ((Object.keys(this.props.importedData.mapping).length !== 0) ?
                  <Button style     = {(this.props.contentName === 'Mapping') ? FilterSelected : Buttons}
                          variant   = "contained"
                          component = "span"
                          onClick   = {this.selectContent('mapping')}>
                  Mapping
                  </Button>
                      : null)}

          {/* 'Capacity building' button */}
          {(this.props.importedData === undefined) ?
              null
              : ((Object.keys(this.props.importedData.capacitybuilding).length !== 0) ?
                  <Button style     = {(this.props.contentName === 'Capacity building') ? FilterSelected : Buttons}
                          variant   = "contained"
                          component = "span"
                          onClick   = {this.selectContent('capacity_building')}>
                    Capacity building
                  </Button>
                  : null)}

          {/* 'Community' button */}
          {(this.props.importedData === undefined) ?
              null
              : ((Object.keys(this.props.importedData.community).length !== 0) ?
                  <Button style     = {(this.props.contentName === 'Community') ? FilterSelected : Buttons}
                          variant   = "contained"
                          component = "span"
                          onClick   = {this.selectContent('community')}>
                    Community
                  </Button>
                  : null)}

          {/* 'Awareness' button */}
          {(this.props.importedData === undefined) ?
              null
              : ((Object.keys(this.props.importedData.awareness).length !== 0) ?
                <Button style     = {(this.props.contentName === 'Awareness') ? FilterSelected : Buttons}
                        variant   = "contained"
                        component = "span"
                        onClick   = {this.selectContent('awareness')}>
                  Awareness
                </Button>
                : null)}
        </div>
    );
  }
}

export default ContentFilter;
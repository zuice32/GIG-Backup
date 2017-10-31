import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Location as LocationApi, Permissions } from 'expo';
// import ActionButton from 'react-native-action-button';
import { Icon, Button, ActionSheet } from 'native-base';
import PropTypes from 'prop-types';

import { updateCoords, updateZip } from '../../Storage/Location/Actions';

export class Location extends Component {
  constructor(props) {
    super(props);

    this.getLocation = this.getLocation.bind(this);
  }

  async getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {

    }

    const location = await LocationApi.getCurrentPositionAsync({});

    this.props.updateLatLong({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  render() {
    return (
      <Button light bordered
        onPress={() => ActionSheet.show({
          options: ["Use Current Location", "Set a Zip Code", "Cancel"],
          cancelButtonIndex: 2,
          title: "Set your location"
        },
        (buttonIndex) => {
          switch(buttonIndex) {
            case '0': console.log('in 0');break;
            case '1': console.log('in 1');this.props.navigate('Zip'); break;
            case '2': console.log('in 2'); break;
            default: console.log('in default'); break;
          }
        })}
      >
        <Icon name="pin" />
      </Button>
    )
  }

}

Location.propTypes = {
  updateLatLong: PropTypes.func,
  updateZipCode: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  updateLatLong: coords => dispatch(updateCoords(coords)),
  updateZipCode: zip => dispatch(updateZip(zip)),
});
export default connect(undefined, mapDispatchToProps)(Location);

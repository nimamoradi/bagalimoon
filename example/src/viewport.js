'use strict';

let React = require('react-native')
    , Dimensions = React.Dimensions || require('Dimensions')
    , {width, height} = Dimensions.get('window');

let units = {
    vw: Math.min(width, height)/100
    , vh: Math.max(width, height)/100
};

units.vmin = Math.min(units.vw, units.vh);
units.vmax = Math.max(units.vw, units.vh);

module.exports = units;
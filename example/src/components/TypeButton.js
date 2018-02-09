
import PropTypes from "prop-types";
import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';
import { vw, vh, vmin, vmax } from "../viewport";
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
//   Text,
  Defs,
  Stop
} from "react-native-svg";


function TypeButton({ title, onPress, isSelected }) {
  return (
    <View>
      {
        // (isSelected) ?
        // <TouchableOpacity
        //     underlayColor={'rgba(0, 0, 0, 0.054)'}
        //     style={{
        //         paddingHorizontal: 5 * vw,
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         borderBottomWidth: 1,
        //         margin: 5,
        //         height: 9 * vh,
        //         borderRadius: 15,
        //         borderColor: '#297626',
        //         backgroundColor: '#10620f',
        //         borderWidth: 0.5,
        //         borderBottomColor: 'rgba(0, 0, 0, 0.054)',
        //     }}
        //     onPress={onPress}
        // >
        //     <Text style={styles.text}>{title}</Text>
        // </TouchableOpacity> :
        <TouchableOpacity
          //underlayColor={"rgba(0, 0, 0, 0.054)"}
          style={{
            paddingHorizontal: 5 * vw,
          //  justifyContent: 'center',
           // alignItems: 'center',
            //flexDirection: "row",
            //alignItems: "center",
            //justifyContent: "center",
            //borderBottomWidth: 1,
            marginRight: -22,
            marginLeft: -22,
            //height: 9 * vh,
           // borderRadius: 15,
           // borderColor: "#349630",
           // backgroundColor: "#3bad37",
           // borderWidth: 0.5,
            //borderBottomColor: "rgba(0, 0, 0, 0.054)"
          }}
          onPress={onPress}
        >
        <Svg height="150" width="190"fill-opacity="0.4" >
        {/* <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="blue"
          strokeWidth="2.5"
          fill="green"
        />
        <Rect
          x="15"
          y="15"
          width="70"
          height="70"
          stroke="red"
          strokeWidth="2"
          fill="yellow"
        /> */}
        

        {/* <Circle   fill="yellow" class="st0" cx="78.5" cy="61.5" r="50"/>
<Line class="st1" x1="73.5" y1="11.5" x2="178.5" y2="11.5"/>
<Line class="st1" x1="178.5" y1="111.5" x2="78.5" y2="111.5"/>
<Circle   fill="yellow" class="st1" cx="34.5" cy="86.5" r="25"/>
<Line class="st1" x1="39.5" y1="29.5" x2="11.5" y2="76.5"/>
<Line class="st1" x1="31.5" y1="111.5" x2="112.5" y2="111.5"/>
<Circle class="st0" cx="178.5" cy="61.5" r="50"/>
<Circle class="st1" cx="222.5" cy="36.5" r="25"/>
<Line class="st1" x1="217.5" y1="93.5" x2="245.5" y2="47.5"/>
<Line class="st1" x1="225.5" y1="11.5" x2="144.5" y2="11.5"/> */}

{/* <Circle cx="69.8" cy="51.8" r="50"/>
<Circle  cx="25.8" cy="76.8" r="25"/>
<Line  fill="yellow" x1="30.8" y1="19.8" x2="2.8" y2="66.8"/>
<Circle cx="169.8" cy="51.8" r="50"/>
<Circle  cx="213.8" cy="26.8" r="25"/>
<Line  x1="208.8" y1="83.8" x2="236.8" y2="37.8"/>
<Rect x="69.8" y="1.8" class="st1" width="100" height="100"/>
<Line x1="132.8" y1="101.8" x2="172.8" y2="101.8"/>
<Polyline points="157.8,1.8 217.8,1.8 169.8,1.8 169.8,101.8 23.8,101.8 73.8,101.8 "/>
<Line  x1="69.8" y1="101.8" x2="25.8" y2="101.8"/>
<Line x1="169.8" y1="1.8" x2="213.8" y2="1.8"/> */}

<Circle fill="red"  cx="121.7" cy="51.8" r="50"/>
<Circle fill="red" cx="165.7" cy="26.8" r="25"/>
<Polyline fill="red" class="st1" points="109.7,1.8 169.7,1.8 121.7,1.8 121.7,101.8 -24.3,101.8 25.7,101.8 "/>
<Rect x="69.5" y="1.8" fill="red" width="96.2" height="50"/>
<Polygon fill="red" points="106.9,88.5 106.9,88.5 106.9,88.5 106.9,88.5 "/>
<Polygon fill="red" points="188,38.1 159.5,84.6 126.4,64.5 168.4,26.8 "/>
<Circle fill="red" cx="69.5" cy="52.2" r="50"/>
<Circle fill="red" cx="25.5" cy="77.2" r="25"/>
<Rect fill="red" x="25.5" y="52.2" transform="matrix(-1 4.260447e-11 -4.260447e-11 -1 147.2117 154.3)" class="st0" width="96.2" height="50"/>
<Polygon fill="red" points="84.3,15.5 84.3,15.5 84.3,15.5 84.3,15.5 "/>
<Polygon fill="red" points="3.2,65.9 31.7,19.4 64.8,39.5 22.8,77.2 "/>

      </Svg>
        <Text  style={styles.text}>{title}</Text>
   
        </TouchableOpacity>
      }
    </View>
  );
}

TypeButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool
};

const styles = StyleSheet.create({
  row: {
    fontSize: vw * 3,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    margin: 15,
    borderRadius: 15,
    borderColor: "#3db139",
    borderWidth: 0.5,

    borderBottomColor: "rgba(0, 0, 0, 0.054)"
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    textAlign: "center",
    fontSize: 4 * vw,
    color: "blue",
    fontFamily: "B Yekan"
  },
  selText: {
    flex: 1,
    textAlign: "center",
    fontSize: 4 * vw,
    color: "red",
    fontFamily: "B Yekan"
  },
  st0:{
    // stroke:"blue",
    // strokeWidth:"2.5",
    // fill:"green",
    // fill:"#FFFFFF",
    // stroke:"#000000",
    // "stroke-miterlimit":10
  }
});

export default TypeButton;

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
//  - variables contains the device variables e.g. {"calibration": "3.5"} (both the key / value are of type string)
// The function must return an object, e.g. {"temperature": 22.5}
// 01bf65bbd4d901010100c900ae00ad00aa270f001a003800000000000000000183018401810001003b004b3e8001030e80001a002d0000000002fc

function DoDecode(str) {
  console.log(str)
  let bytes = [];

  parseInt(str.substring(0, 2), 16);
  str = str.substring(2, str.length);

  console.log(bytes)


  var decoded = {};
  decoded.frame_type_num = bytes[0]
  decoded.OP_time = (bytes[2] << 8 | bytes[2])
  switch (bytes[1]) {
    case 0xbf: // Modbus 3 TNK-BP
      decoded.status = (bytes[2] << 8 | bytes[2]) / 100;
      decoded.humidity = (bytes[3] << 8 | + bytes[4]) / 100;
      decoded.pressure = (bytes[8] | (bytes[7] << 8) | (bytes[6] << 16) | (bytes[5] << 24)) / 100;
      decoded.gas = bytes[12] | (bytes[11] << 8) | (bytes[10] << 16) | (bytes[9] << 24);
      decoded.batt = (bytes[13] << 8 | bytes[14]) / 100;
      break;
    case 0x02: // Temperature and humidity sensor data
      decoded.temperature = (bytes[1] << 8 | bytes[2]) / 100;
      decoded.humidity = (bytes[3] << 8 | + bytes[4]) / 100;
      decoded.batt = (bytes[5] << 8 | bytes[6]) / 100;
      break;
    case 0x03: // Ambient light sensor data
      decoded.light = (bytes[4] | (bytes[3] << 8) | (bytes[2] << 16) | (bytes[1] << 24)) / 10;
      decoded.batt = (bytes[5] << 8 | bytes[6]) / 100;
      break;
    case 0x04: // No sensor data, just counter
      decoded.cnt = bytes[4] | (bytes[3] << 8) | (bytes[2] << 16) | (bytes[1] << 24);
      break;
    case 0x20: // Solar panel data
      decoded.current = (bytes[1] << 8 | bytes[2]);
      decoded.today = (bytes[3] << 8 | + bytes[4]);
      break;
    case 0x30: // Accelerometer sensor
      if (bytes[1] == 0) {
        decoded.x_move = "no";
      } else {
        decoded.x_move = "yes";
      }
      if (bytes[2] == 0) {
        decoded.y_move = "no";
      } else {
        decoded.y_move = "yes";
      }
      if (bytes[3] == 0) {
        decoded.z_move = "no";
      } else {
        decoded.z_move = "yes";
      }
      break;
    default:
      decoded.unknown = "Unknown data format";
      break;
  }
  return JSON.stringify(decoded);
}

// For TTN
/*function Decoder(bytes, fPort) {
  return DoDecode(fPort, bytes);
}

// For Chirpstack
function Decode(fPort, bytes, variables) {
  return DoDecode(fPort, bytes);
}
*/

// Chirpstack v3 to v4 compatibility wrapper
/*
function decodeUplink(input) {
  return {
    data: Decode(input.fPort, input.bytes, input.variables)
  };
}
console.log(decodeUplink())
*/
export default function Input() {
  const [name, setName] = React.useState('1111');

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > <p>{name}</p>
      <TextField
        id="outlined-controlled"
        onChange={(event) => {
          setName(DoDecode(event.target.value));
        }}
      />

    </Box>
  );
}
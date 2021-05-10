import * as React from 'react';
import {Path, Svg} from 'react-native-svg';

function Background(props: React.SVGProps<Svg>) {
  // width={343} height={444}
  return (
    <Svg
      width={props.width ? props.width : 343}
      height={props.height ? props.height : 444}
      viewBox="0 0 343 444"
      fill="none"
      {...props}>
      <Path
        d="M343 271.976c0 94.942-76.783 171.906-171.5 171.906S0 366.918 0 271.976C0 177.036 171.5 0 171.5 0S343 177.036 343 271.976z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default Background;

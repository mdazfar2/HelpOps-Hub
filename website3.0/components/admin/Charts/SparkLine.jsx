"use client"
import React from 'react';
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts';

const SparkLine = () => {
  return (
    <SparklineComponent
      id={"aaa"}
      height={"200px"}
      width={"300px"}
      lineWidth={1}
      valueType="Numeric"
      fill={"blue"}
      border={{ color: "gray", width: 2 }}
      tooltipSettings={{
        visible: true,
        format: '${x} : data ${yval}',
        trackLineSettings: {
          visible: true,
        },
      }}
      markerSettings={{ visible: ['All'], size: 2.5, fill: "blue" }}
      dataSource={[
        { x: 1, yval: 2 },
        { x: 2, yval: 6 },
        { x: 3, yval: 8 },
        { x: 4, yval: 5 },
        { x: 5, yval: 10 },
      ]}
      xName="x"
      yName="yval"
      type={"Line"}
    >
      <Inject services={[SparklineTooltip]} />
    </SparklineComponent>
  );
}

export default SparkLine;

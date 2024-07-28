import React from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, Tooltip, DateTime, Legend } from '@syncfusion/ej2-react-charts';

const data = [
    { date: new Date('2024-07-01'), accountsCreated: 30, userVisits: 120 },
    { date: new Date('2024-07-02'), accountsCreated: 45, userVisits: 150 },
    { date: new Date('2024-07-03'), accountsCreated: 28, userVisits: 135 },
    { date: new Date('2024-07-04'), accountsCreated: 60, userVisits: 170 },
    // Add more data points here
  ];
export default function Charts() {
  return (
    <ChartComponent
    width='600px'
    height='500px'
    id="line-chart"
    primaryXAxis={{
      valueType: 'DateTime',
      labelFormat: 'dd/MM/yyyy',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 }
    }}
    primaryYAxis={{
      title: 'Count',
      minimum: 0,
      maximum: 200,
      interval: 20,
      majorGridLines: { width: 0 }
    }}
    tooltip={{ enable: true }}
    legendSettings={{ visible: true, position: 'Bottom' }}
  >
    <Inject services={[LineSeries, Tooltip, DateTime, Legend]} />
    <SeriesCollectionDirective>
      <SeriesDirective
        dataSource={data}
        xName='date'
        yName='accountsCreated'
        name='Accounts Created'
        type='Line'
        width={2}
        marker={{ visible: true, width: 10, height: 10 }}
      />
      <SeriesDirective
        dataSource={data}
        xName='date'
        yName='userVisits'
        name='User Visits'
        type='Line'
        width={2}
        marker={{ visible: true, width: 10, height: 10 }}
      />
    </SeriesCollectionDirective>
  </ChartComponent>
  )
}

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';



const ChartComponent = () => {

      const { aggregatedCategories} = useSelector((state)=>state.expense)
      
      return (
        <div className='d-flex align-items-center h-100 flex-row' style={{minWidth:"80%"}}>
          <BarChart width={430} height={300} data={aggregatedCategories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" label={{ value: 'Categories', position: 'insideBottom', dy: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#6699CC" />
          </BarChart>
        </div>
      );
};

export default ChartComponent;

import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GetOrderByDatee } from "../../../services/Orders";
const GetOrderByDate = () => {
  const [datee, setdate] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const totalorders = [];
    const categorynames = [];

   
    GetOrderByDatee()
      .then((response) => {
        response.map((item) => {
          console.log("item", item);
          totalorders.push(item.TotalOrders);
          categorynames.push(item._id.day +"/"+item._id.month +"/"+item._id.year);
        });
        setdate(categorynames);
        setData(totalorders);

        console.log("Total Orderss", totalorders, categorynames);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  return (
    <Scrollbars style={{  height: 490 }}>
   
    <div className="chart">
    <b className="biscuit">Order By Date Chart</b>
    <br></br>
    <br></br>
      <Chart 
      
       
        options={{
          chart: {
            id: "apexchart-example",
           
          },
         

          grid: {
  row: {
    colors: ['grey']
  },
  column: {
    colors: ['black']
  }
},
          xaxis: {
            categories: datee,
           
          },
        }}
        series={[
          {
            name: "Orders",
            data: data,
          },
        ]}
       
        type="line"
        width={800}
        height={400}
       
        
      />
      </div>
    </Scrollbars>
  );
};

export default GetOrderByDate;

import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { GetOrderByRetailerr} from "../../../services/Orders";
import { Bar } from 'react-chartjs-2';
import { Scrollbars } from "react-custom-scrollbars-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



const GetOrderByRetailer =() => {
 
const [retailer, setretailers] = useState([]);
const [data, setData] = useState({
  
  datasets: [
    {
      label: 'Orders',
      data:[],
      borderColor: 'black',
      backgroundColor: 'blue',
    },
    {
      label: 'Retailer Name',
      data:[],
     
    },
  ],
});
      useEffect(() => {
        const totalorders = [];
        const retailernames = [];
    
       
        GetOrderByRetailerr()
          .then((response) => {
            response.map((item) => {
             
              totalorders.push(item.TotalOrders);
              retailernames.push(item.users.FirstName +" "+item.users.LastName );
            });
            setretailers(retailernames);
            setData(totalorders);
    
            console.log("Total Orderss", totalorders, retailernames);
            setData({
              labels:retailernames,
            
              datasets: [
                {
                  label: 'Orders',
                  data:totalorders,
                  barPercentage: 0.5,
                
                 
                },
                {
                  label: 'Retailer Name',
                  data: retailernames,
                  barPercentage: 0.5,
               
                 
                 
                },
              ],
            })
          })
        
          .catch((e) => {
            alert(e);
          });
      }, []);
      const options = {
        indexAxis: 'x',
        elements: {
          bar: {
            borderWidth: 4,
           
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      };
   
    return(
      <Scrollbars style={{  height: 510 }}>
        <b className="biscuit">Order By Retailer Chart</b>
        <div style={{width:'70%', height:'30%'}}>
          
            <Bar data={data} options={options}  
              
            />
         </div>
         </Scrollbars>
    )
}
export default GetOrderByRetailer;
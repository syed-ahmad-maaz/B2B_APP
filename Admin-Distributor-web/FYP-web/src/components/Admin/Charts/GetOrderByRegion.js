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
  import { GetOrderByRegionn } from "../../../services/Orders";
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



const GetOrderByRegion =() => {
 
const [region, setregion] = useState([]);
const [data, setData] = useState({
  
  datasets: [
    {
      label: 'Orders',
      data:[],
      borderColor: 'black',
      backgroundColor: 'blue',
    },
    {
      label: 'Region Name',
      data:[],
     
    },
  ],
});
      useEffect(() => {
        const totalorders = [];
        const regionnames = [];
    
       
        GetOrderByRegionn()
          .then((response) => {
            response.map((item) => {
              console.log("itemmmmmmmmm", item);
              totalorders.push(item.TotalOrders);
              regionnames.push(item._id[0].region);
            });
            setregion(regionnames);
            setData(totalorders);
    
            console.log("Total Orderss", totalorders, regionnames);
            setData({
              labels:regionnames,
            
              datasets: [
                {
                  label: 'Orders',
                  data:totalorders,
                  barPercentage: 0.3,
                 
                
                 
                },
                {
                  label: 'Region Name',
                  data:regionnames,
                  barPercentage: 0.3,
                  
                 
                 
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
           
          },
        },
      };
   
    return(
      
      <Scrollbars style={{  height: 515 }}>
      <b className="biscuit">Order By Region Chart</b>
      <div style={{width:'70%', height:'30%'}}>
            <Bar data={data} options={options}  
              
            />
         </div>
         </Scrollbars>)
}
export default GetOrderByRegion;
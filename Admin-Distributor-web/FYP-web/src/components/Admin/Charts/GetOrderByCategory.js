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
  import { GetOrderByCategoryy } from "../../../services/Orders";
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



const GetOrderByCategory =() => {
 
const [category, setCategory] = useState([]);
const [data, setData] = useState({
  
  datasets: [
    {
      label: 'Orders',
      data:[],
      borderColor: 'white',
      backgroundColor: 'blue',
    },
    {
      label: 'Category Name',
      data:[],
      // borderColor: 'rgb(53, 162, 235)',
      // backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
});
      useEffect(() => {
        const totalorders = [];
        const categorynames = [];
    
       
        GetOrderByCategoryy()
          .then((response) => {
            response.map((item) => {
              console.log("itemmmmmmmmm", item);
              totalorders.push(item.TotalOrders);
              categorynames.push(item._id);
            });
            setCategory(categorynames);
            setData(totalorders);
    
            console.log("Total Orderss", totalorders, categorynames);
            setData({
              labels:categorynames,
              // labels:category.map((data)=>data.categorynames),
              datasets: [
                {
                  label: 'Orders',
                  data:totalorders,
                  barPercentage: 0.5,
                  // borderColor: 'rgb(255, 99, 132)',
                  // backgroundColor: 'rgba(99, 132, 0.5)',
                 
                },
                {
                  label: 'Category Name',
                  data:categorynames,
                  barPercentage: 0.5,
                  // borderColor: 'rgb(53, 162, 235)',
                  // backgroundColor: 'rgba(53, 235, 0.5)',
                 
                 
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
      
      <Scrollbars style={{  height: 515 }}>
      <b className="biscuit">Order By Category Chart</b>
        <div style={{width:'70%', height:'45%'}}>
           
            <Bar data={data} options={options}  
              
            />
         </div>
         </Scrollbars>)
}
export default GetOrderByCategory;
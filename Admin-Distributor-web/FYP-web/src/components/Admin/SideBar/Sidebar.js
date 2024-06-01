import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RuleSharpIcon from '@mui/icons-material/RuleSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';



export const SidebarData = [
  
  {
    title: 'Region',
    path: '/addregion',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'View Regions',
    path: '/viewallregions',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Product',
    path: '/addedproduct',
    icon: <ProductionQuantityLimitsIcon />,
    cName: 'nav-text',
  },
  {
    title: 'View Poducts',
    path: '/viewlistofproduct',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Category',
    path: '/addedcategories',
    icon: <CategoryIcon />,
    cName: 'nav-text',
  },
  {
    
     title: 'View Category',
    path: '/viewlistofcategory',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  
  {
    
    title: 'Offers',
    path: '/upcomingoffers',
    icon: <LocalOfferIcon />,
    cName: 'nav-text'
  },
  {
    
    title: 'View Offers',
    path: '/viewupcomingoffers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    
    title: 'Orders',
    path: '/viewOrder',
    icon: <RuleSharpIcon />,
    cName: 'nav-text'
  },
  
  {
    
    title: 'Distributor',
    path: '/createdistributor',
    icon: <AddBoxIcon />,
    cName: 'nav-text'
  },
  {
    
    title: 'Region Chart',
    path: '/orderbyregion',
    icon: <BarChartIcon />,
    cName: 'nav-text'
  },
  {
    
    title: 'All Distributor',
    path: '/viewdistributor',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    
    title: 'Dispatcher',
    path: '/createdispatch',
    icon: <AddBoxIcon />,
    cName: 'nav-text'
  },
  {
    
    title: 'All Dispatchers',
    path: '/listofdispatchers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    
    title: 'Booker',
    path: '/createbooker',
    icon: <AddBoxIcon />,
    cName: 'nav-text'
  },
  {
    
    title: 'All Bookers',
    path: '/allbookers',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    
    title: 'Category Chart',
    path: '/orderbydatecategory',
    icon: <BarChartIcon />,
    cName: 'nav-text'
  },
  

  {
    
    title: 'Date Chart',
    path: '/orderbydatechart',
    icon: <BarChartIcon />,
    cName: 'nav-text'
  },
  
  {
    
    title: 'Retailer Chart',
    path: '/orderbyretailer',
    icon: <BarChartIcon />,
    cName: 'nav-text'
  },
  {
    
    title: 'View Retailers',
    path: '/retailerlist',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }
 
];
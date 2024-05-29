import React from 'react-dom';
import { Link } from 'react-router-dom';
const Nav=()=>
{
    return(
        <div>
          
            <ul className="header-ul">
                {/* <li><Link to="/">Product</Link></li> */}
                <li><Link to="/signup"><button>SignUp</button></Link></li>
                <li><Link to="/login"><button>Login</button></Link></li>
                <li><Link to="/adminlogin"><button>AdminLogin</button></Link></li>
                <li><Link to="/adminregion"><button>Regions</button></Link></li>
                <li><Link to="/admincategories"><button>Categories</button></Link></li>
                <li><Link to="/adminproduct"><button>Add Product</button></Link></li>
                <li><Link to="/showregion"><button>View Region</button></Link></li>
                <li><Link to="/viewcategory"><button>View Categories</button></Link></li>
                <li><Link to="/viewproduct"><button>View Product</button></Link></li>
               
            </ul>
        </div>

    );
}

export default Nav; 
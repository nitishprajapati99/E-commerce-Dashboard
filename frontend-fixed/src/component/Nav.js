
import { Link,useNavigate } from 'react-router-dom';
const Nav = () => {
    const result = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');

    }
    return (
       
        
        <div>
           
            {
                (result) ?
               
                   
                   < ul className="nav-ul" >
                          
                        <li> <Link to="/">Product</Link></li>
                        <li><Link to="/add"> add Product</Link></li>
                        <li><Link to="/update/:id">update product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/signup">Logout  </Link></li>
                        
                    </ul >
                    :
                    <ul className='nav-ul , nav-right'>

                        <li><Link to='/signup'>SignUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>


            }
        </div>
    )

}

export default Nav;
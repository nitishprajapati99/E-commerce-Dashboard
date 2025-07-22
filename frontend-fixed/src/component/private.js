import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
    const isAuthorizedUser = localStorage.getItem('user');
    // console.log('auth',isAuthorizedUser);
    return isAuthorizedUser ? <Outlet /> : <Navigate to='/signup' />

}
export default PrivateComponent;            
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <Link to="/">
        SignUp
        </Link>
        <Link to="/login">
        Login
        </Link>
        <Link to="/forget-password">
        Forget Password
        </Link>
    </div>
  )
}

export default Navbar
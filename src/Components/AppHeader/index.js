import { BellFilled, MailOutlined } from '@ant-design/icons';
import { Image, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';

function AppHeader() {
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };
  // method to import the logo from public folder
  const logoUrl = `${process.env.PUBLIC_URL}/itgrowlogo.png`;

  return (
    <div className="AppHeader">
      <Image width={40} src={logoUrl} />
      <Typography.Title>It Grow Dashboard</Typography.Title>
      <button onClick={handleLogOut} className="Btn" type="submit">
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </div>
        <div className="text">Logout</div>
      </button>
    </div>
  );
}
export default AppHeader;

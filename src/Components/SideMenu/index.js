import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectedDataSources from '../../Pages/SelectedDataSources';
import './index.css';

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');

  const selectedDataSources = location.state?.selectedDataSources || [];
  console.log(
    'Selected data sources in SelectedDataSources:',
    selectedDataSources,
  );

  const navigate = useNavigate(); // Moved this line to the top

  const handleSelect = (key) => {
    if (key === '/selectedDataSources') {
      // Redirect to the selectedDataSources page with the selected data sources
      navigate(`/selectedDataSources`, { state: { selectedDataSources } });
    } else {
      navigate(key);
    }
  };

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <AppstoreOutlined />,
      key: '/dashboard',
    },
    {
      label: 'Data Source',
      icon: <DatabaseOutlined />,
      key: '/',
    },
    {
      label: 'Orders',
      key: '/orders',
      icon: <ShoppingCartOutlined />,
    },
    {
      label: 'Customers',
      key: '/customers',
      icon: <UserOutlined />,
    },
  ];

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={({ key }) => handleSelect(key)} // Modified the onClick handler
        selectedKeys={[selectedKeys]}
        items={menuItems} // Used the menuItems array directly
      />
    </div>
  );
}

export default SideMenu;

import { Avatar, Rate, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getCustomers, getInventory } from '../../API';
import AppHeader from '../../Components/AppHeader';
import AppFooter from '../../Components/AppFooter';
import SideMenu from '../../Components/SideMenu';
import '../../App.css';

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <Space size={20} direction="vertical">
          <Typography.Title level={4}>Customers</Typography.Title>
          <Table
            loading={loading}
            columns={[
              {
                title: 'Photo',
                dataIndex: 'image',
                render: (link) => <Avatar src={link} />,
              },
              {
                title: 'First Name',
                dataIndex: 'firstName',
              },
              {
                title: 'LastName',
                dataIndex: 'lastName',
              },
              {
                title: 'Email',
                dataIndex: 'email',
              },
              {
                title: 'Phone',
                dataIndex: 'phone',
              },

              {
                title: 'address',
                dataIndex: 'address',
                render: (address) => (
                  <span>
                    {address.address}, {address.city}
                  </span>
                ),
              },
            ]}
            dataSource={dataSource}
            pagination={{
              pageSize: 5,
            }}
          />
        </Space>
      </div>
      <AppFooter />
    </div>
  );
}
export default Customers;

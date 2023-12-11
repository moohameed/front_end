import { Avatar, Rate, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getInventory, getOrders } from '../../API';
import AppHeader from '../../Components/AppHeader';
import AppFooter from '../../Components/AppFooter';
import SideMenu from '../../Components/SideMenu';
import '../../App.css';

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <Space size={20} direction="vertical">
          <Typography.Title level={4}>Orders</Typography.Title>
          <Table
            loading={loading}
            columns={[
              {
                title: 'Title',
                dataIndex: 'title',
              },
              {
                title: 'Price',
                dataIndex: 'price',
                render: (value) => <span>${value}</span>,
              },
              {
                title: 'DiscountedPrice',
                dataIndex: 'discountedPrice',
                render: (value) => <span>${value}</span>,
              },
              {
                title: 'Quantity',
                dataIndex: 'quantity',
              },
              {
                title: 'Total',
                dataIndex: 'total',
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
export default Orders;

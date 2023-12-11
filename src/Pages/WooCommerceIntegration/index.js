import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Input,
  Button,
  Card,
  Row,
  Col,
  Modal,
  List,
  Divider,
  Table,
  Form,
  Space,
} from 'antd';

const { Title } = Typography;

const WooCommerceIntegration = () => {
  const backendURL = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.auth.userToken);
  const [connectors, setConnectors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    api_url: '',
    consumer_key: '',
    consumer_secret: '',
  });
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Date Created',
      dataIndex: 'date_created',
      key: 'date_created',
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method_title',
      key: 'payment_method_title',
    },
    // ... you can add more columns based on other fields you find important.
  ];

  useEffect(() => {
    console.log(token);
    // This useEffect fetches connectors for the authenticated user on component mount
    const fetchConnectors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getWoo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        if (data && !data.errors) {
          setConnectors(data);
        }
      } catch (error) {
        console.error('Failed to fetch connectors', error);
      }
    };

    fetchConnectors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteConnector = async (connectorId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/woo_delete/${connectorId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.ok) {
        // Filter out the connector from the state
        setConnectors((prev) =>
          prev.filter((connector) => connector.id !== connectorId),
        );
        Modal.success({
          title: 'Success',
          content: 'Connector deleted successfully!',
        });
      } else {
        Modal.error({ title: 'Error', content: 'Failed to delete connector.' });
      }
    } catch (error) {
      Modal.error({ title: 'Error', content: 'Failed to delete connector.' });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateConnector = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/createWoo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        // Check if the response status was successful
        setConnectors((prev) => [...prev, data]);
        Modal.success({
          title: 'Success',
          content: 'Connector created successfully!',
        });
      } else {
        Modal.error({ title: 'Error', content: 'Failed to create connector.' });
      }
    } catch (error) {
      Modal.error({ title: 'Error', content: 'Failed to create connector.' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async (connectorId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/woocommerce_orders_unique/${connectorId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        if (data && Array.isArray(data) && data.length > 0) {
          // Assumes a successful response contains an array of orders
          setOrders(data);
          Modal.success({
            title: 'Success',
            content: 'Orders fetched successfully!',
          });
        } else {
          Modal.warning({
            title: 'Warning',
            content:
              'Orders fetched successfully, but no orders were returned. Check your WooCommerce setup or the validity of the connector.',
          });
        }
      } else {
        // This is a catch-all error response. You can add more specific checks based on the actual error responses you expect from your API.
        Modal.error({
          title: 'Error',
          content: `Failed to fetch orders. ${data.message || ''}`,
        });
      }
    } catch (error) {
      Modal.error({
        title: 'Error',
        content:
          'Failed to fetch orders. Please check your network connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>WooCommerce Integration</Title>
      <Card style={{ marginBottom: '20px' }}>
        <Title level={4}>Create Connector</Title>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label={<Typography.Text strong>API URL</Typography.Text>}
              >
                <Input
                  placeholder="Enter API URL"
                  name="api_url"
                  value={formData.api_url}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<Typography.Text strong>Consumer Key</Typography.Text>}
              >
                <Input
                  placeholder="Enter Consumer Key"
                  name="consumer_key"
                  value={formData.consumer_key}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <Typography.Text strong>Consumer Secret</Typography.Text>
                }
              >
                <Input
                  placeholder="Enter Consumer Secret"
                  name="consumer_secret"
                  value={formData.consumer_secret}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <Button
              type="primary"
              size="large"
              loading={isLoading}
              onClick={handleCreateConnector}
            >
              Create Connector
            </Button>
            <Button type="default" size="large">
              Clear
            </Button>
          </Space>
        </Form>
      </Card>

      <Divider orientation="left">Your Connectors</Divider>

      <List
        dataSource={connectors}
        renderItem={(connector) => (
          <List.Item key={connector.id}>
            <Card
              title={
                <Typography.Text strong>{connector.api_url}</Typography.Text>
              }
            >
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    fetchOrders(connector.id);
                  }}
                >
                  Fetch Orders
                </Button>
                <Button
                  type="danger"
                  onClick={() => {
                    handleDeleteConnector(connector.id);
                  }}
                >
                  Delete Connector
                </Button>
              </Space>
            </Card>
          </List.Item>
        )}
      />

      <Divider orientation="left">Fetched Orders</Divider>
      {orders && orders.length > 0 && (
        <Table dataSource={orders} columns={columns} />
      )}
    </div>
  );
};

export default WooCommerceIntegration;

/**
 Explanation
The code provided is a React component called WooCommerceIntegration that integrates with the WooCommerce API. It allows users to create connectors, fetch orders, and delete connectors.

Here is a breakdown of the code and its functionality:

Importing necessary dependencies:

React and useState from the react library for managing component state.
useSelector from the react-redux library for accessing the Redux store.
Various components from the antd library for UI elements.
Defining the WooCommerceIntegration component:

The component is a functional component that uses React hooks for managing state.
It initializes the state variables connectors, orders, isLoading, and formData using the useState hook.
It defines a constant columns that represents the columns for the orders table.
It fetches the connectors for the authenticated user on component mount using the useEffect hook.
It defines various event handlers for input changes, deleting connectors, creating connectors, and fetching orders.
Rendering the component:

The component renders a title, a card for creating connectors, a list of connectors, and a table for fetched orders.
The title is rendered using the Typography component from antd.
The card contains a form for creating connectors, which includes input fields for API URL, consumer key, and consumer secret.
The list of connectors is rendered using the List component from antd, with each connector displayed in a card.
The fetched orders are rendered in a table using the Table component from antd.
Overall, the code provides a user interface for managing WooCommerce connectors and fetching orders. It utilizes React hooks for state management and integrates with the WooCommerce API for data retrieval and manipulation.
 */

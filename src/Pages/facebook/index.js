import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Table,
  Card,
  Row,
  Col,
  Divider,
  Typography,
  Space,
  Tooltip,
} from 'antd';
import {
  FacebookOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  CheckCircleTwoTone,
  ApiOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Facebook = () => {
  const [pageData, setPageData] = useState(null);
  const [insightsData, setInsightsData] = useState({});
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('data')) {
      const receivedData = JSON.parse(
        decodeURIComponent(urlParams.get('data')),
      );
      setPageData(receivedData.page_data);
    }
  }, []);

  const handleFacebookLogin = () => {
    console.log('Facebook login initiated');
    window.location.href = 'http://127.0.0.1:8000/api/facebook-login/';
  };

  const handleMetricChange = (pageId, metric, isChecked) => {
    setCheckboxStates((prevState) => {
      const newState = { ...prevState };
      if (!newState[pageId]) {
        newState[pageId] = {};
      }
      newState[pageId][metric] = isChecked;
      return newState;
    });
  };

  const handleFetchInsights = async (pageId) => {
    const response = await fetch('http://127.0.0.1:8000/api/get_insights/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_id: pageId,
        access_token: pageData.find((p) => p.id === pageId).access_token,
        metrics: Object.keys(checkboxStates[pageId])
          .filter((metric) => checkboxStates[pageId][metric])
          .join(','),
      }),
    });

    const data = await response.json();
    setInsightsData((prevData) => ({ ...prevData, [pageId]: data }));
  };

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Value (Latest)',
      dataIndex: 'value',
      key: 'value',
      render: (_, record) =>
        record.values && record.values[record.values.length - 1].value,
    },
    {
      title: 'End Time (Latest)',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (_, record) =>
        record.values &&
        new Date(
          record.values[record.values.length - 1].end_time,
        ).toLocaleDateString(),
    },
  ];

  return (
    <div style={{ padding: '2rem', background: '#f0f2f5' }}>
      <Row justify="center" style={{ marginBottom: '2rem' }}>
        <Col>
          <Button type="primary" onClick={handleFacebookLogin}>
            <FacebookOutlined /> Connect with Facebook
          </Button>
        </Col>
      </Row>

      {pageData &&
        pageData.map((page) => (
          <Card
            key={page.id}
            style={{
              marginBottom: '2rem',
              borderLeft: '5px solid #1890ff',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Title level={3}>{page.name}</Title>
            <Text type="secondary">{page.category}</Text>

            <Divider />

            <Tooltip title="Total actions on your page">
              <Checkbox
                checked={checkboxStates[page.id]?.page_total_actions ?? false}
                onChange={(e) =>
                  handleMetricChange(
                    page.id,
                    'page_total_actions',
                    e.target.checked,
                  )
                }
              >
                <LineChartOutlined
                  style={{ color: '#1890ff', marginRight: '0.5rem' }}
                />{' '}
                Total Actions
              </Checkbox>
            </Tooltip>
            <Tooltip title="Users engaged with your page">
              <Checkbox
                checked={checkboxStates[page.id]?.page_engaged_users ?? false}
                onChange={(e) =>
                  handleMetricChange(
                    page.id,
                    'page_engaged_users',
                    e.target.checked,
                  )
                }
              >
                <UsergroupAddOutlined
                  style={{ color: '#1890ff', marginRight: '0.5rem' }}
                />{' '}
                Engaged Users
              </Checkbox>
            </Tooltip>
            <Divider />

            <Button
              type="primary"
              size="medium"
              icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
              onClick={() => handleFetchInsights(page.id)}
            >
              Fetch Insights
            </Button>

            {insightsData[page.id]?.data && (
              <>
                <Divider />
                <Table
                  dataSource={insightsData[page.id].data}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                  expandable={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    expandedRowRender: (record) => (
                      <pre>{JSON.stringify(record.values, null, 2)}</pre>
                    ),
                  }}
                />
              </>
            )}
          </Card>
        ))}
    </div>
  );
};

export default Facebook;

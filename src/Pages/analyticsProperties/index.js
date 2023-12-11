/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Button, Typography, Spin, Alert, Card, List, Checkbox } from 'antd';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const AnalyticsProperties = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const access_token = params.get('googleanalyticsaccestoken');
  const [accessToken, setAccessToken] = useState(access_token);
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState([]);

  const handlePropertySelect = (viewId) => {
    const isSelected = selectedProperties.includes(viewId);
    if (isSelected) {
      setSelectedProperties(selectedProperties.filter((id) => id !== viewId));
    } else {
      setSelectedProperties([...selectedProperties, viewId]);
    }
  };

  const handleFetchData = async () => {
    // Add some debugging statements
    console.log('accessToken:', accessToken);
    console.log('selectedProperties:', selectedProperties);

    // Send a POST request to the Django endpoint for fetching data
    try {
      setLoading(true);

      const response = await fetch(
        'http://localhost:8000/api/google-analytics-data/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: accessToken,
            selected_properties: selectedProperties,
          }),
        },
      );

      if (response.status === 200) {
        const data = await response.json();
        // Handle the data you receive from the backend
        console.log('Fetched Data:', data);
      } else {
        setError('Error fetching data');
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetProperties = async () => {
    try {
      setLoading(true);
      const propertiesResponse = await fetch(
        `http://localhost:8000/api/google-analytics-properties/?access_token=${accessToken}`,
      );

      if (propertiesResponse.status === 200) {
        const propertiesData = await propertiesResponse.json();
        setProperties(propertiesData);

        // Update selected properties if they are no longer available
        setSelectedProperties((prevSelectedProperties) =>
          prevSelectedProperties.filter((propertyId) =>
            propertiesData.some((property) => property.view_id === propertyId),
          ),
        );
      } else {
        setError('Error fetching Google Analytics properties');
      }
    } catch (error) {
      setError(`Error fetching Google Analytics properties: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProperties();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card style={{ width: 400, padding: 20, textAlign: 'center' }}>
        <Title level={3}>Google Analytics Properties</Title>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Button type="primary" onClick={handleGetProperties}>
              Get Properties
            </Button>
            {error && (
              <div style={{ margin: '20px 0' }}>
                <Alert message={error} type="error" />
              </div>
            )}
            {properties && (
              <div style={{ marginTop: '20px' }}>
                <p>Select Google Analytics Properties:</p>
                <List
                  bordered
                  dataSource={properties}
                  renderItem={(property) => (
                    <List.Item key={property.view_id}>
                      <Checkbox
                        checked={selectedProperties.includes(property.view_id)}
                        onChange={() => handlePropertySelect(property.view_id)}
                      >
                        {property.name}
                      </Checkbox>
                    </List.Item>
                  )}
                />
                <Button type="primary" onClick={handleFetchData}>
                  Fetch Data
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default AnalyticsProperties;

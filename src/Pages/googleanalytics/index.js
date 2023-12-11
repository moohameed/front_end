/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { Button, Typography, Input, Spin, Alert, Card } from 'antd';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const GmailAuth = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const access_token = params.get('googleanalyticsaccestoken');

  const [authorizationUrl, setAuthorizationUrl] = useState(null);
  const [accessCode, setAccessCode] = useState('');
  const [accessToken, setAccessToken] = useState(access_token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInitiateAuth = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/google-auth/');
      if (response.status === 200) {
        const data = await response.json();
        setAuthorizationUrl(data.authorization_url);
      } else {
        setError('Error initiating Gmail authentication');
      }
    } catch (error) {
      setError(`Error initiating Gmail authentication: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAuth = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/google-auth-callback/?code=${accessCode}`,
      );
      if (response.status === 200) {
        const data = await response.json();
        setAccessToken(data.access_token);

        // After obtaining the access token, fetch Google Analytics properties
      } else {
        setError('Error completing Gmail authentication');
      }
    } catch (error) {
      setError(`Error completing Gmail authentication: ${error.message}`);
    }
  };

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
        <Title level={3}>Gmail Account Authentication</Title>
        {error && (
          <div style={{ marginBottom: 20 }}>
            <Alert message={error} type="error" />
          </div>
        )}
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            {authorizationUrl ? (
              <div style={{ marginBottom: 20 }}>
                <a
                  href={authorizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here to connect your Gmail account
                </a>
              </div>
            ) : (
              <div style={{ marginTop: 20 }}>
                <Button type="primary" onClick={handleInitiateAuth}>
                  Initiate Gmail Authentication
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default GmailAuth;

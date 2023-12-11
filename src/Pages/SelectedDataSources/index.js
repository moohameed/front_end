import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Avatar, Space, Table, Typography, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faTrash } from '@fortawesome/free-solid-svg-icons';
import AppHeader from '../../Components/AppHeader';
import SideMenu from '../../Components/SideMenu';
import AppFooter from '../../Components/AppFooter';
import './index.css';

const { Option } = Select;

const SelectedDataSources = () => {
  const availableDataSources = [
    {
      name: 'Facebook',
      logo: '/facebookLogo.png',
      route: '/facebook', // Add a route for Facebook
    },
    {
      name: 'Instagram',
      logo: '/instagramLogo.png',
      route: '/instagram-route', // Add a route for Instagram
    },
    {
      name: 'Google Analytics',
      logo: '/GoogleAnalyticsLogo.png',
      route: '/googleanalytics', // Add a route for analytics
    },
    {
      name: 'WooCommerce',
      logo: '/WooCommerceLogo.png',
      route: '/woocomerceintegration', // Add a route for woocomerce
    },
    // Add similar route mappings for other data sources
  ];

  const navigate = useNavigate(); // Utilize useNavigate for redirection

  const handleDataSourceSelect = (dataSource) => {
    // Retrieve the route for the selected data source
    const { route } = dataSource;

    // Redirect to the route for the selected data source
    navigate(route);
  };

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <Space size={10} direction="vertical">
          <div className="dataSourceSelectorContainer">
            <h3>Choisissez vos sources de données</h3>
            <div className="dataSourceCards">
              {availableDataSources.map((dataSource) => (
                <div className="card" key={dataSource.name}>
                  <div className="icon">
                    <img
                      src={dataSource.logo}
                      alt={`${dataSource.name} Logo`}
                      height="24"
                      width="24"
                    />
                  </div>
                  <strong>{dataSource.name}</strong>
                  <div className="card__body">Get it now.</div>
                  <button
                    type="button"
                    onClick={() => handleDataSourceSelect(dataSource)}
                  >
                    Go Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Space>
      </div>
      <AppFooter />
    </div>
  );
};

export default SelectedDataSources;

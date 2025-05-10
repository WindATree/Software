import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
//import { Map, APILoader, Marker } from '@uiw/react-baidu-map';
import axios from 'axios';
import '../styles/DataCenter.css';
import { useNavigate } from 'react-router-dom';

const DataCenter = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleNavClick = (page: string) => {
    switch(page) {
      case 'main':
        navigate('/dashboard');
        break;
      case 'underwater':
        // 后续实现水下系统页面跳转
        break;
      case 'data':
        navigate('/datacenter');
        break;
      case 'ai':
        // 后续实现智能中心页面跳转
        break;
    }
  };

  const [userData, setUserData] = useState({
    totalUsers: 0,
    farmers: 0,
    managers: 0
  });

  const [sensorData, setSensorData] = useState({
    totalSensors: 0,
    activeSensors: 0,
    faultySensors: 0
  });

  // 设备状态数据
  const [deviceStats, setDeviceStats] = useState([
    { name: '设备电量', value: 0 },
    { name: 'CPU占用率', value: 0 },
    { name: 'GPU占用率', value: 0 },
    { name: '内存占用率', value: 0 }
  ]);

  // 从后端获取所有数据
  const fetchAllData = async () => {
    try {
      // 获取用户数据
      const userResponse = await axios.get('/api/user-stats');
      setUserData(userResponse.data);
      
      // 获取传感器数据
      const sensorResponse = await axios.get('/api/sensor-stats');
      setSensorData(sensorResponse.data);
      
      // 获取设备状态数据
      const deviceResponse = await axios.get('/api/device-stats');
      setDeviceStats(deviceResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 设置定时器定期更新所有数据
  useEffect(() => {
    // 立即获取一次数据
    fetchAllData();
    
    // 设置每5秒更新一次数据
    const interval = setInterval(fetchAllData, 5000);
    
    // 清除定时器
    return () => clearInterval(interval);
  }, []);

  // 图表颜色配置
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="datacenter">
      <div className="ocean-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <header className="datacenter-header">
        <div className="header-content">
          <h1>海洋牧场智慧可视化系统</h1>
          <div className="nav-buttons">
            <button 
              className="nav-button"
              onClick={() => handleNavClick('main')}
            >
              主要信息
            </button>
            <button 
              className="nav-button"
              onClick={() => handleNavClick('underwater')}
            >
              水下系统
            </button>
            <button 
              className="nav-button active"
              onClick={() => handleNavClick('data')}
            >
              数据中心
            </button>
            <button 
              className="nav-button"
              onClick={() => handleNavClick('ai')}
            >
              智能中心
            </button>
          </div>
          <div className="user-info">
            <span>欢迎, {user.username}</span>
            <span className="user-role">({user.role === 'admin' ? '管理员' : '普通用户'})</span>
            <button onClick={handleLogout} className="logout-button">退出</button>
          </div>
        </div>
      </header>

      <main className="datacenter-main">
        <div className="datacenter-title">
          <h2>数据中心</h2>
          <p className="subtitle">数据统计与分析</p>
        </div>

        <div className="datacenter-grid">
          <div className="datacenter-card">
            <div className="card-header">
              <h3>数据概览</h3>
              <div className="card-icon">📊</div>
            </div>
            <div className="card-content">
              <div className="data-item">
                <span className="label">总数据量</span>
                <span className="value">1,234,567</span>
              </div>
              <div className="data-item">
                <span className="label">今日新增</span>
                <span className="value">12,345</span>
              </div>
              <div className="data-item">
                <span className="label">数据完整率</span>
                <span className="value">99.9%</span>
              </div>
            </div>
          </div>

          <div className="datacenter-card">
            <div className="card-header">
              <h3>数据分布</h3>
              <div className="card-icon">📈</div>
            </div>
            <div className="card-content">
              <div className="data-item">
                <span className="label">水温数据</span>
                <span className="value">45%</span>
              </div>
              <div className="data-item">
                <span className="label">盐度数据</span>
                <span className="value">30%</span>
              </div>
              <div className="data-item">
                <span className="label">其他数据</span>
                <span className="value">25%</span>
              </div>
            </div>
          </div>

          <div className="datacenter-card">
            <div className="card-header">
              <h3>数据质量</h3>
              <div className="card-icon">🔍</div>
            </div>
            <div className="card-content">
              <div className="data-item">
                <span className="label">异常数据</span>
                <span className="value">0.1%</span>
              </div>
              <div className="data-item">
                <span className="label">缺失数据</span>
                <span className="value">0.05%</span>
              </div>
              <div className="data-item">
                <span className="label">数据延迟</span>
                <span className="value">0.01%</span>
              </div>
            </div>
          </div>

          <div className="datacenter-card">
            <div className="card-header">
              <h3>数据趋势</h3>
              <div className="card-icon">📉</div>
            </div>
            <div className="card-content">
              <div className="data-item">
                <span className="label">日增长率</span>
                <span className="value">+5.2%</span>
              </div>
              <div className="data-item">
                <span className="label">周增长率</span>
                <span className="value">+12.8%</span>
              </div>
              <div className="data-item">
                <span className="label">月增长率</span>
                <span className="value">+28.5%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataCenter;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainData.css';

interface User {
  username: string;
  role: string;
}

const MainData = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}') as User;

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

  return (
    <div className="dashboard">
      <div className="ocean-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <header className="dashboard-header">
        <div className="header-content">
          <h1>海洋牧场智慧可视化系统</h1>
          <div className="nav-buttons">
            <button 
              className="nav-button active" 
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
              className="nav-button"
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

      <main className="dashboard-main">
        <div className="dashboard-title">
          <h2>MainData</h2>
          <p className="subtitle">实时监测与数据分析</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>实时监测数据</h3>
              <div className="card-icon">🌊</div>
            </div>
            <div className="card-content">
              <div className="data-item">
                <span className="label">水温</span>
                <span className="value">23.5°C</span>
              </div>
              <div className="data-item">
                <span className="label">盐度</span>
                <span className="value">35‰</span>
              </div>
              <div className="data-item">
                <span className="label">溶解氧</span>
                <span className="value">6.8mg/L</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>养殖环境指标</h3>
              <div className="card-icon">🐟</div>
            </div>
            <div className="card-content">
              <div className="data-item">
                <span className="label">pH值</span>
                <span className="value">7.2</span>
              </div>
              <div className="data-item">
                <span className="label">氨氮</span>
                <span className="value">0.5mg/L</span>
              </div>
              <div className="data-item">
                <span className="label">亚硝酸盐</span>
                <span className="value">0.1mg/L</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>设备状态</h3>
              <div className="card-icon">📡</div>
            </div>
            <div className="card-content">
              <div className="data-item">
                <span className="label">在线设备</span>
                <span className="value">12/15</span>
              </div>
              <div className="data-item">
                <span className="label">传感器状态</span>
                <span className="value status-normal">正常</span>
              </div>
              <div className="data-item">
                <span className="label">系统状态</span>
                <span className="value status-normal">运行中</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>预警信息</h3>
              <div className="card-icon">⚠️</div>
            </div>
            <div className="card-content">
              <div className="alert-item">
                <span className="alert-time">10:30</span>
                <span className="alert-message">水温异常波动</span>
              </div>
              <div className="alert-item">
                <span className="alert-time">09:15</span>
                <span className="alert-message">溶解氧偏低</span>
              </div>
              <div className="alert-item">
                <span className="alert-time">08:45</span>
                <span className="alert-message">设备离线提醒</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainData; 
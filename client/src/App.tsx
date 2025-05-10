import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DataCenter from './DataCenter';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="title-container">
            <h1>海洋牧场智慧可视化系统</h1>
            <p className="header-subtitle">Marine Ranch Intelligent Platform</p>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <div>
                <div className="welcome-container">
                  <div className="welcome-content">
                    <h2 className="welcome-title">智慧海洋管理平台</h2>
                    <p className="welcome-text">
                      集成物联网与大数据技术，实现海洋牧场生态环境的
                      <span className="highlight">实时监测</span>、
                      <span className="highlight">智能分析</span>和
                      <span className="highlight">三维可视化</span>
                    </p>
                  </div>
                </div>

                <div className="feature-grid">
                  <div className="feature-card">
                    <div className="card-header">
                      <h3>立体化监测网络</h3>
                    </div>
                    <p>部署水下传感器阵列，实时采集水温、盐度、流速等12项关键指标</p>
                    <div className="card-footer">
                      <span className="tag">声呐成像</span>
                      <span className="tag">浮标监测</span>
                    </div>
                  </div>

                  <div className="feature-card">
                    <div className="card-header">
                      <h3>智能决策分析</h3>
                    </div>
                    <p>基于机器学习算法预测藻类繁殖周期，优化投喂策略，降低运营风险</p>
                    <div className="card-footer">
                      <span className="tag">AI预测</span>
                      <span className="tag">风险评估</span>
                    </div>
                  </div>

                  <div className="feature-card">
                    <div className="card-header">
                      <h3>生态预警系统</h3>
                    </div>
                    <p>实时监测水质变化，预警赤潮、缺氧等生态风险，保障养殖安全</p>
                    <div className="card-footer">
                      <span className="tag">水质监测</span>
                      <span className="tag">风险预警</span>
                    </div>
                  </div>

                  <div className="feature-card">
                    <div className="card-header">
                      <h3>养殖管理优化</h3>
                    </div>
                    <p>智能分析养殖密度、投喂量等参数，提供最优养殖方案</p>
                    <div className="card-footer">
                      <span className="tag">智能投喂</span>
                      <span className="tag">密度优化</span>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/datacenter" element={<DataCenter />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 
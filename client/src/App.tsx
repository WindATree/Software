import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>海洋牧场智慧可视化系统</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <div>
                <div className="welcome-container">
                  <h2 className="welcome-title">欢迎使用海洋牧场智慧可视化系统</h2>
                  <p className="welcome-text">
                    本系统提供全面的海洋牧场监测数据分析和可视化功能，助力海洋牧场的智能化管理。
                  </p>
                </div>
                <div className="feature-grid">
                  <div className="feature-card">
                    <h3>实时监测</h3>
                    <p>24小时不间断监测海洋环境数据，包括水温、pH值、溶解氧等关键指标。</p>
                  </div>
                  <div className="feature-card">
                    <h3>数据分析</h3>
                    <p>智能分析历史数据，预测环境变化趋势，为决策提供数据支持。</p>
                  </div>
                  <div className="feature-card">
                    <h3>可视化展示</h3>
                    <p>直观展示监测数据，支持多维度数据可视化，让数据一目了然。</p>
                  </div>
                  <div className="feature-card">
                    <h3>智能预警</h3>
                    <p>异常数据实时预警，及时发现问题，保障海洋牧场安全运行。</p>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 
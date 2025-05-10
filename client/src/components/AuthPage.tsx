import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';

interface User {
  username: string;
  role: string;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        if (isLogin) {
          const userData: User = {
            username: data.username,
            role: data.role
          };
          localStorage.setItem('user', JSON.stringify(userData));
          window.location.href = '/dashboard';
        } else {
          setIsLogin(true);
          setError('注册成功，请登录');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(isLogin ? '登录失败，请稍后重试' : '注册失败，请稍后重试');
    }
  };

  return (
    <div className="auth-page">
      <div className="ocean-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h2>{isLogin ? '欢迎回来' : '创建账号'}</h2>
            <p className="auth-subtitle">{isLogin ? '请登录您的账号' : '请填写以下信息注册'}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>
                <span className="icon">👤</span>
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="请输入用户名"
              />
            </div>

            <div className="form-group">
              <label>
                <span className="icon">🔒</span>
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="请输入密码"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>
                  <span className="icon">👥</span>
                  角色
                </label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="role-select"
                >
                  <option value="user">普通用户</option>
                  <option value="admin">管理员</option>
                </select>
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? '登录' : '注册'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? '还没有账号？' : '已有账号？'}
              <button
                className="switch-auth-mode"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
              >
                {isLogin ? '立即注册' : '立即登录'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
//import { Map, APILoader, Marker } from '@uiw/react-baidu-map';
import axios from 'axios';
import './DataCenter.css';

const DataCenter = () => {
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
    <main className="data-container">
        <div className="data-grid">
            {/* 左侧表格区域 (30%) */}
            <div className="left-panel">
            <div className="data-table">
                <h3>用户总体信息</h3>
                <table>
                <tbody>
                    <tr>
                    <td>总用户数</td>
                    <td>{userData.totalUsers}</td>
                    </tr>
                    <tr>
                    <td>养殖户数</td>
                    <td>{userData.farmers}</td>
                    </tr>
                    <tr>
                    <td>管理人员数</td>
                    <td>{userData.managers}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            
            <div className="data-table">
                <h3>传感器总体信息</h3>
                <table>
                <tbody>
                    <tr>
                    <td>总传感器数</td>
                    <td>{sensorData.totalSensors}</td>
                    </tr>
                    <tr>
                    <td>开启传感器数</td>
                    <td>{sensorData.activeSensors}</td>
                    </tr>
                    <tr>
                    <td>异常传感器数</td>
                    <td>{sensorData.faultySensors}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>

            {/* 右侧可视化区域 (70%) */}
            <div className="right-panel">
            {/* 上部设备状态图表 (25%) */}
            <div className="device-stats" style={{ padding: '5px 15px' }}> {/* 增加左右边距 */}
                <h3 style={{ margin: '0 10px 8px 0'}}>设备运行状态</h3> {/* 缩小标题 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '15px', // 缩小网格间距
                    width: '100%',
                    height: 'auto' // 改为自动高度
                }}>
                    {[0, 1, 2, 3].map((index) => {
                    const item = deviceStats[index] || { name: '', value: 0 };
                    const hasData = item.value > 0;
                    
                    return (
                        <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px' // 缩小标签和进度条间距
                        }}>
                        {/* 设备名称 - 显示在左侧 */}
                        <div style={{ 
                            width: '70px', // 缩小标签宽度
                            fontSize: '12px', // 缩小字体
                            textAlign: 'right',
                            paddingRight: '4px' // 增加标签右内边距
                        }}>
                            {item.name || '未连接'}
                        </div>
                        
                        {/* 水平进度条容器 */}
                        <div style={{
                            flex: 1,
                            height: '16px', // 缩小进度条高度
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px', // 调整圆角
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* 进度条填充部分 - 从左到右 */}
                            <div style={{
                            width: `${item.value}%`,
                            height: '100%',
                            backgroundColor: hasData ? '#1890ff' : '#d9d9d9',
                            transition: 'width 0.5s ease'
                            }}>
                            {/* 百分比文字 - 显示在填充条内部 */}
                            {hasData && (
                                <span style={{
                                position: 'absolute',
                                left: `${item.value}%`,
                                transform: 'translateX(-100%)',
                                padding: '0 4px', // 缩小文字内边距
                                color: 'white',
                                fontSize: '11px', // 缩小字体
                                fontWeight: 'bold',
                                lineHeight: '16px' // 与进度条高度对齐
                                }}>
                                {item.value}%
                                </span>
                            )}
                            </div>
                            
                            {/* 百分比文字 - 显示在空条外部 */}
                            {!hasData && (
                            <span style={{
                                position: 'absolute',
                                left: '4px', // 调整位置
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#999',
                                fontSize: '11px' // 缩小字体
                            }}>
                                0%
                            </span>
                            )}
                        </div>
                        </div>
                    );
                    })}
                </div>
                </div>

            {/* 下部中国地图 (75%)，后续扩展 */}
            <div className="china-map">
                <h3>全国监测点分布</h3>
            </div>
            </div>
        </div>
    </main>
  );
};

export default DataCenter;
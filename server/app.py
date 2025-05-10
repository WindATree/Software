from flask import Flask, request, jsonify, Response, render_template
from flask_cors import CORS
from models import db, User, HydroData
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import csv
import io
import os
import pandas as pd
from werkzeug.datastructures import FileStorage
from math import isnan
import random
import psutil
import gpustat
from pynvml import *

app = Flask(__name__)
CORS(app)

# Read database connection details from environment variables
db_user = os.getenv('DB_USER', 'root')
db_password = os.getenv('DB_PASSWORD', '123456')
db_host = os.getenv('DB_HOST', '127.0.0.1')
db_port = os.getenv('DB_PORT', '3306')
db_name = os.getenv('DB_NAME', 'ocean_monitor')

# 打印数据库连接信息（注意：生产环境中应该移除这些打印语句）
print(f"正在连接数据库：{db_host}:{db_port}/{db_name} 用户：{db_user}")

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    user: User = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        return jsonify(
            {
                "message": "Login successful",
                "username": user.username,
                "role": user.role,
            }
        )
    else:
        return jsonify({"message": "Invalid username or password"}), 401

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    role = data["role"]
    
    # Check if username already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "用户名已存在"}), 409
    # Check if a admin already exists
    existing_admin = User.query.filter_by(role="admin").first()
    if role == "admin" and existing_admin:
        return jsonify({"message": "您不能注册管理员账户"}), 409

    new_user = User(
        username=username, role=role, password_hash=generate_password_hash(password)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(
        {
            "message": "Registration successful",
            "username": new_user.username,
            "role": new_user.role,
        }
    )

# 模拟设备状态数据
def get_device_stats():
    try:
        nvmlInit()
        gpu_handle = nvmlDeviceGetHandleByIndex(0)
    except:
        gpu_handle = None
    
    # 获取电池信息
    try:
        battery = psutil.sensors_battery()
        battery_percent = battery.percent if battery else None
    except:
        battery_percent = None
    
    # 获取 GPU 信息 (使用 gpustat 作为首选)
    try:
        gpu_stats = gpustat.new_query()
        gpu_util = gpu_stats.gpus[0].utilization if gpu_stats.gpus else None
    except:
        gpu_util = None
    
    # 如果 gpustat 不可用，尝试使用 pynvml
    if gpu_util is None and gpu_handle:
        try:
            gpu_util = nvmlDeviceGetUtilizationRates(gpu_handle).gpu
        except:
            gpu_util = None
    
    # 组装返回数据
    stats = [
        {"name": "设备电量", "value": battery_percent or 100},  # 如果没有电池信息，假设是台式机
        {"name": "CPU占用率", "value": psutil.cpu_percent(interval=1)},
        {"name": "GPU占用率", "value": gpu_util or 0},  # 如果没有 GPU，显示 0
        {"name": "内存占用率", "value": psutil.virtual_memory().percent}
    ]
    
    return stats


# 模拟用户数据
def get_user_stats():
    return {
        "totalUsers": random.randint(100, 200),
        "farmers": random.randint(50, 100),
        "managers": random.randint(10, 30)
    }

# 模拟传感器数据
def get_sensor_stats():
    return {
        "totalSensors": random.randint(500, 1000),
        "activeSensors": random.randint(400, 800),
        "faultySensors": random.randint(0, 50)
    }

@app.route('/api/device-stats', methods=['GET'])
def device_stats():
    return jsonify(get_device_stats())

@app.route('/api/user-stats', methods=['GET'])
def user_stats():
    return jsonify(get_user_stats())

@app.route('/api/sensor-stats', methods=['GET'])
def sensor_stats():
    return jsonify(get_sensor_stats())

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True) 
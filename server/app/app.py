from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from models import db, User, HydroData
from datetime import datetime
import csv
import io
import os
import pandas as pd

app = Flask(__name__)
CORS(app)
# Read database connection details from environment variables
db_user = os.getenv('DB_USER', 'root')
db_password = os.getenv('DB_PASSWORD', '123456')
db_host = os.getenv('DB_HOST', '127.0.0.1')
db_port = os.getenv('DB_PORT', '3306')
db_name = os.getenv('DB_NAME', 'ocean_monitor')

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
db.init_app(app)

@app.route("/api/login", methods=["POST"])
def login():
    return


@app.route("/api/register", methods=["POST"])
def register():
    return
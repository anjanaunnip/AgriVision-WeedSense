# 🌿 AgriVision WeedSense

AI-Powered Crop Weed Detection & Field Health Monitoring System

AgriVision WeedSense is an intelligent agriculture system that detects weeds from drone field images using YOLOv8 segmentation and generates actionable insights such as weed coverage, crop health estimation (NDVI), pesticide recommendations, and GIS-based weed zones.

This project was developed as an MCA Final Year Project.


--------------------------------------------
PROJECT FEATURES
--------------------------------------------

AI Weed Detection using YOLOv8
Crop vs Weed Segmentation
NDVI Crop Health Estimation
Smart Pesticide Recommendation
Weed Zone Detection with GIS Mapping
Direction Instructions for Field Treatment
PDF Report Generation
GIS Field Map Report
React Interactive Dashboard
Authentication System (Login / Signup)


--------------------------------------------
TECH STACK
--------------------------------------------

Frontend
React
Vite
TailwindCSS
Material UI

Backend
Django
Python

AI / Computer Vision
YOLOv8 Segmentation
OpenCV
NumPy
Scikit-Learn

Reports
ReportLab PDF Generator


--------------------------------------------
PROJECT STRUCTURE
--------------------------------------------

AgriVisionWeedSense

agrivision
 backend
  reports
   result_pdf.py
   gis_pdf.py
  views.py
  yolo_inference.py
  urls.py

 agrivision
  settings.py
  urls.py

 manage.py
 db.sqlite3

src
 app
  components
  App.tsx

 main.tsx
 styles

best.pt
package.json
README.md


--------------------------------------------
INSTALLATION GUIDE
--------------------------------------------

Download the project from the demo source

Demo Link:
https://demo-link.com/agrivision-weedsense


--------------------------------------------
BACKEND SETUP
--------------------------------------------

Create virtual environment

python -m venv venv

Activate environment

Windows
venv\Scripts\activate

Linux / Mac
source venv/bin/activate


Install dependencies

pip install -r requirements.txt


Run Django server

cd agrivision
python manage.py migrate
python manage.py runserver


Backend runs on

http://127.0.0.1:8000


--------------------------------------------
FRONTEND SETUP
--------------------------------------------

Open another terminal

Install frontend dependencies

npm install


Run frontend

npm run dev


Frontend runs on

http://localhost:5173


--------------------------------------------
HOW TO USE
--------------------------------------------

Step 1
Open the web application

http://localhost:5173


Step 2
Create an account using Signup


Step 3
Login to the system


Step 4
Upload a drone field image


Step 5
The system processes the image using YOLOv8 segmentation


Step 6
View the detection results

Displayed results include

Weed Percentage
Crop Percentage
NDVI Crop Health Index
Model Confidence
Reliability Score


Step 7
View GIS Weed Zones

The system identifies weed clusters and provides navigation instructions for farmers.


Example instruction

Move 15 steps Forward and then 8 steps Right


Step 8
Download Reports


Two reports are generated


AI Result Report

Contains

NDVI Map
Weed Segmentation Map
Crop Statistics
Pesticide Recommendation


GIS Field Report

Contains

Field Map
Weed Zones
Treatment Locations


--------------------------------------------
AI MODEL INFORMATION
--------------------------------------------

Model Used

YOLOv8 Segmentation


Training Accuracy

mAP50 = 95.61%


Model File

best.pt


--------------------------------------------
PESTICIDE RECOMMENDATION LOGIC
--------------------------------------------

Based on weed density detected in the field


Weed < 10%
Monitor Only

Weed < 20%
Butachlor

Weed < 40%
Pendimethalin

Weed < 80%
Paraquat

Weed > 80%
Glyphosate


--------------------------------------------
GIS WEED MAPPING
--------------------------------------------

Weed clusters are detected using contour detection and clustering.

Each zone contains

Weed cluster center
Contour boundary
Field navigation instruction


--------------------------------------------
REPORTS GENERATED
--------------------------------------------

AI Analysis Report

NDVI Map
Weed Detection Overlay
Crop Health Status
Pesticide Recommendation


GIS Field Report

Weed cluster locations
Field map visualization
Weed density zones


--------------------------------------------
AUTHOR
--------------------------------------------

Anjana Unni P
MCA Final Year Student


Project

AI Based Smart Agriculture System


--------------------------------------------
LICENSE
--------------------------------------------

This project is developed for academic and research purposes.
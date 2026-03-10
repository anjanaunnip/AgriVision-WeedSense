from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.clickjacking import xframe_options_exempt
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .yolo_inference import run_segmentation

# NEW PDF IMPORTS
from backend.reports.result_pdf import generate_result_pdf
from backend.reports.gis_pdf import generate_gis_pdf

import os, io, json, re, base64
from PIL import Image
import numpy as np
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.files.storage import default_storage



# =========================
# HOME PAGE
# =========================
def home(request):
    return HttpResponse("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Agri_Weed-Backend</title>
        <style>
            body {
                margin: 0;
                font-family: 'Segoe UI', Arial, sans-serif;
                background: linear-gradient(135deg, #a8d5ba, #6fbf8f);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .card {
                background: #ffffff;
                padding: 45px 50px;
                border-radius: 18px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.15);
                width: 420px;
                text-align: center;
            }
            h1 {
                margin: 0;
                font-size: 26px;
                color: #2e7d32;
            }
            h3 {
                margin-top: 10px;
                font-weight: 400;
                font-size: 15px;
                color: #555;
                margin-bottom: 30px;
            }
            .status {
                background: #e8f5e9;
                color: #2e7d32;
                padding: 12px;
                border-radius: 10px;
                font-weight: 600;
                margin-bottom: 25px;
                border: 1px solid #c8e6c9;
            }
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                font-size: 14px;
                color: #444;
            }
            li {
                margin: 8px 0;
            }
            footer {
                margin-top: 25px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🌿 AgriVision WeedSense</h1>
            <h3>AI-Powered Smart Weed Detection & Crop Health Monitoring</h3>
            <div class="status">
                🚀 Backend Server Running Successfully
            </div>
            <ul>
                <li>🔐 /signup</li>
                <li>🔑 /login</li>
                <li>📤 /upload-image</li>
                <li>📄 /download-report</li>
                <li>🗺️ /download-gis-report</li>
            </ul>
            <footer>
                © 2026 AgriVision | MCA Final Year Project
            </footer>
        </div>
    </body>
    </html>
    """)



# =========================
# SIGNUP
# =========================
@csrf_exempt
def signup(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=405)

    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    name = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not name:
        return JsonResponse({"error": "Full name is required"}, status=400)
    if not email:
        return JsonResponse({"error": "Email is required"}, status=400)

    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_regex, email):
        return JsonResponse({"error": "Invalid email format"}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"error": "Email already registered"}, status=400)

    if len(password) < 6:
        return JsonResponse({"error": "Password must be at least 6 characters"}, status=400)

    try:
        validate_password(password)
    except ValidationError as e:
        return JsonResponse({"error": e.messages[0]}, status=400)

    User.objects.create_user(username=email, email=email, password=password)

    return JsonResponse({"success": True})



# =========================
# LOGIN
# =========================
@csrf_exempt
def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=405)

    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not email:
        return JsonResponse({"error": "Email is required"}, status=400)
    if "@" not in email:
        return JsonResponse({"error": "Invalid email format"}, status=400)
    if not password:
        return JsonResponse({"error": "Password is required"}, status=400)

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid email or password"}, status=401)

    user = authenticate(username=user_obj.username, password=password)

    if user is None:
        return JsonResponse({"error": "Invalid email or password"}, status=401)

    return JsonResponse({"success": True})



# =========================
# NDVI CALCULATION
# =========================
def calculate_ndvi_rgb(img):
    img_np = np.array(img).astype(float)

    R = img_np[:, :, 2]
    G = img_np[:, :, 1]

    ndvi = (G - R) / (G + R + 1e-6)
    ndvi_normalized = (ndvi + 1) / 2

    return round(float(ndvi_normalized.mean()), 3)



# =========================
# IMAGE UPLOAD + YOLO
# =========================
@csrf_exempt
def upload_image(request):

    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=405)

    image_file = request.FILES.get("file")
    if not image_file:
        return JsonResponse({"error": "No image uploaded"}, status=400)

    os.makedirs(settings.MEDIA_ROOT, exist_ok=True)

    file_path = default_storage.save(image_file.name, image_file)
    image_path = os.path.join(settings.MEDIA_ROOT, file_path)

    img = Image.open(image_path).convert("RGB")
    ndvi_value = calculate_ndvi_rgb(img)

    try:
        results = run_segmentation(image_path)
    except Exception as e:
        return JsonResponse({"error": f"YOLO failed: {str(e)}"}, status=500)

    original_url = settings.MEDIA_URL + file_path
    overlay_rel = results["output_path"].replace(str(settings.MEDIA_ROOT), "").lstrip("/\\")
    ndvi_rel = results["ndvi_path"].replace(str(settings.MEDIA_ROOT), "").lstrip("/\\")
    overlay_url = settings.MEDIA_URL + overlay_rel
    ndvi_url = settings.MEDIA_URL + ndvi_rel

    return JsonResponse({
        "success": True,
        "weed_percentage": results["weed_percentage"],
        "crop_percentage": results["crop_percentage"],
        "confidence": results["confidence"],
        "model_accuracy": results["model_accuracy"],
        "reliability_score": results["reliability_score"],
        "zones": results["zones"],
        "recommendation": results["recommendation"],
        "image_width": results["image_width"],
        "image_height": results["image_height"],
        "ndvi": ndvi_value,
        "original_image": original_url,
        "overlay_image": overlay_url,
        "ndvi_image": ndvi_url
    })



# =========================
# MEDIA URL → PATH
# =========================
def path_from_media_url(url: str):
    if not url:
        return None
    if "/media/" in url:
        rel = url.split("/media/")[1]
        return os.path.join(settings.MEDIA_ROOT, rel)
    return None



# =========================
# PDF REPORT (NEW)
# =========================
@csrf_exempt
@xframe_options_exempt
def download_report(request):

    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=405)

    data = json.loads(request.body)

    pdf_data = {
        "weed": data.get("weed_percentage", 0),
        "crop": data.get("crop_percentage", 0),
        "ndvi": data.get("ndvi", 0),
        "model_accuracy": data.get("model_accuracy", 0),
        "health_status": data.get("health_status", "Unknown"),
        "reliability": data.get("reliability_score", 0),
        "recommendation": data.get("recommendation", {}),

        "ndvi_path": path_from_media_url(data.get("ndvi_image")),
        "overlay_path": path_from_media_url(data.get("overlay_image")),

        "buffer": io.BytesIO(),
    }

    buffer = generate_result_pdf(pdf_data)

    return HttpResponse(
        buffer,
        content_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="AgriVision_Report.pdf"'}
    )



# =========================
# GIS PDF REPORT (UPDATED)
# =========================
@csrf_exempt
def download_gis_report(request):

    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=405)

    try:
        data = json.loads(request.body)
    except Exception as e:
        print("JSON parse error:", e)
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    # -------------------------
    # Extract Base64 Map Image
    # -------------------------
    map_image_path = None

    try:
        base64_img = data.get("mapImage", None)

        if base64_img and base64_img.startswith("data:image"):
            img_str = base64_img.split(",")[1]

            # Fix base64 padding
            missing_padding = len(img_str) % 4
            if missing_padding:
                img_str += "=" * (4 - missing_padding)

            img_bytes = base64.b64decode(img_str)

            map_image_path = os.path.join(settings.MEDIA_ROOT, "gis_map_preview.jpg")

            with open(map_image_path, "wb") as f:
                f.write(img_bytes)

    except Exception as e:
        print("Map image decode error:", e)
        return JsonResponse({"error": "Map decode failed"}, status=500)

    # -------------------------
    # PDF Generate in Try/Except
    # -------------------------
    try:
        pdf_data = {
            "field_name": data.get("fieldName", "Unknown Field"),
            "weed_percentage": data.get("weedPercentage", 0),
            "zones": data.get("zones", []),
            "map_image": map_image_path,
            "buffer": io.BytesIO()
        }

        buffer = generate_gis_pdf(pdf_data)

        return HttpResponse(
            buffer,
            content_type='application/pdf',
            headers={
                "Content-Disposition": 'attachment; filename="GIS_Report.pdf"'
            }
        )

    except Exception as e:
        print("GIS PDF Error:", e)
        return JsonResponse({"error": str(e)}, status=500)
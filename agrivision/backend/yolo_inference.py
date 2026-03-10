from ultralytics import YOLO
import cv2
import numpy as np
import os
from sklearn.cluster import KMeans

# ---------------------------------
# LOAD MODEL ONLY ONCE (IMPORTANT)
# ---------------------------------
MODEL_PATH = "D:/AgriVisionWeedSense/best.pt"
model = YOLO(MODEL_PATH)


# ==========================================
# NDVI CALCULATION (RGB Approximation)
# ==========================================
def calculate_ndvi(image):

    image = image.astype(np.float32)
    b, g, r = cv2.split(image)

    ndvi = (g - r) / (g + r + 1e-6)
    ndvi = np.clip(ndvi, -1, 1)

    ndvi_normalized = ((ndvi + 1) / 2 * 255).astype(np.uint8)

    ndvi_colored = cv2.applyColorMap(ndvi_normalized, cv2.COLORMAP_JET)

    return ndvi_colored


# ==========================================
# DIRECTION LOGIC (IMPROVED GRID SYSTEM)
# ==========================================
def direction(cx, cy, w, h):
    """
    Starting Point: Bottom-Left Corner of Image
    (0, h)

    cx, cy = center of weed cluster
    w, h = image width & height
    """

    # -----------------------------
    # 1️⃣ Define Starting Point
    # -----------------------------
    start_x = 0
    start_y = h

    # -----------------------------
    # 2️⃣ Calculate Movement Needed
    # -----------------------------
    move_x = cx - start_x        # Right movement
    move_y = start_y - cy        # Forward movement

    # -----------------------------
    # 3️⃣ Convert Pixels → Steps
    # (Adjust 50 based on your field scale)
    # -----------------------------
    step_size = 50   # 50 pixels ≈ 1 step (adjust if needed)

    steps_right = round(move_x / step_size)
    steps_forward = round(move_y / step_size)

    # -----------------------------
    # 4️⃣ Create Natural Instruction
    # -----------------------------
    instructions = []

    if steps_forward > 0:
        instructions.append(f"Move {steps_forward} steps Forward")

    if steps_right > 0:
        instructions.append(f"Move {steps_right} steps Right")

    if not instructions:
        return "Weeds detected at starting point. Apply treatment here."

    return " and then ".join(instructions)



# ==========================================
# PESTICIDE RECOMMENDATION
# ==========================================
def recommend(weed_percent):

    if weed_percent < 10:
        return {
            "pesticide": "Monitor only",
            "dosage": "No spray required"
        }

    elif weed_percent < 20:
        return {
            "pesticide": "Butachlor",
            "dosage": "1.5 L per hectare"
        }

    elif weed_percent < 30:
        return {
            "pesticide": "Pretilachlor",
            "dosage": "2 L per hectare"
        }

    elif weed_percent < 40:
        return {
            "pesticide": "Pendimethalin",
            "dosage": "2.5 L per hectare"
        }

    elif weed_percent < 50:
        return {
            "pesticide": "2,4-D",
            "dosage": "1 L per hectare"
        }

    elif weed_percent < 60:
        return {
            "pesticide": "Atrazine",
            "dosage": "2.5 L per hectare"
        }

    elif weed_percent < 70:
        return {
            "pesticide": "Metribuzin",
            "dosage": "1.2 L per hectare"
        }

    elif weed_percent < 80:
        return {
            "pesticide": "Paraquat",
            "dosage": "2 L per hectare"
        }

    else:   # 80% and above
        return {
            "pesticide": "Glyphosate",
            "dosage": "3 L per hectare (Full coverage spray recommended)"
        }



# ==========================================
# MAIN SEGMENTATION PIPELINE
# ==========================================
# ===== TRAINING METRIC (FROM COLAB) =====
MODEL_MAP50 = 95.61



def run_segmentation(image_path):

    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Invalid image path")

    h, w = img.shape[:2]
    results = model(image_path)[0]

    # ---------------------------------
    # SAFE MASK CHECK
    # ---------------------------------
    if results.masks is None or len(results.masks.data) == 0:

        ndvi_img = calculate_ndvi(img)
        ext = os.path.splitext(image_path)[1]
        ndvi_path = image_path.replace(ext, f"_ndvi{ext}")
        cv2.imwrite(ndvi_path, ndvi_img)

        return {
            "weed_percentage": 0,
            "crop_percentage": 100,
            "confidence": 0,
            "model_accuracy": MODEL_MAP50,
            "reliability_score": MODEL_MAP50,
            "zones": [],
            "recommendation": recommend(0),
            "ndvi_path": ndvi_path,
            "output_path": image_path,
            "image_width": w,      # ✅ ADD THIS
            "image_height": h 
        }

    # ---------------------------------
    # COMBINE MASKS
    # ---------------------------------
    combined_mask = np.zeros((h, w), dtype=np.uint8)

    for mask_tensor in results.masks.data:
        mask = mask_tensor.cpu().numpy()
        mask = cv2.resize(mask, (w, h))
        combined_mask = np.logical_or(combined_mask, mask > 0.5)

    combined_mask = combined_mask.astype(np.uint8)

    # ---------------------------------
    # WEED %
    # ---------------------------------
    weed_pixels = np.sum(combined_mask)
    total_pixels = combined_mask.size

    weed_percentage = round((weed_pixels / total_pixels) * 100, 2)
    crop_percentage = round(100 - weed_percentage, 2)

    # ---------------------------------
    # CONFIDENCE
    # ---------------------------------
    if results.boxes is not None and len(results.boxes) > 0:
        confs = results.boxes.conf.cpu().numpy()
        confidence = float(np.mean(confs)) * 100
    else:
        confidence = 0

    confidence = round(confidence, 2)

    # ---------------------------------
    # RELIABILITY SCORE (FINAL CLEAN VERSION)
    # ---------------------------------
    confidence_normalized = min(confidence, 100)

    reliability_score = round(
        (confidence_normalized * 0.6) +
        (MODEL_MAP50 * 0.4),
        2
    )


    # ---------------------------------
    # OVERLAY IMAGE (CONTOUR OUTLINE)
    # ---------------------------------
    overlay = img.copy()

    contours, _ = cv2.findContours(
        combined_mask.astype(np.uint8),
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    cv2.drawContours(
        overlay,
        contours,
        -1,
        (0, 0, 255),
        thickness=3
    )

    output = overlay

    ext = os.path.splitext(image_path)[1]
    output_path = image_path.replace(ext, f"_overlay{ext}")
    cv2.imwrite(output_path, output)


    # ---------------------------------
    # NDVI IMAGE
    # ---------------------------------
    ndvi_img = calculate_ndvi(img)
    ndvi_path = image_path.replace(ext, f"_ndvi{ext}")
    cv2.imwrite(ndvi_path, ndvi_img)

    # ---------------------------------
    # GIS ZONES (Improved - Contour Based)
    # ---------------------------------
    zones = []

    # Find separate weed regions
    contours, _ = cv2.findContours(
        combined_mask.astype(np.uint8),
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    zone_id = 1

    for cnt in contours:

        area = cv2.contourArea(cnt)

        # Ignore very tiny detections (noise)
        if area < 500:   # adjust if needed
            continue

        # Get bounding box
        x, y, w_box, h_box = cv2.boundingRect(cnt)

        # Calculate center
        cx = x + w_box // 2
        cy = y + h_box // 2

        contour_points = cnt.squeeze().tolist()

        zones.append({
            "zone_id": zone_id,
            "x": float(cx),
            "y": float(cy),
            "instruction": direction(cx, cy, w, h),
            "area": float(area),
            "contour": contour_points
        })


        zone_id += 1
    # 🔥 Sort zones by largest area and keep top 5
    zones = sorted(zones, key=lambda z: z["area"], reverse=True)[:5]

    # 🔥 Reset zone IDs after sorting
    for i, zone in enumerate(zones):
        zone["zone_id"] = i + 1

    return {
        "weed_percentage": weed_percentage,
        "crop_percentage": crop_percentage,
        "confidence": confidence,
        "model_accuracy": MODEL_MAP50,
        "reliability_score": reliability_score,
        "zones": zones,
        "recommendation": recommend(weed_percentage),
        "ndvi_path": ndvi_path,
        "output_path": output_path,
        "image_width": w,
        "image_height": h
    }


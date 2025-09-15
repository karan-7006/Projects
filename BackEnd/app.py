from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib, json, os, re, time
import cv2
from PIL import Image
import logging
import pytesseract
import re
from PIL import Image
import pytesseract
import logging

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


# Optional OCR - only import if available
try:
    import pytesseract
    OCR_AVAILABLE = True
except ImportError:
    OCR_AVAILABLE = False
    print("⚠️  pytesseract not available - OCR functionality disabled")

# Optional fuzzy matching
try:
    from rapidfuzz import process
    FUZZY_AVAILABLE = True
except ImportError:
    FUZZY_AVAILABLE = False
    print("⚠️  rapidfuzz not available - using basic university matching")

# ---------------- Setup ----------------
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"])

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = app.logger

UPLOAD_FOLDER = "uploads"
STORE_FILE = "cert_store.json"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# University list
UNIVERSITIES_FILE = os.path.join(os.path.dirname(__file__), "universities.json")
if os.path.exists(UNIVERSITIES_FILE):
    with open(UNIVERSITIES_FILE, "r", encoding="utf-8") as f:
        UNIVERSITIES = json.load(f)
else:
    UNIVERSITIES = [
        "Gujarat Technological University",
        "Delhi University", 
        "Mumbai University",
        "Savitribai Phule Pune University"
    ]

# ---------------- Helpers ----------------
def normalize_value(v):
    if v is None:
        return ""
    return " ".join(str(v).strip().split())

def canonical_json_string(certificate: dict) -> str:
    norm = {k: normalize_value(certificate.get(k, "")) for k in certificate}
    sorted_obj = {k: norm[k] for k in sorted(norm.keys())}
    return json.dumps(sorted_obj, separators=(",", ":"), ensure_ascii=False)

def double_sha256(data: str) -> str:
    first = hashlib.sha256(data.encode("utf-8")).digest()
    return hashlib.sha256(first).hexdigest()

def load_store():
    if os.path.exists(STORE_FILE):
        try:
            with open(STORE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading store: {e}")
            return []
    return []

def save_to_store(entry: dict):
    store = load_store()
    store.append(entry)
    with open(STORE_FILE, "w", encoding="utf-8") as f:
        json.dump(store, f, ensure_ascii=False, indent=2)

def check_hash_in_store(hash_value: str) -> bool:
    store = load_store()
    return any(item.get("double_sha256_hash") == hash_value for item in store)

# ---------------- OCR Functions ----------------
def preprocess_image(img_path: str) -> str:
    """Preprocess image for better OCR results"""
    try:
        img = cv2.imread(img_path)
        if img is None:
            raise ValueError(f"Cannot read image at {img_path}")
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply median blur to reduce noise
        gray = cv2.medianBlur(gray, 3)
        
        # Apply threshold to get binary image
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Save processed image
        processed_path = img_path.rsplit(".", 1)[0] + "_processed.png"
        cv2.imwrite(processed_path, thresh)
        
        return processed_path
    except Exception as e:
        logger.error(f"Image preprocessing error: {e}")
        raise

# def extract_certificate_data(img_path: str):
#     """Extract certificate data using OCR"""
#     if not OCR_AVAILABLE:
#         return {
#             "name": "",
#             "roll_number": "",
#             "date": "",
#             "university": ""
#         }, "OCR not available - please install pytesseract"

#     try:
#         img = Image.open(img_path)
        
#         # Configure tesseract for better results
#         custom_config = r'--oem 3 --psm 6 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/:. '
#         text = pytesseract.image_to_string(img, lang="eng", config=custom_config)
        
#         # Clean and prepare text for searching
#         text_for_search = " ".join(line.strip() for line in text.splitlines() if line.strip())
#         logger.info(f"Extracted text: {text_for_search[:500]}...")  # Log first 500 chars
        
#         # Initialize fields
#         name, roll, date, university = "", "", "", ""

#         # Extract name - more flexible patterns
#         # name_patterns = [
#         #     r"(?:Name|Candidate|Student)[\s:.\-]+([A-Za-z][A-Za-z\s]{2,50})",
#         #     r"This is to certify that\s+([A-Za-z][A-Za-z\s]{2,50})",
#         #     r"(?:Mr\.|Ms\.|Miss)\s+([A-Za-z][A-Za-z\s]{2,50})"
#         # ]
#         # for pattern in name_patterns:
#         #     nm = re.search(pattern, text_for_search, re.IGNORECASE)
#         #     if nm:
#         #         name = nm.group(1).strip()
#         #         break
#         # ------------------ Extract Name ------------------
#                # ------------------ Extract Name ------------------
#         name_patterns = [
#             # Label-based
#             r"(?:Name|Candidate|Student)\s*[:\-]?\s*([A-Z][A-Za-z.\- ]{2,60})(?=\s|$)",
            
#             # Sentence form (without title)
#             r"This is to certify that\s+([A-Z][A-Za-z.\- ]{2,60})(?=\s+(?:has|who|son|daughter|of|$))",
            
#             # Certify that + title (Mr/Ms/Miss/Mrs)
#             r"(?:This is to\s+)?certify that\s+(?:Mr|Ms|Miss|Mrs)\.?\s+([A-Z][A-Za-z.\- ]{2,60})(?=\s+(?:has|who|son|daughter|of|$))",
            
#             # Title only (fallback)
#             r"(?:Mr|Ms|Miss|Mrs)\.?\s+([A-Z][A-Za-z.\- ]{2,60})(?=\s|$)"
#         ]

#         for pattern in name_patterns:
#             nm = re.search(pattern, text_for_search, re.IGNORECASE)
#             if nm:
#                 name = nm.group(1).strip()
#                 # Clean up
#                 name = re.sub(r"\s{2,}", " ", name)        # normalize spaces
#                 name = re.sub(r"[^\w.\- ]", "", name)      # remove stray punctuation
#                 break

#         # Optional fallback: capitalized words sequence (2–3 words)
#         if not name:
#             fallback = re.findall(r"\b[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?", text_for_search)
#             if fallback:
#                 name = fallback[0].strip()


#         # Extract roll number - more patterns
#         roll_patterns = [
#             r"(?:Roll|Reg(?:istration)?|Enrollment|Seat|ID)[\s:.\-]+([A-Z0-9\-\/]{3,20})",
#             r"(?:No\.?|Number)[\s:.\-]+([A-Z0-9\-\/]{3,20})"
#         ]
#         for pattern in roll_patterns:
#             rm = re.search(pattern, text_for_search, re.IGNORECASE)
#             if rm:
#                 roll = rm.group(1).strip()
#                 break

#         # Extract date - multiple formats
#         date_patterns = [
#             r"(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})",
#             r"(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})",
#             r"((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})"
#         ]
#         for pattern in date_patterns:
#             dm = re.search(pattern, text_for_search, re.IGNORECASE)
#             if dm:
#                 date = dm.group(1).strip()
#                 break

#         # Extract university
#         university_patterns = [
#             r"(University of [A-Za-z &]+)",
#             r"([A-Za-z &]+ University)",
#             r"(Institute of [A-Za-z &]+)",
#             r"([A-Za-z &]+ Institute)"
#         ]
#         for pattern in university_patterns:
#             um = re.search(pattern, text_for_search, re.IGNORECASE)
#             if um:
#                 uni_raw = um.group(0).strip()
#                 if FUZZY_AVAILABLE:
#                     best = process.extractOne(uni_raw, UNIVERSITIES)
#                     university = best[0] if best and best[1] > 60 else uni_raw
#                 else:
#                     university = uni_raw
#                 break

#         return {
#             "name": name,
#             "roll_number": roll, 
#             "date": date,
#             "university": university
#         }, text_for_search

#     except Exception as e:
#         logger.error(f"OCR extraction error: {e}")
#         raise


def extract_certificate_data(img_path: str):
    """Extract certificate data using OCR"""
    if not OCR_AVAILABLE:
        return {
            "name": "",
            "roll_number": "",
            "date": "",
            "university": ""
        }, "OCR not available - please install pytesseract"

    try:
        img = Image.open(img_path)

        # Configure tesseract for better results
        custom_config = (
            r'--oem 3 --psm 6 '
            r'-c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/:. '
        )
        text = pytesseract.image_to_string(img, lang="eng", config=custom_config)

        # Clean and prepare text
        text_for_search = " ".join(line.strip() for line in text.splitlines() if line.strip())
        logger.info(f"Extracted text: {text_for_search[:5000]}...")  # preview first 5000 chars

        # Initialize fields
        name, roll, date, university = "", "", "", ""

        # ------------------ Extract Name ------------------
        name_patterns = [
            r"(?:Name|Candidate|Student)\s*[:\-]?\s*([A-Z][A-Za-z.\- ]{2,60})(?=\s|$)",
            r"This is to certify that\s+([A-Z][A-Za-z.\- ]{2,60})(?=\s+(?:has|who|son|daughter|of|$))",
            r"(?:This is to\s+)?certify that\s+(?:Mr|Ms|Miss|Mrs)\.?\s+([A-Z][A-Za-z.\- ]{2,60})(?=\s+(?:has|who|son|daughter|of|$))",
            r"(?:Mr|Ms|Miss|Mrs)\.?\s+([A-Z][A-Za-z.\- ]{2,60})(?=\s|$)"
        ]

        for pattern in name_patterns:
            nm = re.search(pattern, text_for_search, re.IGNORECASE)
            if nm:
                name = nm.group(1)
                break

        if name:
            # Normalize name
            name = re.sub(r"\s{2,}", " ", name)       # multiple spaces → single
            name = re.sub(r"[^A-Za-z.\- ]", "", name) # remove stray punctuation/numbers
            name = name.strip()

        # Optional fallback (capitalized 2–3 word name)
        if not name:
            fallback = re.findall(r"\b[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?", text_for_search)
            if fallback:
                name = fallback[0].strip()

        # ------------------ Extract Roll Number ------------------
        roll_patterns = [
            r"(?:Roll|Reg(?:istration)?|Enrollment|Seat|ID)[\s:.\-]+([A-Z0-9\-\/]{3,20})",
            r"(?:No\.?|Number)[\s:.\-]+([A-Z0-9\-\/]{3,20})"
        ]
        for pattern in roll_patterns:
            rm = re.search(pattern, text_for_search, re.IGNORECASE)
            if rm:
                roll = rm.group(1).strip()
                break

        # ------------------ Extract Date ------------------
        date_patterns = [
            r"(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})",
            r"(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})",
            r"((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})"
        ]
        for pattern in date_patterns:
            dm = re.search(pattern, text_for_search, re.IGNORECASE)
            if dm:
                date = dm.group(1).strip()
                break

        # ------------------ Extract University ------------------
        # university_patterns = [
        #     r"(University of [A-Za-z &]+)",
        #     r"([A-Za-z &]+ University)",
        #     r"(Institute of [A-Za-z &]+)",
        #     r"([A-Za-z &]+ Institute)"
        # ]
        # for pattern in university_patterns:
        #     um = re.search(pattern, text_for_search, re.IGNORECASE)
        #     if um:
        #         uni_raw = um.group(0).strip()
        #         if FUZZY_AVAILABLE:
        #             best = process.extractOne(uni_raw, UNIVERSITIES)
        #             university = best[0] if best and best[1] > 60 else uni_raw
        #         else:
        #             university = uni_raw
        #         break


        # ------------------ Extract University ------------------
        university_patterns = [
            r"(University of [A-Za-z &]+)",
            r"([A-Za-z &]+ University)",
            r"(Institute of [A-Za-z &]+)",
            r"([A-Za-z &]+ Institute)"
        ]

        for pattern in university_patterns:
            um = re.search(pattern, text_for_search, re.IGNORECASE)
            if um:
                uni_raw = um.group(0).strip()

                # Cleanup university string
                uni_clean = re.sub(r"\s{2,}", " ", uni_raw)         # normalize spaces
                uni_clean = re.sub(r"[^A-Za-z &]", "", uni_clean)   # remove stray characters
                uni_clean = uni_clean.strip().title()               # proper case (e.g. Delhi University)

                # Try fuzzy match against known list
                if FUZZY_AVAILABLE and UNIVERSITIES:
                    best = process.extractOne(uni_clean, UNIVERSITIES)
                    if best and best[1] > 70:  # confidence threshold
                        university = best[0]
                    else:
                        university = uni_clean
                else:
                    university = uni_clean
                break

        # Final cleanup for all fields
        cert_data = {
            "name": normalize_value(name),
            "roll_number": normalize_value(roll),
            "date": normalize_value(date),
            "university": normalize_value(university)
        }

        return cert_data, text_for_search

    except Exception as e:
        logger.error(f"OCR extraction error: {e}")
        raise

# ---------------- Routes ----------------

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Certificate OCR & Verification API",
        "ocr_available": OCR_AVAILABLE,
        "endpoints": ["/ocr", "/hash_certificate", "/store_certificate", "/verify"]
    })

@app.route("/ocr", methods=["POST", "OPTIONS"])
def upload_certificate():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        logger.info(f"OCR request received. Files: {list(request.files.keys())}")
        
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        # Save uploaded file
        timestamp = int(time.time())
        filename = f"{timestamp}_{file.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        logger.info(f"File saved to: {file_path}")

        try:
            # Process image
            processed_path = preprocess_image(file_path)
            cert_data, raw_text = extract_certificate_data(processed_path)
        except Exception as e:
            logger.error(f"OCR processing error: {e}")
            return jsonify({
                "error": "Image processing failed", 
                "detail": str(e),
                "ocr_available": OCR_AVAILABLE
            }), 500

        # Normalize certificate data
        cert_norm = {
            "name": normalize_value(cert_data.get("name", "")),
            "roll_number": normalize_value(cert_data.get("roll_number", "")),
            "date": normalize_value(cert_data.get("date", "")),
            "university": normalize_value(cert_data.get("university", ""))
        }

        # Generate canonical string and hash
        cert_string = canonical_json_string(cert_norm)
        hash_val = double_sha256(cert_string)

        logger.info(f"OCR successful. Extracted: {cert_norm}")

        return jsonify({
            "raw_text": raw_text,
            "certificate": cert_norm,
            "canonical_string": cert_string,
            "double_sha256_hash": hash_val
        }), 200

    except Exception as e:
        logger.error(f"Unexpected error in OCR endpoint: {e}")
        return jsonify({
            "error": "Internal server error",
            "detail": str(e)
        }), 500

@app.route("/hash_certificate", methods=["POST", "OPTIONS"])
def hash_certificate():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        if not isinstance(data, dict):
            return jsonify({"error": "Invalid JSON"}), 400

        cert = {
            "name": normalize_value(data.get("name", "")),
            "roll_number": normalize_value(data.get("roll_number", "")),
            "date": normalize_value(data.get("date", "")),
            "university": normalize_value(data.get("university", ""))
        }
        
        cert_string = canonical_json_string(cert)
        hash_val = double_sha256(cert_string)

        return jsonify({
            "certificate": cert,
            "canonical_string": cert_string,
            "double_sha256_hash": hash_val
        }), 200

    except Exception as e:
        logger.error(f"Hash certificate error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/store_certificate", methods=["POST", "OPTIONS"])
def store_certificate():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        body = request.get_json()
        cert = body.get("certificate")
        hash_val = body.get("hash")
        
        if not cert or not hash_val:
            return jsonify({"error": "certificate and hash required"}), 400

        entry = {
            "certificate": cert,
            "double_sha256_hash": hash_val,
            "timestamp": int(time.time())
        }
        
        save_to_store(entry)
        return jsonify({"success": True, "message": "Certificate stored successfully"}), 200

    except Exception as e:
        logger.error(f"Store certificate error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/verify", methods=["POST", "OPTIONS"])
def verify():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        body = request.get_json()
        cert = body.get("certificate")
        provided_hash = body.get("hash")

        if not cert:
            return jsonify({"error": "certificate required"}), 400

        cert_string = canonical_json_string(cert)
        computed_hash = double_sha256(cert_string)
        in_store = check_hash_in_store(computed_hash)

        return jsonify({
            "computed_hash": computed_hash,
            "provided_hash": provided_hash,
            "hash_match": (provided_hash == computed_hash if provided_hash else None),
            "exists_in_store": in_store,
            "verified": in_store and (provided_hash == computed_hash if provided_hash else True)
        }), 200

    except Exception as e:
        logger.error(f"Verify certificate error: {e}")
        return jsonify({"error": str(e)}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    print(f"🚀 Starting Flask server...")
    print(f"📁 Upload folder: {UPLOAD_FOLDER}")
    print(f"💾 Store file: {STORE_FILE}")
    print(f"🔍 OCR available: {OCR_AVAILABLE}")
    print(f"🎯 Fuzzy matching available: {FUZZY_AVAILABLE}")
    
    app.run(debug=True, port=5000, host="127.0.0.1")
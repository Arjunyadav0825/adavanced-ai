from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_location = f"./uploaded_files/{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        return JSONResponse(content={"message": "File uploaded successfully!", "file_path": file_location})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

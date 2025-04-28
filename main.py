from fastapi import FastAPI, File, UploadFile
import shutil

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    with open(f"uploaded_{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"message": "File uploaded successfully"}

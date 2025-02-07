import {Request} from "@/services/axios.service";

function uploadFile(file_id, blobFile) {
    const formData = new FormData();
    formData.append("image", blobFile.blob(), blobFile.filename());

    return Request.post("/cdn/:file_id")
        .args({file_id})
        .body(formData)
        .send()
}

export default {uploadFile};
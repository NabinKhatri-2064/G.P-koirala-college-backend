import { Injectable } from "@nestjs/common";
import { v2, type UploadApiResponse } from "cloudinary";
import  toStream  from "buffer-to-stream"

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folderlocation: string,
  ): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: folderlocation,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          if (!result) {
            return reject("Failed to upload image in cloudinary");
          } else {
            resolve(result);
          }
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}

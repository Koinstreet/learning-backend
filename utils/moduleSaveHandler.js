const { CREATED } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;

// Error
const AppError = require("../utils/appError");
// DB
const db = require("../DB/db");
const Module = db.modules;

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ModuleSaveHandler {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  saveModule() {
    // if (this.req.body.type === "video") {
    //   this.saveVideo();
    // } else {
      this.saveText();
    // }
  }

  async saveText() {
    try {
      const module = {
        ...this.req.body,
        authorId: this.req.user.id,
        courseId: this.req.params.courseId,
      };
      const newModule = await Module.create(module);
      return this.res.status(CREATED).json({
        status: "success",
        data: {
          module: newModule,
        },
      });
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(this.res, err);
    }
  }

  async saveVideo() {
    try {
      const data = await this.uploadVideo();
      if (!data.url || !data.public_id) return AppError.tryCatchError(this.res, err);
      const module = {
        ...this.req.body,
        content: {
          link: data.url,
          publicId: data.public_id,
        },
        authorId: this.req.user.id,
        courseId: this.req.params.courseId,
      };
      const newModule = await Module.create(module);
      return this.res.status(CREATED).json({
        status: "success",
        data: {
          module: newModule,
        },
      });
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(this.res, err);
    }
  }

  uploadVideo() {
    const path = this.req.file.path;
    const fileName = this.req.file.filename;
    return cloudinary.uploader.upload(
      path,
      {
        public_id: `videos/${fileName}`,
        resource_type: "auto",
      },
      (err, result) => {
        // remove file from server
        if (err) {
          console.log(err);
          return {err, link: null, publicId: null}
        };
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        return { err: null, link: result.url, publicId: `videos/${fileName}` };
      }
    );
  }
}

module.exports = ModuleSaveHandler;

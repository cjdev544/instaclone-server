const cloudinary = require('cloudinary')

const cloudinaryUploadImg = async (file, filePath, id) => {
  // The Upload scalar return a promise
  const { createReadStream } = await file
  // initialize cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  })

  return new Promise((resolve, reject) => {
    createReadStream().pipe(
      cloudinary.v2.uploader.upload_stream(
        {
          folder: filePath || '',
          public_id: id || '',
          allowed_formats: 'png, jpg, jpeg',
        },
        (err, image) => {
          if (err)
            reject(
              new Error('Error al cargar el archivo o formato no permitido')
            )

          resolve(image)
        }
      )
    )
  })
}

module.exports = cloudinaryUploadImg

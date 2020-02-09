import axios from 'axios';

const cloudinaryUpload = async (selectedImage) => {
  const formdata = new FormData();
  formdata.append(
      'file',
      selectedImage
  );
  formdata.append(
      'upload_preset',
      process.env.CLOUDINARY_UPLOAD_PRESET || 'odv1kobq'
  );
  const cloudinaryResponse = await axios(
      {
          method: 'post',
          url: process.env.CLOUDINARY_URL || 'https://api.cloudinary.com/v1_1/dmyu8akhu/image/upload',
          headers: {
              'Content-Type':
                  'application/x-www-form-urlencoded'
          },
          data: formdata
      }
  );
     return cloudinaryResponse.data.secure_url;
}

export default cloudinaryUpload;
const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
    } catch(error) {
        console.log(error);
    }
};

module.exports = uploadToCloudinary;

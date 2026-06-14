/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.dto.UploadResult;
import com.hoodie.app.service.CloudinaryService;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * CloudinaryServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    /**
     * Cloudinary
     */
    @Autowired
    private Cloudinary cloudinary;

    /**
     * uploadFile
     */
    public UploadResult upload(MultipartFile file, String folder) throws Exception {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(Constant.FOLDER, folder));
        return new UploadResult(uploadResult.get("secure_url").toString(), uploadResult.get("public_id").toString());
    }

    /**
     * deleteImage
     * 
     * @param publicId
     * @throws Exception
     */
    @Override
    public void deleteImage(String publicId, String folder) throws Exception {
        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(Constant.FOLDER, folder));
    }
}

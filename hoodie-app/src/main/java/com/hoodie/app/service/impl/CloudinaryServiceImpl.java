/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
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
    @Override
    public String uploadFile(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", "products"));
        return uploadResult.get("secure_url").toString();
    }

}

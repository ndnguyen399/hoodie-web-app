/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import org.springframework.web.multipart.MultipartFile;

import com.hoodie.app.dto.UploadResult;

/**
 * CloudinaryService class
 */
public interface CloudinaryService {
//    public String uploadFile(MultipartFile file) throws Exception;
    public UploadResult upload(MultipartFile file, String folder) throws Exception;

    public void deleteImage(String publicId, String folder) throws Exception;
}

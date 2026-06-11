/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * CloudinaryService class
 */
public interface CloudinaryService {
    public String uploadFile(MultipartFile file) throws Exception;
}

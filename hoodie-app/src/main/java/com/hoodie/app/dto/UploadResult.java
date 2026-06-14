/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * UploadResult class
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UploadResult {
    private String url;
    private String publicId;
}

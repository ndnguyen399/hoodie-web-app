/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoodie.app.domain.model.CodeSearchDomainModel;
import com.hoodie.app.entity.Code;

/**
 * CodeRepository class
 */
public interface CodeRepository extends JpaRepository<Code, Long> {
    List<CodeSearchDomainModel> findByCodeCdAndDeleteFlag(String codeCd, String deleteFlag);

    long countByCodeCdAndDeleteFlag(String codeCd, String deleteFlag);
}

/**
 * @author duynguyen © 2025
 */
package com.hoodie.app.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoodie.app.application.model.CheckoutInitialApplicationModel;
import com.hoodie.app.constant.Constant;
import com.hoodie.app.domain.model.CartSearchDomainModel;
import com.hoodie.app.domain.model.CheckoutInitialDomainModel;
import com.hoodie.app.dto.SubmitRequestModel;
import com.hoodie.app.dto.response.SearchResponse;
import com.hoodie.app.entity.User;
import com.hoodie.app.repository.CartRepository;
import com.hoodie.app.service.CheckoutService;

import lombok.RequiredArgsConstructor;

/**
 * CheckoutServiceImpl class
 */
@Service
@RequiredArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {

    /**
     * CartRepository
     */
    @Autowired
    private CartRepository cartRepository;

    /**
     * initial
     */
    @Override
    public SearchResponse<CheckoutInitialDomainModel> initial(User currentUser,
            SubmitRequestModel<CheckoutInitialApplicationModel> request) {
        List<Integer> listId = request.getModel().getListId();
        String requestType = request.getRequestType();

        // Khởi tạo danh sách kết quả (chứa các wrapper model)
        List<CheckoutInitialDomainModel> listModel = new ArrayList<>();

        switch (requestType) {
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_INITIAL:
            // 1. Lấy dữ liệu từ giỏ hàng
            SearchResponse<CartSearchDomainModel> cartResponse = cartRepository.search(currentUser.getUserId());
            List<CartSearchDomainModel> allItems = cartResponse.getSearch();

            if (allItems != null && !allItems.isEmpty()) {
                // 2. Lọc danh sách theo listId (tối ưu với HashSet)
                Set<Integer> idSet = new HashSet<>(listId);

                List<CartSearchDomainModel> filteredItems = allItems.stream()
                        .filter(item -> idSet.contains(item.getProductId())).collect(Collectors.toList());

                // 3. Đóng gói danh sách đã lọc vào wrapper model
                CheckoutInitialDomainModel wrapperModel = new CheckoutInitialDomainModel();
                wrapperModel.setProductLists(filteredItems);

                listModel.add(wrapperModel);
            }
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_CREATE:
            break;
        case Constant.CONSTANT_SUBMIT_REQUEST_TYPE_UPDATE:
            break;
        default:
            break;
        }

        return new SearchResponse<>(listModel.size(), listModel);
    }
}

package com.example.demoapi.service;

import com.example.demoapi.dto.ItemRequest;
import com.example.demoapi.dto.ItemResponse;

import java.util.List;

public interface ItemService {

    List<ItemResponse> findAll();

    ItemResponse findById(Long id);

    ItemResponse create(ItemRequest request);

    ItemResponse update(Long id, ItemRequest request);

    void delete(Long id);
}

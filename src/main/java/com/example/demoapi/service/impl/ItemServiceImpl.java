package com.example.demoapi.service.impl;

import com.example.demoapi.dto.ItemRequest;
import com.example.demoapi.dto.ItemResponse;
import com.example.demoapi.entity.Item;
import com.example.demoapi.repository.ItemRepository;
import com.example.demoapi.service.ItemService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Override
    public List<ItemResponse> findAll() {
        return itemRepository.findAllByActiveTrue()
                .stream()
                .map(ItemResponse::from)
                .toList();
    }

    @Override
    public ItemResponse findById(Long id) {
        return itemRepository.findById(id)
                .map(ItemResponse::from)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));
    }

    @Override
    @Transactional
    public ItemResponse create(ItemRequest request) {
        Item item = new Item();
        item.setName(request.name());
        item.setDescription(request.description());
        return ItemResponse.from(itemRepository.save(item));
    }

    @Override
    @Transactional
    public ItemResponse update(Long id, ItemRequest request) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));
        item.setName(request.name());
        item.setDescription(request.description());
        return ItemResponse.from(itemRepository.save(item));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));
        item.setActive(false);
        itemRepository.save(item);
    }
}

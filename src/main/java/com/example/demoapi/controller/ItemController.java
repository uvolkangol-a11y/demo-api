package com.example.demoapi.controller;

import com.example.demoapi.dto.ItemRequest;
import com.example.demoapi.dto.ItemResponse;
import com.example.demoapi.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
@Tag(name = "Items", description = "Item CRUD operasyonları")
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    @Operation(summary = "Tüm aktif itemları listele")
    public ResponseEntity<List<ItemResponse>> findAll() {
        return ResponseEntity.ok(itemService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "ID ile item getir",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Bulundu"),
                    @ApiResponse(responseCode = "404", description = "Bulunamadı",
                            content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
            })
    public ResponseEntity<ItemResponse> findById(
            @Parameter(description = "Item ID") @PathVariable Long id) {
        return ResponseEntity.ok(itemService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Yeni item oluştur",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Oluşturuldu"),
                    @ApiResponse(responseCode = "422", description = "Validasyon hatası",
                            content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
            })
    public ResponseEntity<ItemResponse> create(@Valid @RequestBody ItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(itemService.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Item güncelle",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Güncellendi"),
                    @ApiResponse(responseCode = "404", description = "Bulunamadı",
                            content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
            })
    public ResponseEntity<ItemResponse> update(
            @Parameter(description = "Item ID") @PathVariable Long id,
            @Valid @RequestBody ItemRequest request) {
        return ResponseEntity.ok(itemService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Item sil (soft delete)",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Silindi"),
                    @ApiResponse(responseCode = "404", description = "Bulunamadı",
                            content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
            })
    public ResponseEntity<Void> delete(
            @Parameter(description = "Item ID") @PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

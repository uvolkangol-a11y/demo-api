package com.example.demoapi.dto;

import com.example.demoapi.entity.Item;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "Item yanıtı")
public record ItemResponse(
        @Schema(description = "Item ID", example = "1")
        Long id,

        @Schema(description = "Item adı", example = "Spring Boot")
        String name,

        @Schema(description = "Açıklama", example = "Java web framework")
        String description,

        @Schema(description = "Aktif mi?", example = "true")
        boolean active,

        @Schema(description = "Oluşturulma zamanı")
        LocalDateTime createdAt,

        @Schema(description = "Güncellenme zamanı")
        LocalDateTime updatedAt
) {
    public static ItemResponse from(Item item) {
        return new ItemResponse(
                item.getId(),
                item.getName(),
                item.getDescription(),
                item.isActive(),
                item.getCreatedAt(),
                item.getUpdatedAt()
        );
    }
}

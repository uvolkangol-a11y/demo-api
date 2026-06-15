package com.example.demoapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Item oluşturma / güncelleme isteği")
public record ItemRequest(
        @Schema(description = "Item adı", example = "Spring Boot")
        @NotBlank(message = "Name is required")
        @Size(max = 255, message = "Name must be at most 255 characters")
        String name,

        @Schema(description = "Açıklama", example = "Java web framework")
        String description
) {}

package com.arun.musiccatalog.service;

import com.arun.musiccatalog.dto.ai.AIResponse;
import com.arun.musiccatalog.entity.Album;
import com.arun.musiccatalog.repository.AlbumRepository;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class AIService {

    private final AlbumRepository albumRepository;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper objectMapper = new ObjectMapper();

    public AIResponse generateRecommendations(String userId)
            throws Exception {

        // Fetch user's library
        List<QueryDocumentSnapshot> documents =
                albumRepository.findAllByUserId(userId);

        List<Album> albums = documents.stream()
                .map(doc -> doc.toObject(Album.class))
                .toList();

        // Empty library
        if (albums.isEmpty()) {
            return new AIResponse(
                    "Your music library is empty.",
                    List.of()
            );
        }

        // Build prompt
        StringBuilder prompt = new StringBuilder();

        prompt.append("""
You are an expert music recommendation assistant.

Based on the user's saved albums below, recommend exactly five albums, the recommended albums should be different from the user's saved albums.

Return ONLY valid JSON.

The JSON format must be:

{
  "summary":"...",
  "recommendations":[
    {
      "album":"...",
      "artist":"...",
      "reason":"..."
    }
  ]
}

Rules:
- Return exactly 5 recommendations.
- Recommend albums that are NOT already in the user's library.
- Keep reasons under 20 words.
- Do not include markdown.
- Do not include ```json.
- Return JSON only.

User Library:

""");

        for (Album album : albums) {

            prompt.append("- ");

            prompt.append(album.getTitle());

            prompt.append(" by ");

            prompt.append(album.getArtistName());

            prompt.append(" | Genre: ");

            prompt.append(album.getGenre());

            prompt.append(" | Rating: ");

            prompt.append(
                    album.getUserRating() == null
                            ? "Not Rated"
                            : album.getUserRating()
            );

            prompt.append("\n");
        }

        // Gemini request body
        Map<String, Object> body = Map.of(
                "contents",
                List.of(
                        Map.of(
                                "parts",
                                List.of(
                                        Map.of(
                                                "text",
                                                prompt.toString()
                                        )
                                )
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        // Call Gemini
        ResponseEntity<String> response =
        restTemplate.postForEntity(
                apiUrl + "?key=" + apiKey,
                request,
                String.class
        );

JsonNode root = objectMapper.readTree(response.getBody());

String json =
        root.path("candidates")
                .get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();

AIResponse aiResponse =
        objectMapper.readValue(json, AIResponse.class);

return aiResponse;
    }
}
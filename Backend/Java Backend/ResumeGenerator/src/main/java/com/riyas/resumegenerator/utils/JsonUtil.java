package com.riyas.resumegenerator.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.SneakyThrows;

public class JsonUtil {
  private static final ObjectMapper MAPPER = new ObjectMapper();

  @SneakyThrows
  public static String toJson(Object o) {
    return MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(o);
  }

  /**
   * Extract plain text from Gemini response and return it.
   * The text should be a JSON string our app can deserialize into ResumeData.
   */
  @SneakyThrows
  public static String extractTextFromGemini(String responseBody) {
    try {
      JsonNode root = MAPPER.readTree(responseBody);

      // ✅ Handle Gemini API error before parsing
      if (root.has("error")) {
        System.err.println("Gemini API returned error: " + root.get("error").toString());
        return null; // or return empty JSON "{}"
      }

      JsonNode textNode = root
          .path("candidates")
          .path(0)
          .path("content")
          .path("parts")
          .path(0)
          .path("text");

      if (!textNode.isMissingNode()) {
        String raw = textNode.asText().trim();

        // ✅ Strip Markdown fences if present
        if (raw.startsWith("```")) {
          raw = raw.replaceAll("^```[a-zA-Z]*\\s*", "") // remove opening fence like ```json
              .replaceAll("```\\s*$", "") // remove closing fence even if space/newlines exist
              .trim();
        }

        return raw;
      }

    } catch (Exception e) {
      System.err.println("Failed to parse Gemini response: " + e.getMessage());
    }

    // Fallback: return the whole raw response
    return responseBody;
  }

}
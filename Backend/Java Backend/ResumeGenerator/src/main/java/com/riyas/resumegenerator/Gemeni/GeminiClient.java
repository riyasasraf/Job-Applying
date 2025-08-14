package com.riyas.resumegenerator.Gemeni;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.riyas.resumegenerator.Jobs.JobResponce;
import com.riyas.resumegenerator.Users.ProfileRequest;
import com.riyas.resumegenerator.utils.JsonUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class GeminiClient {

  @Value("${gemini.apiKey:}")
  private String apiKey;

  @Value("${gemini.endpoint}")
  private String endpoint;

  private final ObjectMapper mapper = new ObjectMapper();

  public ResumeData generateResume(ProfileRequest profile, JobResponce jobs) {
    if (apiKey == null || apiKey.isBlank()) {
      log.warn("GEMINI_API_KEY not set. Returning mocked ResumeData.");
      return mock(profile, jobs);
    }

    try {
      String prompt = buildPrompt(profile, jobs);
      Map<String, Object> body = new HashMap<>();
      Map<String, Object> part = Map.of("text", prompt);
      Map<String, Object> content = Map.of("parts", List.of(part));
      body.put("contents", List.of(content));

      String json = mapper.writeValueAsString(body);

      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create(endpoint + "?key=" + apiKey))
          .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
          .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
          .build();

      HttpClient client = HttpClient.newHttpClient();
      HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

      String text = JsonUtil.extractTextFromGemini(response.body());
      ResumeData data = mapper.readValue(text, ResumeData.class);
      data.setName(profile.personalInfo().getFirstName() + "" + profile.personalInfo().getLastName());
      data.setRole(jobs.jobTitle());
      data.setMail(profile.personalInfo().getEmail());
      data.setLocation(jobs.location());
      data.setLinkedIn(profile.personalInfo().getLinkedin());
      data.setEducation(profile.education());
      return data;
    } catch (Exception e) {
      log.error("Gemini call failed, using fallback: {}", e.getMessage());
      return mock(profile, jobs);
    }
  }

  private String buildPrompt(ProfileRequest profile, JobResponce jobs) {
    return """
        Act as a senior resume writer. Your task is to generate a tailored resume for the provided user profile and a specific job description.

        The goal is to create professional, concise summaries and descriptions that highlight the user's qualifications for the target job. For top Product based Companies range

        Return a STRICT JSON object with the following fields:
        - "professionalSummary": A compelling professional summary (string) written in the first person, specifically tailored to the target job.
        - "skills": An array of strings containing only the user's existing skills. Filter or reorder them to be most relevant to the target job description. DO NOT add new skills.
        - "experienceAi": An array of WorkExperience objects. For each work experience from the user profile, rewrite the "achievements" and "description" fields into a concise, impact-oriented summary (string) that aligns with the target job.
        - "projectAi": An array of Projects objects. For each project from the user profile, rewrite the "achievements" field into a concise, impact-oriented summary (string) that aligns with the target job. Return ONLY a valid JSON object, with no code block markers, no extra text, and no explanations.

        User Profile JSON:
        """
        + JsonUtil.toJson(profile) + "\n\nTarget Jobs JSON:\n" + JsonUtil.toJson(jobs);
  }

  private ResumeData mock(ProfileRequest profile, JobResponce jobs) {
    ResumeData r = new ResumeData();

    r.setName(profile.personalInfo().getFirstName() + "" + profile.personalInfo().getLastName());
    r.setRole(jobs.jobTitle());
    r.setMail(profile.personalInfo().getEmail());
    r.setLocation(jobs.location());
    r.setLinkedIn(profile.personalInfo().getLinkedin());
    r.setSkills(profile.skills());
    r.setExperienceAi(profile.workExperience());
    r.setProjectAi(profile.projects());
    r.setEducation(profile.education());

    return r;
  }

}
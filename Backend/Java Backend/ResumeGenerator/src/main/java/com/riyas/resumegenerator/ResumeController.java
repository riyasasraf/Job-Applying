package com.riyas.resumegenerator;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/resume")
public class ResumeController {

  private final ResumeService service;

  public ResponseEntity<String> generate(@RequestBody List<JobDetails> jobDetails) {
    return ResponseEntity.ok(service.generate());
  }

  
}

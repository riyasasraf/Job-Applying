package com.riyas.resumegenerator.resume;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.riyas.resumegenerator.Users.ProfileRequest;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/resume")
public class ResumeController {

  private final ResumeService service;

  @PostMapping  
  public ResponseEntity< String> generate(@RequestBody ProfileRequest userProfile) {
    return ResponseEntity.ok(service.generate(userProfile));
  }

  
  
}

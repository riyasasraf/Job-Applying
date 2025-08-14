package com.riyas.jobs;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/jobs")
public class JobsController {

  private final JobService service;

  @GetMapping
  public ResponseEntity<List<JobResponse>> getJobs() {
    return ResponseEntity.ok(service.getJobs());
  } 

}

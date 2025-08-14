package com.riyas.resumegenerator.Jobs;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "job-service", url = "http://localhost:8082")
public interface JobClient {
  @GetMapping("/api/v1/jobs")
 List<JobResponce> getJobs();
}
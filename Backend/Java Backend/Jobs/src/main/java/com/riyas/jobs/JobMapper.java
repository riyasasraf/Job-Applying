package com.riyas.jobs;

import org.springframework.stereotype.Service;

@Service
public class JobMapper {

  public JobResponse toJobResponse(Job job) {
    return new JobResponse(job.getId(),job.getJobTitle(),job.getCompanyName(),job.getJobLink(),job.getDescription(),job.getJobId(),job.getJobLogo(),job.getLocation(),job.getRolePostedOn());
  }


}
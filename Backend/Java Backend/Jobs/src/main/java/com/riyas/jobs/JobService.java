package com.riyas.jobs;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobService {

  private final JobRepository repository;
  private final JobMapper mapper;

  public List<JobResponse> getJobs() {
    
     return repository.findAll().stream().map(mapper::toJobResponse).collect(Collectors.toList());
  }

}

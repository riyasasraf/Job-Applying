package com.riyas.jobs;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "job")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Job {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;  // Changed from 'Id' to 'id' to match database
  
  @Column(name = "job_title")
  private String jobTitle;
  
  @Column(name = "company_name")
  private String companyName;
  
  @Column(name = "url", columnDefinition = "TEXT")
  private String jobLink;
  
  @Column(columnDefinition = "TEXT")
  private String description;
  
  @Column(name = "job_id")
  private String jobId;
  
  @Column(name = "job_logo", columnDefinition = "TEXT")
  private String jobLogo;
  
  private String location;
  
  @CreatedDate
  @Column(name = "role_posted_on")
  private LocalDateTime rolePostedOn;  // Changed from createDate to match database column and type
}

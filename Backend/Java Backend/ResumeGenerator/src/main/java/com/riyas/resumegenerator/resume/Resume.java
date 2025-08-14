package com.riyas.resumegenerator.resume;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "resume")
public class Resume {
  @Id
  @GeneratedValue
  private Integer id;
  private String jobId;
  private String resumeLink;
  @CreatedDate
  private LocalDateTime createdAt;
}

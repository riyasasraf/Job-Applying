package com.riyas.resumegenerator.Users;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationDto {
  private long id;
  private String degree;
  private String major;
  private String institution;
  private String graduationDate;
  private String gpa;
  private String branch;
}
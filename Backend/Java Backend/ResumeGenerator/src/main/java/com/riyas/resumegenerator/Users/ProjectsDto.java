package com.riyas.resumegenerator.Users;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectsDto {
  private long id;
  private String projectTitle;
  private String companyName;
  private String startDate;
  private String endDate;
  private String achievements;
}
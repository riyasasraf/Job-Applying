package com.riyas.resumegenerator.Users;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperienceDto {
  private long id;
  private String title;
  private String company;
  private String startDate;
  private String endDate;
  private String description;
  private String jobTitle;
  private String companyName;
  private String achievements;
}

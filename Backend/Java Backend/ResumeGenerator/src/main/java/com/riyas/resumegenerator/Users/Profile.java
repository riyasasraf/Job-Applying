package com.riyas.resumegenerator.Users;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
  private String about;
  private PersonalInfoDto personalInfo;
  private List<WorkExperienceDto> workExperience;
  private List<EducationDto> education;
  private List<ProjectsDto> projects;
  private List<String> skills;
  private NotificationsDto notifications;
}
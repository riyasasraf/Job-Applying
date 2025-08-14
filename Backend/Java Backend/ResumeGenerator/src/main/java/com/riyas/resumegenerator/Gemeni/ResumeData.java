  package com.riyas.resumegenerator.Gemeni;

  import java.util.List;

  import com.riyas.resumegenerator.Users.EducationDto;
  import com.riyas.resumegenerator.Users.ProjectsDto;
  import com.riyas.resumegenerator.Users.WorkExperienceDto;

  import lombok.AllArgsConstructor;
  import lombok.Builder;
  import lombok.Getter;
  import lombok.NoArgsConstructor;
  import lombok.Setter;

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public class ResumeData {

    private String role;
    private String name;
    private String mail;
    private String linkedIn;
    private String location;
    private String professionalSummary;
    private List<String> skills;
    private List<WorkExperienceDto> experienceAi;
    private List<ProjectsDto> projectAi;
    private List<EducationDto> education;
    private List<String> certifications;

  }

package com.riyas.resumegenerator.Users;

import java.util.List;

public record ProfileRequest(
    String about,
    PersonalInfoDto personalInfo,
    List<WorkExperienceDto> workExperience,
    List<EducationDto> education,
    List<ProjectsDto> projects,
    List<String> skills,
    NotificationsDto notifications

) {

}

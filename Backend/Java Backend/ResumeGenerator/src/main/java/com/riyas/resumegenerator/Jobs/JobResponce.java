package com.riyas.resumegenerator.Jobs;

import java.time.LocalDateTime;

public record JobResponce(
    Integer Id,
    String jobTitle,
    String companyName,
    String jobLink,
    String description,
    String jobId,
    String jobLogo,
    String location,
    LocalDateTime  rolePostedOn

) {
  
}

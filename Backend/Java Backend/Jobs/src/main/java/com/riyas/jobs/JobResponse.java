package com.riyas.jobs;

import java.time.LocalDateTime;

public record JobResponse(

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

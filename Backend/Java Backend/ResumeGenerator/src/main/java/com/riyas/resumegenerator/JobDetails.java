package com.riyas.resumegenerator;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record JobDetails(

    String company_name,
    @NotNull(message = "Id Should not to Be Null") @NotEmpty(message = "Id Should not to Be Null") String job_id,
    String description, String job_title,
    String location,
    String url

) {

}

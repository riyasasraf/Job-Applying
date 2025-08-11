package com.riyas.jobseeker.users;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkExperience {

  private String jobTitle;
  private String companyName;
  private LocalDate startDate;
  private LocalDate endDate;
  private String Achivements;

}

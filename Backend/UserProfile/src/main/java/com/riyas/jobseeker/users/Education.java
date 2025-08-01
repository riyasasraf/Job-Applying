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
public class Education {

  private String degree;
  private String branch;
  private String institution;
  private LocalDate graduation;
  private Double gpa;


}

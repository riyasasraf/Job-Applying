package com.riyas.jobseeker.users;

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
public class Address {

  private String country;
  private String streetAddress;
  private String city;
  private String state;
  private Integer zipCode;


}

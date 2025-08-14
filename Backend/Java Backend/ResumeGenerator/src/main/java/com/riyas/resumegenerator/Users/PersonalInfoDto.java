package com.riyas.resumegenerator.Users;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfoDto {
  private String firstName;
  private String lastName;
  private String email;
  private String phone;
  private String linkedin;
  private String portfolio;
  private String country;
  private String streetAddress;
  private String city;
  private String region;
  private String postalCode;
}
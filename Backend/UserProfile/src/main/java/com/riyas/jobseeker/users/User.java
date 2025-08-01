package com.riyas.jobseeker.users;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
@Document
public class User {
  
  @Id
  private Integer id;
  private String name;
  private List<SocialProfiles> socialProfiles;
  private String about;
  private Address address;
  private List<WorkExperience> WorkExperience;
  private List<Education> education;
  private List<String> skills;
  private String profileImage;
  private Notifications notifications;
}

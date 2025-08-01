package com.riyas.jobseeker.users;

import java.util.List;

public record UserRequest(


   Integer id,
   String name,
   List<SocialProfiles> socialProfiles,
   String about,
   Address address,
   List<WorkExperience> WorkExperience,
   List<Education> education,
   List<String> skills,
   String profileImage,
   Notifications notifications

) {

}

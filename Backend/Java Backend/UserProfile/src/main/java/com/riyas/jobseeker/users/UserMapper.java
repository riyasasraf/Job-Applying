package com.riyas.jobseeker.users;

import org.springframework.stereotype.Service;

@Service
public class UserMapper {

  public User toUser(UserRequest request) {
    return new User(request.id(), request.name(), request.socialProfiles(), request.about(), request.address(),
        request.WorkExperience(), request.education(), request.skills(), request.profileImage(),
        request.notifications());
  }

}

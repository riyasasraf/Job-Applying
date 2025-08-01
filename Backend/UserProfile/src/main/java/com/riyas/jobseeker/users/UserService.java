package com.riyas.jobseeker.users;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository repository;
  private final UserMapper mapper;

  public Integer createUser(UserRequest request) {
    var user = repository.save(mapper.toUser(request));
    return user.getId();
  }

  public void saveBasicInfo(BasicInfoRequest request) {
    
  }

}

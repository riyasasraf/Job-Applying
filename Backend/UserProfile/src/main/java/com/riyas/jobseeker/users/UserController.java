package com.riyas.jobseeker.users;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService service;

  @PostMapping
  public ResponseEntity<Integer> createUser(@RequestBody @Validated UserRequest request) {
    return ResponseEntity.ok(service.createUser(request));
  }

  @PostMapping("/{id}/basic")
  public ResponseEntity<Void> saveBasicInfo(@PathVariable Integer id , @RequestBody BasicInfoRequest request) {
    return ResponseEntity.ok().build();
  }
  

  
}

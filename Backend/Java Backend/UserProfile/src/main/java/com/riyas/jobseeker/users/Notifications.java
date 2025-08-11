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
public class Notifications {

  private Boolean comments;
  private Boolean candidates;
  private Boolean offers;
  private PushNotification pushNotification;


}

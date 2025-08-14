package com.riyas.resumegenerator.Users;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationsDto {
  private boolean comments;
  private boolean candidates;
  private boolean offers;
  private String pushNotification;
}
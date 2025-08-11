package com.riyas.jobseeker.users;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,Integer> {

}

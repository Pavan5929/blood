package com.blood.blooddonation.bloodrepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blood.blooddonation.bloodentity.Entityblood;

@Repository
public interface BloodRepo extends JpaRepository<Entityblood, Long> {
    Entityblood findByEmail(String email);
}
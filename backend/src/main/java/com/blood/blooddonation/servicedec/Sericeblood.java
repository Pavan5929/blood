package com.blood.blooddonation.servicedec;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blood.blooddonation.bloodentity.Entityblood;
import com.blood.blooddonation.bloodrepo.BloodRepo;

@Service
public class Sericeblood implements Servicedec {
    @Autowired
    private BloodRepo brepo;

    @Override
    public Entityblood createAccount(Entityblood b) {
        return brepo.save(b);
    }

    @Override
    public List<Entityblood> readData() {
        return brepo.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        brepo.deleteById(id);
    }

    @Override
    public Entityblood updateUser(Long id, Entityblood b) {
        Entityblood existingUser = brepo.findById(id).orElse(null);
        if (existingUser != null) {
            updateUserDetails(existingUser, b);
            return brepo.save(existingUser);
        }
        return null;
    }

    @Override
    @Transactional
    public Entityblood updateUserByEmail(String email, Entityblood b) {
        // Find user by email
        Entityblood existingUser = brepo.findByEmail(email);
        
        // If user not found, throw an exception
        if (existingUser == null) {
            throw new RuntimeException("User not found with email: " + email);
        }

        // Update user details
        updateUserDetails(existingUser, b);
        
        // Save and return updated user
        return brepo.save(existingUser);
    }

    @Override
    public Entityblood getUserById(Long id) {
        return brepo.findById(id).orElse(null);
    }

    // Helper method to update user details
    private void updateUserDetails(Entityblood existingUser, Entityblood newUserData) {
        existingUser.setFullname(newUserData.getFullname());
        existingUser.setAge(newUserData.getAge());
        existingUser.setBloodGroup(newUserData.getBloodGroup());
        existingUser.setLocation(newUserData.getLocation());
        existingUser.setPhoneNumber(newUserData.getPhoneNumber());
    }
}
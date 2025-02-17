package com.blood.blooddonation.servicedec;

import com.blood.blooddonation.bloodentity.Entityblood;
import java.util.List;

public interface Servicedec {
    Entityblood createAccount(Entityblood b);
    List<Entityblood> readData();
    void deleteUser(Long id);
    Entityblood updateUser(Long id, Entityblood b);
    Entityblood getUserById(Long id);
    
    // Add this method for email-based update
    Entityblood updateUserByEmail(String email, Entityblood b);
}
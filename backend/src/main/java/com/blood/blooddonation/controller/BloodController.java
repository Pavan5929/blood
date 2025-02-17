package com.blood.blooddonation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blood.blooddonation.bloodentity.Entityblood;
import com.blood.blooddonation.servicedec.Servicedec;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class BloodController {
    @Autowired
    private Servicedec bs;

    @PostMapping("/create")
    public Entityblood createNewAccount(@RequestBody Entityblood b) {
        return bs.createAccount(b);
    }

    @GetMapping("/Get")
    public List<Entityblood> getDetails() {
        return bs.readData();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            bs.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Entityblood userData) {
        try {
            Entityblood updatedUser = bs.updateUser(id, userData);
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating user: " + e.getMessage());
        }
    }

    @PutMapping("/update/email/{email}")
    public ResponseEntity<?> updateUserByEmail(@PathVariable String email, @RequestBody Entityblood userData) {
        try {
            // Validate input
            if (userData == null) {
                return ResponseEntity.badRequest().body("Invalid user data");
            }

            Entityblood updatedUser = bs.updateUserByEmail(email, userData);
            
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            }
            
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Unexpected error: " + e.getMessage());
        }
    }
}
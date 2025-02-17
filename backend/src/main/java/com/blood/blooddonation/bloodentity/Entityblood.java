package com.blood.blooddonation.bloodentity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="details")
public class Entityblood {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column
    private long id;
    
    @Column
    private String email;
    
    @Column
    private String password;
    
    @Column
    private String fullname;
    
    @Column
    private int age;
    
    @Column
    private String bloodGroup;
    
    @Column
    private String location;
    
    @Column
    private String phoneNumber;

    @Override
    public String toString() {
        return "Entityblood [id=" + id + ", email=" + email + ", password=" + password + 
               ", fullname=" + fullname + ", age=" + age + ", bloodGroup=" + bloodGroup + 
               ", location=" + location + ", phoneNumber=" + phoneNumber + "]";
    }

    public Entityblood() {
        super();
    }

    public Entityblood(long id, String email, String password, String fullname, 
                      int age, String bloodGroup, String location, String phoneNumber) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.age = age;
        this.bloodGroup = bloodGroup;
        this.location = location;
        this.phoneNumber = phoneNumber;
    }

    // Original getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // New getters and setters
    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
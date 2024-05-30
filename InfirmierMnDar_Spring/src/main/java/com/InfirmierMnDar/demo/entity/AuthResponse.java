package com.InfirmierMnDar.demo.entity;

public class AuthResponse {
    private String userType;
    private int infirmierId;

    // Constructeur vide
    public AuthResponse() {
    }

    // Constructeur avec userType
    public AuthResponse(String userType) {
        this.userType = userType;
    }

    // Constructeur avec userType et infirmierId
    public AuthResponse(String userType, int infirmierId) {
        this.userType = userType;
        this.infirmierId = infirmierId;
    }

    // Getters et setters
    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public int getInfirmierId() {
        return infirmierId;
    }

    public void setInfirmierId(int infirmierId) {
        this.infirmierId = infirmierId;
    }
}



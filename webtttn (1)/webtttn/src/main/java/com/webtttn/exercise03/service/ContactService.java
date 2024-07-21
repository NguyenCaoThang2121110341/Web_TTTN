package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.Contact;

public interface ContactService {
    Contact addContact(Contact contact);
    
    Contact getContactById(UUID contactId);
    
    List<Contact> getAllContact();
    
    Contact updateContact(UUID contactId, Contact updatedContact);
    
    void deleteContact(UUID contactId);
}

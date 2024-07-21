package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.Contact;
import com.webtttn.exercise03.repository.ContactRepository;
import com.webtttn.exercise03.service.ContactService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository ContactRepository;

    @Override
    public Contact addContact(Contact contact) {
        // Đảm bảo rằng id của đối tượng Contact là null trước khi lưu vào cơ sở dữ liệu
        contact.setId(null);
        return ContactRepository.save(contact);
    }

    @Override
    public Contact getContactById(UUID contactId) {
        Optional<Contact> optionalContact = ContactRepository.findById(contactId);
        return optionalContact.orElse(null);
    }

    @Override
    public List<Contact> getAllContact() {
        return ContactRepository.findAll();
    }

    @Override
    public Contact updateContact(UUID contactId, Contact updatedContact) {
        Contact existingContact = ContactRepository.findById(contactId).orElse(null);

        if (existingContact != null) {
            existingContact.setName(updatedContact.getName());
            existingContact.setEmail(updatedContact.getEmail());
            existingContact.setMessage(updatedContact.getMessage());
            existingContact.setSubject(updatedContact.getSubject());
            // Cập nhật các trường khác nếu cần

            return ContactRepository.save(existingContact);
        }

        return null;
    }

    @Override
    public void deleteContact(UUID ContactId) {
        ContactRepository.deleteById(ContactId);
    }
}

package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.Topic;
import com.webtttn.exercise03.repository.TopicRepository;
import com.webtttn.exercise03.service.TopicService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TopicServiceImpl implements TopicService {

    @Autowired
    private TopicRepository TopicRepository;

    @Override
    public Topic addTopic(Topic Topic) {
        return TopicRepository.save(Topic);
    }

    @Override
    public Topic getTopicById(UUID TopicId) {
        Optional<Topic> optionalTopic = TopicRepository.findById(TopicId);
        return optionalTopic.orElse(null);
    }

    @Override
    public List<Topic> getAllTopics() {
        return TopicRepository.findAll();
    }

    @Override
    public Topic updateTopic(UUID TopicId, Topic updatedTopic) {
        Topic existingTopic = TopicRepository.findById(TopicId).orElse(null);

        if (existingTopic != null) {
            existingTopic.setName(updatedTopic.getName());
            existingTopic.setDescription(updatedTopic.getDescription());
         
            existingTopic.setImageUrl(updatedTopic.getImageUrl());
            // You may need to handle other relationships here
            return TopicRepository.save(existingTopic);
        }

        return null;
    }

    @Override
    public void deleteTopic(UUID TopicId) {
        TopicRepository.deleteById(TopicId);
    }
}

package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.Topic;

public interface TopicService {
    Topic addTopic(Topic Topic);

    Topic getTopicById(UUID TopicId);

    List<Topic> getAllTopics();

    Topic updateTopic(UUID TopicId, Topic updatedTopic);

    void deleteTopic(UUID TopicId);
}

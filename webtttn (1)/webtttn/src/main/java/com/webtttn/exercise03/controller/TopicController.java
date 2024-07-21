package com.webtttn.exercise03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.webtttn.exercise03.entity.Topic;
import com.webtttn.exercise03.service.TopicService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/Topics")
public class TopicController {

    @Autowired
    private TopicService TopicService;

    @GetMapping
    public ResponseEntity<List<Topic>> getAllTopics() {
        List<Topic> Topics = TopicService.getAllTopics();
        return ResponseEntity.ok(Topics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable("id") UUID TopicId) {
        Topic Topic = TopicService.getTopicById(TopicId);
        if (Topic != null) {
            return ResponseEntity.ok(Topic);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Topic> addTopic(@RequestBody Topic Topic) {
        Topic addedTopic = TopicService.addTopic(Topic);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedTopic);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable("id") UUID TopicId,
            @RequestBody Topic updatedTopic) {
        Topic Topic = TopicService.updateTopic(TopicId, updatedTopic);
        if (Topic != null) {
            return ResponseEntity.ok(Topic);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable("id") UUID TopicId) {
        TopicService.deleteTopic(TopicId);
        return ResponseEntity.noContent().build();
    }
}

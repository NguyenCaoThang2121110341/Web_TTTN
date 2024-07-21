package com.webtttn.exercise03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.webtttn.exercise03.entity.Ads;
import com.webtttn.exercise03.service.AdsService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/Adss")
public class AdsController {

    @Autowired
    private AdsService AdsService;

    @GetMapping
    public ResponseEntity<List<Ads>> getAllAdss() {
        List<Ads> Adss = AdsService.getAllAdss();
        return ResponseEntity.ok(Adss);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ads> getAdsById(@PathVariable("id") UUID AdsId) {
        Ads Ads = AdsService.getAdsById(AdsId);
        if (Ads != null) {
            return ResponseEntity.ok(Ads);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Ads> addAds(@RequestBody Ads Ads) {
        Ads addedAds = AdsService.addAds(Ads);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedAds);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ads> updateAds(@PathVariable("id") UUID AdsId,
            @RequestBody Ads updatedAds) {
        Ads Ads = AdsService.updateAds(AdsId, updatedAds);
        if (Ads != null) {
            return ResponseEntity.ok(Ads);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAds(@PathVariable("id") UUID AdsId) {
        AdsService.deleteAds(AdsId);
        return ResponseEntity.noContent().build();
    }
}

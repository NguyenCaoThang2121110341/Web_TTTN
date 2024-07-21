package com.webtttn.exercise03.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtttn.exercise03.entity.Ads;
import com.webtttn.exercise03.repository.AdsRepository;
import com.webtttn.exercise03.service.AdsService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdsServiceImpl implements AdsService {

    @Autowired
    private AdsRepository AdsRepository;

    @Override
    public Ads addAds(Ads Ads) {
        return AdsRepository.save(Ads);
    }

    @Override
    public Ads getAdsById(UUID AdsId) {
        Optional<Ads> optionalAds = AdsRepository.findById(AdsId);
        return optionalAds.orElse(null);
    }

    @Override
    public List<Ads> getAllAdss() {
        return AdsRepository.findAll();
    }

    @Override
    public Ads updateAds(UUID AdsId, Ads updatedAds) {
        Ads existingAds = AdsRepository.findById(AdsId).orElse(null);

        if (existingAds != null) {
            existingAds.setName(updatedAds.getName());
            existingAds.setDescription(updatedAds.getDescription());
         
            existingAds.setImageUrl(updatedAds.getImageUrl());
            // You may need to handle other relationships here
            return AdsRepository.save(existingAds);
        }

        return null;
    }

    @Override
    public void deleteAds(UUID AdsId) {
        AdsRepository.deleteById(AdsId);
    }
}

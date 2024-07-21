package com.webtttn.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.webtttn.exercise03.entity.Ads;

public interface AdsService {
    Ads addAds(Ads Ads);

    Ads getAdsById(UUID AdsId);

    List<Ads> getAllAdss();

    Ads updateAds(UUID AdsId, Ads updatedAds);

    void deleteAds(UUID AdsId);
}

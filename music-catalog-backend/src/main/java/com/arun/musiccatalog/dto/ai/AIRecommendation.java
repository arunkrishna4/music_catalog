package com.arun.musiccatalog.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AIRecommendation {

    private String album;

    private String artist;

    private String reason;
}
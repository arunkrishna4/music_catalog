package com.arun.musiccatalog.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AIResponse {

    private String summary;

    private List<AIRecommendation> recommendations;
}
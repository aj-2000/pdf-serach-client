import React from "react";

export function SentimentScoreToText({
  sentimentScore,
}: {
  sentimentScore: number;
}) {
  let className = "text-blue-500"; // Default to neutral

  if (sentimentScore > 0.2) {
    className = "text-green-500"; // Positive
  } else if (sentimentScore < -0.2) {
    className = "text-red-500"; // Negative
  }

  return (
    <div className={className}>{sentimentScoreToText(sentimentScore)}</div>
  );
}

function sentimentScoreToText(sentimentScore: number): string {
  if (sentimentScore > 0.2) {
    return "Positive";
  } else if (sentimentScore < -0.2) {
    return "Negative";
  } else {
    return "Neutral";
  }
}

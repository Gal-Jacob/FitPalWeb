// src/utils/workoutParser.ts
import { WorkoutPlan, WorkoutDay, Exercise } from "./types";

/**
 * Parses raw text from AI into a structured WorkoutPlan object
 * @param text Raw workout plan text from AI
 * @param expectedDays Number of days expected in the plan
 * @returns Structured WorkoutPlan object
 */
export function parseWorkoutPlanFromText(
  text: string,
  expectedDays: number
): WorkoutPlan {
  // Extract summary (text before first "Day" mention)
  const dayIndex = text.search(/Day\s+\d+:/i);
  const summary =
    dayIndex > 0 ? text.substring(0, dayIndex).trim() : "Custom workout plan";

  // Extract days sections
  const dayRegex = /Day\s+(\d+):\s*([^]*?)(?=Day\s+\d+:|$)/gi;
  const days: WorkoutDay[] = [];

  let match;
  while ((match = dayRegex.exec(text)) !== null) {
    const dayNumber = match[1];
    const content = match[2].trim();

    // Extract focus area (text before first bullet/dash)
    const focusMatch = content.split(/\n-|\n•/)[0];
    const focus = focusMatch ? focusMatch.trim() : "General workout";

    // Extract exercises
    const exercises: Exercise[] = [];
    const exerciseRegex = /[-•]\s*([^:]+):\s*([^\n]+)/g;
    let exerciseMatch;

    while ((exerciseMatch = exerciseRegex.exec(content)) !== null) {
      const name = exerciseMatch[1].trim();
      const details = exerciseMatch[2].trim();

      // Try to parse sets, reps, and rest period
      const setsRepsRegex =
        /(\d+)\s*(?:sets?|x)\s*(?:of\s*)?(\d+)(?:\s*-\s*(\d+))?\s*(?:reps?|repetitions)/i;
      const restRegex =
        /rest(?:\s*period|\s*time|\s*interval)?:?\s*(\d+(?:\s*-\s*\d+)?(?:\s*seconds?|s|minutes?|mins?|m))/i;

      const exercise: Exercise = { name };

      // Extract sets and reps if available
      const setsRepsMatch = details.match(setsRepsRegex);
      if (setsRepsMatch) {
        exercise.sets = parseInt(setsRepsMatch[1]);
        exercise.reps = parseInt(setsRepsMatch[2]);
      }

      // Extract rest period if available
      const restMatch = details.match(restRegex);
      if (restMatch) {
        exercise.restPeriod = restMatch[1];
      }

      // Store full details as notes if we couldn't parse structured data
      if (!setsRepsMatch && !restMatch) {
        exercise.notes = details;
      }

      exercises.push(exercise);
    }

    // If no exercises were found with the specific format, try a more general approach
    if (exercises.length === 0) {
      const lines = content
        .split("\n")
        .filter(
          (line) => line.trim().startsWith("-") || line.trim().startsWith("•")
        );

      lines.forEach((line) => {
        const exerciseText = line.replace(/^[-•]\s*/, "").trim();
        const parts = exerciseText.split(":");

        if (parts.length >= 2) {
          exercises.push({
            name: parts[0].trim(),
            notes: parts.slice(1).join(":").trim(),
          });
        } else {
          exercises.push({
            name: exerciseText,
          });
        }
      });
    }

    days.push({
      day: `Day ${dayNumber}`,
      focus,
      exercises,
    });
  }

  // Extract additional notes & nutrition tips (text after last day section)
  let notes: string[] = [];
  let nutritionTips: string[] = [];

  // Look for content after the last day section
  const additionalContent = text.substring(text.lastIndexOf("Day") + 1);
  const notesMatch = additionalContent.match(
    /Notes?:|Additional\s+Notes?:|Additional\s+Information:|Tips?:/i
  );

  if (notesMatch && notesMatch.index !== undefined) {
    const notesSection = additionalContent.substring(notesMatch.index);
    const nutritionMatch = notesSection.match(/Nutrition|Diet|Eating|Food/i);

    if (nutritionMatch && nutritionMatch.index !== undefined) {
      const nutritionSection = notesSection.substring(nutritionMatch.index);
      nutritionTips = nutritionSection
        .split("\n")
        .filter(
          (line) =>
            line.trim().length > 0 &&
            !line.match(/^Nutrition|Diet|Eating|Food/i)
        )
        .map((line) => line.trim());

      notes = notesSection
        .substring(0, nutritionMatch.index)
        .split("\n")
        .filter(
          (line) =>
            line.trim().length > 0 &&
            !line.match(
              /^Notes?:|Additional\s+Notes?:|Additional\s+Information:|Tips?:/i
            )
        )
        .map((line) => line.trim());
    } else {
      notes = notesSection
        .split("\n")
        .filter(
          (line) =>
            line.trim().length > 0 &&
            !line.match(
              /^Notes?:|Additional\s+Notes?:|Additional\s+Information:|Tips?:/i
            )
        )
        .map((line) => line.trim());
    }
  }

  // Validate day count
  if (days.length < expectedDays) {
    console.warn(
      `Expected ${expectedDays} workout days but only found ${days.length}`
    );
  }

  return {
    summary: summary,
    days,
    notes: notes.length > 0 ? notes : undefined,
    nutritionTips: nutritionTips.length > 0 ? nutritionTips : undefined,
  };
}

const express = require('express');
const router = express.Router();
const chrono = require('chrono-node');

// Priority mappings
const priorityMap = {
  urgent: 'high',
  critical: 'high',
  high: 'high',
  medium: 'medium',
  normal: 'medium',
  low: 'low'
};

// Status mappings
const statusMap = {
  'not started': 'not-started',
  'in progress': 'in-progress',
  'completed': 'completed',
  'done': 'completed'
};

router.post('/task', (req, res) => {
  const { text, users = [], projects = [] } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  let result = {
    confidence: 0.9, // heuristic confidence
    ambiguousFields: []
  };

  const lowerText = text.toLowerCase();

  // 1. Extract Dates using chrono
  const chronoResults = chrono.parse(text);
  if (chronoResults.length > 0) {
    const parsedDate = chronoResults[0].start.date();
    // Normalize to YYYY-MM-DD format
    const localDate = new Date(parsedDate.getTime() - (parsedDate.getTimezoneOffset() * 60000));
    result.dueDate = localDate.toISOString().split('T')[0];
    
    // Check if time was mentioned
    if (chronoResults[0].start.isCertain('hour')) {
      const hours = String(parsedDate.getHours()).padStart(2, '0');
      const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
      result.dueTime = `${hours}:${minutes}`;
    }
  }

  // 2. Priority extraction
  let detectedPriority = null;
  for (const [key, value] of Object.entries(priorityMap)) {
    if (new RegExp(`\\b${key}\\b`, 'i').test(lowerText) && lowerText.includes('priority')) {
      detectedPriority = value;
      break;
    }
  }
  if (!detectedPriority) { 
     if (/\b(urgent|critical)\b/i.test(lowerText)) detectedPriority = 'high';
  }
  if (detectedPriority) result.priority = detectedPriority;

  // 3. Status extraction
  let detectedStatus = null;
  for (const [key, value] of Object.entries(statusMap)) {
    // Only match status if the text explicitly hints at setting status, or use strict match
    if (new RegExp(`\\b(status is|mark as)\\s+${key}\\b`, 'i').test(lowerText)) {
      detectedStatus = value;
      break;
    }
  }
  if (detectedStatus) result.status = detectedStatus;

  // 4. Assignee (User) extraction
  if (users.length > 0) {
    let bestUserMatch = null;
    let highestUserScore = -1;
    let matchCount = 0;
    
    for (const user of users) {
      const nameLower = user.name.toLowerCase();
      const nameParts = nameLower.split(' ');
      let score = 0;
      
      if (lowerText.includes(nameLower)) {
         score = 100;
      } else if (nameParts.length > 0 && lowerText.includes(nameParts[0]) && nameParts[0].length > 2) {
         score = 50; 
      }
      
      if (score > 0) {
        if (score > highestUserScore) {
           highestUserScore = score;
           bestUserMatch = user;
           matchCount = 1;
        } else if (score === highestUserScore) {
           matchCount++;
        }
      }
    }

    if (matchCount > 1) {
       result.ambiguousFields.push('assignee');
    } else if (bestUserMatch && highestUserScore > 0) {
       result.assignee = {
         id: bestUserMatch.id,
         name: bestUserMatch.name
       };
    }
  }

  // 5. Project extraction
  if (projects.length > 0) {
    let bestProjectMatch = null;
    let highestProjectScore = -1;
    let matchCount = 0;
    
    for (const project of projects) {
      const pName = project.name.toLowerCase();
      let score = 0;
      if (lowerText.includes(pName)) {
         score = 100;
      } else {
         const textWords = lowerText.split(/\W+/);
         const pWords = pName.split(/\W+/);
         const common = pWords.filter(w => w.length > 3 && textWords.includes(w));
         if (common.length > 0) {
            score = 50 * common.length;
         }
      }

      if (score > 0) {
         if (score > highestProjectScore) {
            highestProjectScore = score;
            bestProjectMatch = project;
            matchCount = 1;
         } else if (score === highestProjectScore) {
            matchCount++;
         }
      }
    }
    
    if (matchCount > 1) {
      result.ambiguousFields.push('project');
    } else if (bestProjectMatch) {
       result.project = {
         id: bestProjectMatch.id,
         name: bestProjectMatch.name
       };
    }
  }

  // 6. Title and Description
  result.description = text;
  
  // Extract a clean title
  let titleMatch = text.split(/\b(will|is|by|due|assigned|priority|before|after|tomorrow|today)\b/i)[0].trim();
  titleMatch = titleMatch.replace(/\b(task|the|a|an)\b$/i, '').trim();
  
  if (titleMatch.length > 3) {
    result.title = titleMatch.charAt(0).toUpperCase() + titleMatch.slice(1);
  } else {
    // fallback to first 5 words
    const words = text.split(' ');
    result.title = words.slice(0, Math.min(5, words.length)).join(' ') + (words.length > 5 ? '...' : '');
  }

  res.json(result);
});

module.exports = router;

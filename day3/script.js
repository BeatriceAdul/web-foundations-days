let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" },
];

// 1. Search notes
function searchNotes(word) {
    const searchWord = word.toLowerCase();

    return notes.filter((note) =>
        note.text.toLowerCase().includes(searchWord)
    );
}

// 2. Find the longest note
function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    let longest = notes[0];

    for (const note of notes) {
        if (note.text.length > longest.text.length) {
            longest = note;
        }
    }

    return longest;
}

// 3. Count notes by category
function countByCategory() {
    const counts = {};

    for (const note of notes) {
        if (counts[note.category] === undefined) {
            counts[note.category] = 0;
        }

        counts[note.category]++;
    }

    return counts;
}

// 4. Get summary
function getSummary() {
    const counts = countByCategory();
    const total = notes.length;

    const noteWord = total === 1 ? "note" : "notes";

    return `${total} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0}.`;
}

// 5. Check for duplicate
function isDuplicate(text) {
    const cleanedText = text.trim().toLowerCase();

    return notes.some(
        (note) => note.text.trim().toLowerCase() === cleanedText
    );
}

// 6. Add a note
function addNote(text, category) {
    const cleanedText = text.trim();
    const validCategories = ["personal", "work", "study"];

    if (cleanedText.length < 1 || cleanedText.length > 200) {
        console.log("❌ Note rejected: text must be 1–200 characters.");
        return false;
    }

    if (isDuplicate(cleanedText)) {
        console.log("❌ Note rejected: duplicate note.");
        return false;
    }

    if (!validCategories.includes(category)) {
        console.log("❌ Note rejected: invalid category.");
        return false;
    }

    const newNote = {
        id: Date.now(),
        text: cleanedText,
        category: category
    };

    notes.push(newNote);

    console.log(`✅ Note added: "${newNote.text}"`);

    return true;
}


// ====================
// TESTS
// ====================

// searchNotes
console.log(searchNotes("DAY 3"));
// Expected: note 2

console.log(searchNotes("holiday"));
// Expected: []

// longestNote
console.log(longestNote());
// Expected: note 3

let savedNotes = notes;
notes = [];

console.log(longestNote());
// Expected: null

notes = savedNotes;


// countByCategory
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

notes = [
    { id: 1, text: "Call mum", category: "personal" }
];

console.log(countByCategory());
// Expected: { personal: 1 }


// getSummary
console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."


notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" }
];

console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."


// isDuplicate
console.log(isDuplicate("Buy milk and bread"));
// Expected: true

console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true


// addNote
console.log(addNote("Plan the weekend", "personal"));
// Expected: true

console.log(addNote("  PLAN THE WEEKEND  ", "personal"));
// Expected: false

console.log(addNote("Learn DOM events", "other"));
// Expected: false

console.log(notes);
// Expected: original 5 notes + "Plan the weekend"
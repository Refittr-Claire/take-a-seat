// -----------------------------------------------------------------------------
// Conversation prompts shown on /b/[id].
//
// SAFETY: benches go into hospices, dementia gardens and care homes. Prompts must
// not reference death, illness, loss, grief or regret; must not test recall;
// must not assume mobility, travel, family, employment or money; must be one
// short sentence; must never be intrusive.
//
// This list needs review by someone with dementia-care experience before the
// tags are manufactured, the QR is permanent but this list is not.
//
// Approved suggestions from /prompts/submit are pasted in here BY HAND. There is
// deliberately no code path from a submission to this array.
// -----------------------------------------------------------------------------

export const prompts: string[] = [
  "What's the best thing you've eaten this week?",
  'What sound reminds you of being small?',
  'What song do you know all the words to?',
  "What's something small that always cheers you up?",
  'What did you want to be when you were ten?',
  "What's a smell that takes you straight back?",
  "What's the kindest thing a stranger has ever done for you?",
  'Who taught you something you still use?',
  "What's the weather you like best?",
  'What game did you play as a child?',
  "What's something you're better at than you used to be?",
  "What's the best advice you've cheerfully ignored?",
  'What were Sundays like when you were young?',
  "What's a job you've done that would surprise people?",
  "What's the best meal anyone ever made you?",
  "What's something you've made with your hands?",
  "Who's the last person who made you properly laugh?",
  "What's a place you'd happily go back to?",
  'What do you notice here that most people walk past?',
  "What's the last thing that surprised you?",
  "What's a story your family always tells?",
  'What did your street sound like growing up?',
  "What's something you've changed your mind about?",
  "What's the furthest you've been from here?",
  'Who did you look up to when you were young?',
  "What's a habit you're glad you picked up?",
  "What's the best thing about this time of year?",
  "What's something you'd like to learn?",
  "What's a small thing you're looking forward to?",
  "What's the nicest thing about sitting still?",
]

/** Deterministic pick for server-side first paint (works with JS disabled). */
export function pickPrompt(seed = Date.now()): string {
  const i = Math.abs(Math.floor(seed)) % prompts.length
  return prompts[i]
}

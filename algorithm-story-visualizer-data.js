function buildFloydSteps() {
  const nodes = [1, 2, 3, 4, 5];
  const addresses = ['0xA4', '0xB7', '0xC2', '0xD9', '0xE1'];
  const nextMap = {0:1, 1:2, 2:3, 3:4, 4:2};
  const labels = [];
  let slow = 0, fast = 0;
  labels.push({ slow, fast, text: `Memory starts at Head (Address ${addresses[0]}). You move \`slow = slow.next\` (1 step), friend moves \`fast = fast.next.next\` (2 steps).` });
  for (let turn = 1; turn <= 4; turn++) {
    const oldSlow = slow;
    const oldFast = fast;
    slow = nextMap[slow];
    const fastStep1 = nextMap[oldFast];
    const fastStep2 = nextMap[fastStep1];
    fast = fastStep2;
    const meet = slow === fast;
    
    let explanation = `You read Next at ${addresses[oldSlow]} -> jump to ${addresses[slow]}. Friend reads Next at ${addresses[oldFast]} -> jumps to ${addresses[fastStep1]}, then reads Next -> jumps to ${addresses[fast]}.`;
    if (meet) explanation += ' BAM! Your friend lapped you and bumped into your back. Loop proven!';
    
    labels.push({ slow, fast, text: explanation });
    if (meet) break;
  }
  let seeker = 0;
  const meetIndex = slow;
  labels.push({ slow: meetIndex, fast: meetIndex, seeker, phase: 'findStart', text: `To find the loop start, we keep \`slow\` where it crashed, and reset \`head\` (Address ${addresses[0]}). Both walk 1 step (\`next\`).` });
  while (seeker !== slow) {
    const oldSeeker = seeker;
    const oldSlow = slow;
    seeker = nextMap[seeker];
    slow = nextMap[slow];
    
    let explanation = `Reset reads Next at ${addresses[oldSeeker]} -> jumps to ${addresses[seeker]}. You read Next at ${addresses[oldSlow]} -> jump to ${addresses[slow]}.`;
    if (seeker === slow) explanation += ` You met again! This exact memory address (${addresses[slow]}) is where the loop begins.`;
    
    labels.push({ slow, fast: slow, seeker, phase: 'findStart', text: explanation });
  }
  return { nodes, addresses, steps: labels, cycleStart: 2 };
}

function buildKadaneSteps() {
  const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  let currentSum = 0;
  let bestSum = -Infinity;
  let windowStart = 0;
  let bestStart = 0;
  let bestEnd = 0;
  const steps = arr.map((value, index) => {
    if (currentSum <= 0) {
      currentSum = value;
      windowStart = index;
    } else {
      currentSum += value;
    }
    if (currentSum > bestSum) {
      bestSum = currentSum;
      bestStart = windowStart;
      bestEnd = index;
    }
    return {
      index, value, currentSum, bestSum, windowStart, bestStart, bestEnd,
      text: currentSum === value && value !== 0
        ? 'The old team score was dragging us down, so we fired everyone and started a brand new team here.'
        : 'This player keeps our team score positive, so we keep growing the team!'
    };
  });
  return { arr, steps };
}

function buildMajoritySteps() {
  const arr = [2, 2, 1, 1, 1, 2, 2];
  let candidate = null;
  let count = 0;
  const steps = arr.map((value, index) => {
    if (count === 0) candidate = value;
    count += value === candidate ? 1 : -1;
    return {
      index, value, candidate, count,
      text: count === 0
        ? 'A tie! Everyone wiped each other out in a snowball fight. The next person to arrive becomes the new King.'
        : value === candidate
          ? 'An ally arrived! The King\'s army grows stronger.'
          : 'An enemy arrived! They threw a snowball and knocked out one of the King\'s guards.'
    };
  });
  return { arr, steps };
}

function buildDutchSteps() {
  const arr = [2, 0, 2, 1, 1, 0];
  let a = [...arr];
  let low = 0, mid = 0, high = a.length - 1;
  const steps = [{ arr: [...a], low, mid, high, text: 'Imagine sorting laundry: darks left, whites middle, colors right.' }];
  while (mid <= high) {
    if (a[mid] === 0) {
      [a[low], a[mid]] = [a[mid], a[low]];
      steps.push({ arr: [...a], low, mid, high, text: 'Found a dark shirt (0). Toss it to the left pile.' });
      low++; mid++;
    } else if (a[mid] === 1) {
      steps.push({ arr: [...a], low, mid, high, text: 'Found a white shirt (1). Leave it in the middle.' });
      mid++;
    } else {
      [a[mid], a[high]] = [a[high], a[mid]];
      steps.push({ arr: [...a], low, mid, high, text: 'Found a color shirt (2). Toss it to the right pile. Wait, what did we just swap in? Let\'s check it.' });
      high--;
    }
  }
  steps.push({ arr: [...a], low, mid, high, text: 'All laundry sorted perfectly in one single pass!' });
  return { arr, steps };
}

function buildMonoStackSteps() {
  const arr = [70, 65, 75, 71, 69, 72, 76, 73];
  const result = Array(arr.length).fill(0);
  const stack = [];
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      const prev = stack.pop();
      result[prev] = i - prev;
      steps.push({
        index: i,
        arr: [...arr],
        stack: [...stack],
        result: [...result],
        resolved: prev,
        popped: true,
        text: `Check: Is Day ${i+1} (${arr[i]}°) > Stack Top Day ${prev+1} (${arr[prev]}°)? YES! Pop it from the stack, they found their warmer day.`
      });
    }
    stack.push(i);
    steps.push({
      index: i,
      arr: [...arr],
      stack: [...stack],
      result: [...result],
      popped: false,
      text: stack.length > 1 
        ? `Check: Is Day ${i+1} (${arr[i]}°) > Stack Top Day ${stack[stack.length-2]+1} (${arr[stack[stack.length-2]]}°)? NO. Push it to the Stack (Waiting Room).` 
        : `Push Day ${i+1} (${arr[i]}°) to the empty stack.`
    });
  }
  return { arr, steps };
}

function buildUnionFindSteps() {
  const n = 7;
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = Array(n).fill(0);
  const ops = [[0,1],[1,2],[3,4],[2,4],[5,6],[4,6]];
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (a, b) => {
    let pa = find(a), pb = find(b);
    if (pa === pb) return false;
    if (rank[pa] < rank[pb]) [pa, pb] = [pb, pa];
    parent[pb] = pa;
    if (rank[pa] === rank[pb]) rank[pa]++;
    return true;
  };
  const steps = [{ parent: [...parent], rank: [...rank], edge: null, text: 'Everyone is the boss of their own 1-person club.' }];
  ops.forEach(edge => {
    union(edge[0], edge[1]);
    steps.push({
      parent: [...parent],
      rank: [...rank],
      edge,
      text: `Person ${edge[0]} and Person ${edge[1]} become friends! Their clubs merge, and the bigger boss takes over.`
    });
  });
  return { n, steps, ops };
}

window.visualizerDatasets = {
  floyd: buildFloydSteps(),
  kadane: buildKadaneSteps(),
  boyer: buildMajoritySteps(),
  dutch: buildDutchSteps(),
  mono: buildMonoStackSteps(),
  union: buildUnionFindSteps(),
};

window.visualizerAlgorithms = [
  {
    id: 'floyd',
    name: 'Floyd Cycle Detection',
    short: 'Fast & Slow Runners',
    story: 'Imagine you and a friend running on a track. You jog at a normal pace, but your friend sprints twice as fast. If the track is straight, your friend just wins. But if the track is a circle, your friend will eventually lap you and crash into your back! That crash is your proof that you\'re stuck in a loop.',
    intent: 'Detect a loop in a linked list without using extra memory.',
    cue: 'Linked list + loop? + no HashSet allowed.',
    why: 'Because the fast pointer moves exactly 1 step closer to the slow pointer each turn inside the loop. They are mathematically guaranteed to meet.',
    pitfalls: 'Forgetting phase 2: to find exactly where the loop starts, reset one runner to the beginning and make them both jog at the same speed. Where they meet is the start of the loop.',
    analogy: 'Two runners on a ring road. Different speeds force a collision.',
    pattern: 'Fast and slow pointers',
    complexity: 'Time O(n), space O(1)'
  },
  {
    id: 'kadane',
    name: 'Kadane\'s Algorithm',
    short: 'The Fairweather Fan',
    story: 'You are tracking the score of a team over a season. As long as the running score is helping you hit a high score, you keep it. But the second the total score drops below zero, it\'s dead weight. You fire the whole team and start a brand new streak from the next game.',
    intent: 'Find the maximum sum contiguous subarray in one pass.',
    cue: 'Array + maximum sum + contiguous.',
    why: 'A negative running sum only hurts whatever numbers come next, so it\'s mathematically better to just throw it away and start fresh.',
    pitfalls: 'Don\'t just reset to 0 blindly without updating the "best score ever seen" – what if every single number in the array is negative? You still need to pick the least bad one!',
    analogy: 'Dropping a toxic friend group the moment they bring your overall vibe below zero.',
    pattern: 'Running sum / DP on prefix choice',
    complexity: 'Time O(n), space O(1)'
  },
  {
    id: 'boyer',
    name: 'Majority Vote',
    short: 'Snowball Fight',
    story: 'Imagine a massive free-for-all snowball fight. Every time a kid hits someone from a different team, they both get knocked out. If one team has more than half the kids (a true majority), they can sacrifice players to knock out everyone else, and they will still have at least one kid standing at the end.',
    intent: 'Find an element appearing more than half the time using constant space.',
    cue: 'Majority element > n/2.',
    why: 'Pairwise cancellation removes balanced opposition. The majority candidate is just too massive to be completely cancelled out.',
    pitfalls: 'This only works if you are GUARANTEED a majority exists. If not, the last kid standing might just be lucky, so you have to do a second pass to count their actual votes.',
    analogy: 'A real majority army wins a 1v1 attrition war every time.',
    pattern: 'Candidate + count invariant',
    complexity: 'Time O(n), space O(1)'
  },
  {
    id: 'dutch',
    name: 'Dutch National Flag',
    short: 'Laundry Sorting',
    story: 'You have a messy pile of laundry. You set up three baskets: Darks on the left, Whites in the middle, Colors on the right. You pick up one shirt at a time from the middle. Dark? Toss left. White? Leave it. Color? Toss right. In one single pass, everything is sorted!',
    intent: 'Partition an array containing three categories (like 0, 1, 2) in one pass.',
    cue: 'Only 3 distinct values like 0/1/2.',
    why: 'Using 3 pointers (low, mid, high) lets you carve the array into known zones and unknown territory, shrinking the unknown until it\'s gone.',
    pitfalls: 'When you swap a shirt from the right pile into your hands (the mid pointer), you don\'t know what color it is yet! Don\'t move your mid pointer forward until you check it.',
    analogy: 'Three conveyor belts pulling items into their own lanes simultaneously.',
    pattern: 'Three pointers / partitioning',
    complexity: 'Time O(n), space O(1)'
  },
  {
    id: 'mono',
    name: 'Monotonic Stack',
    short: 'The Waiting Room',
    story: 'Imagine a waiting room for people waiting for a hotter day. A guy comes in on a 70° day and waits. Next day is 65°, that guy sits down and waits too. But the next day is 75°! The bouncer yells "75!" and kicks out everyone who was waiting for something hotter than 70 and 65. Their wait is over.',
    intent: 'Answer "next greater/smaller element" questions efficiently.',
    cue: 'Next greater, next smaller, histogram, daily temperatures.',
    why: 'The stack only keeps people who haven\'t found their answer yet. Because weaker candidates get popped immediately, everyone is pushed and popped at most once.',
    pitfalls: 'Store the INDICES in the waiting room, not the temperatures themselves! You usually need to know how many days they waited, not just what the temperature was.',
    analogy: 'A line of people waiting. A stronger arrival resolves all the weaker people in front of them.',
    pattern: 'Ordered stack invariant',
    complexity: 'Time O(n), space O(n)'
  },
  {
    id: 'union',
    name: 'Union-Find',
    short: 'Merging Friend Clubs',
    story: 'At the start of school, everyone is a 1-person club, and they are their own boss. When two people become friends, their entire clubs merge. To keep things organized, the boss of the smaller club always agrees to report to the boss of the bigger club. To see if two people are in the same club, just ask "Who is your ultimate boss?"',
    intent: 'Track connectivity, components, and cycles in graphs.',
    cue: 'Are these connected? Will adding this edge create a cycle?',
    why: 'Finding the ultimate boss tells you what group you are in. Merging groups is as simple as making one boss point to another.',
    pitfalls: 'If you don\'t compress the paths (make everyone report directly to the ultimate boss once they find them), the chain of bosses gets too long and slow.',
    analogy: 'Corporate buyouts: smaller companies get absorbed and report to the bigger company\'s CEO.',
    pattern: 'Disjoint set structure',
    complexity: 'Almost O(1) amortized per operation'
  }
];

yahtzee = {
  'turnsRemaining' : 13,
  'throwsRemainingInTurn' : 3,
  'player' : {
    'name' : 'Bill',
    'avatar' : 'avatar.jpeg',
  },
  'dice' : [
    {
      'sideUp' : 0,
      'saved' : false,
    },
    {
      'sideUp' : 0,
      'saved' : false,
    },
    {
      'sideUp' : 0,
      'saved' : false,
    },
    {
      'sideUp' : 0,
      'saved' : false,
    },
    {
      'sideUp' : 0,
      'saved' : false,
    }
  ],
  'scoreCard' : [
    {
      'title' : 'Ones',
      'top' : true,
      'displaySequence' : 1,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['none'],
      'scoreMath' : ['sum', 1]
    },
    {
      'title' : 'Twos',
      'top' : true,
      'displaySequence' : 2,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['none'],
      'scoreMath' : ['sum', 2]
    },
    {
      'title' : 'Threes',
      'top' : true,
      'displaySequence' : 3,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['none'],
      'scoreMath' : ['sum', 3]
    },
    {
      'title' : 'Fours',
      'top' : true,
      'displaySequence' : 4,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['none'],
      'scoreMath' : ['sum', 4]
    },
    {
      'title' : 'Fives',
      'top' : true,
      'displaySequence' : 5,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['none'],
      'scoreMath' : ['sum', 5]
    },
    {
      'title' : 'Sixes',
      'top' : true,
      'displaySequence' : 6,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['none'],
      'scoreMath' : ['sum', 6]
    },
    {
      'title' : '3 of a Kind',
      'top' : false,
      'displaySequence' : 7,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['ofAKind', 3],
      'scoreMath' : ['sum', 0]
    },
    {
      'title' : '4 of a Kind',
      'top' : false,
      'displaySequence' : 8,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['ofAKind', 4],
      'scoreMath' : ['sum', 0]
    },
    {
      'title' : 'Full House',
      'top' : false,
      'displaySequence' : 9,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['ofAKind', 2, 3],
      'scoreMath' : ['const', 25]
    },
    {
      'title' : 'Sm. Straight',
      'top' : false,
      'displaySequence' : 10,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['inARow', 4],
      'scoreMath' : ['const', 30]
    },
    {
      'title' : 'Lg. Straight',
      'top' : false,
      'displaySequence' : 11,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['inARow', 5],
      'scoreMath' : '40'
    },
    {
      'title' : 'Chance',
      'top' : false,
      'displaySequence' : 12,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : ['none'],
      'scoreMath' : ['sum', 0]
    },
    {
      'title' : 'Yahtzee',
      'top' : false,
      'displaySequence' : 13,
      'scoreRecorded' : false,
      'score' : 0,
      'scoreCondition' : 'notSureYet',
      'scoreMath' : '50'
    }
  ]
 }

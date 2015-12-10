var SKILL_RANKS = {
  '8': 'Legendary',
  '7': 'Epic',
  '6': 'Fantastic',
  '5': 'Superb',
  '4': 'Great',
  '3': 'Good',
  '2': 'Fair',
  '1': 'Average',
  '0': 'Mediocre',
  '-1': 'Poor',
  '-2': 'Terrible'
};

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.dfrpg_characters.helpers({
    characters: [
      {name: "Alice", aspects: [
        {aspectname: "Cybernetic Adrenaline Junkie"},
        {aspectname: "I’m basically a tank"},
        {aspectname: "Subtlety is for bitches"},
        {aspectname: "But I’m street smart!"}
      ]},
      // {name: "Window", aspects: [
      //   {aspectname: "Ranged Weapons Specialist"},
      //   {aspectname: "Moon-man of action"},
      //   {aspectname: "Kind words"},
      //   {aspectname: "No half-measures"},
      //   {aspectname: "Fear of physiology"}
      // ]},
      {name: "Jaguar Mirror", aspects: [
        {aspectname: "Smooth-Talking Scoundrel"},
        {aspectname: "The less you know..."},
        {aspectname: "Let's just talk about this"},
        {aspectname: "Sometimes words aren't enough"},
        {aspectname: "... with a conscience"}
      ]},
      {name: "Steve", aspects: [
        {aspectname: "Nohaine Magic Monk with Water Symbiote"},
        {aspectname: "My brain is my body, my body is everything"},
        {aspectname: "People rely on technology too much"},
        {aspectname: "I’ve been doing this for the better part of the last century"},
        {aspectname: "Socially inept"}
      ]},
      {name: "Zadia", aspects: [
        {aspectname: "Pirate Diplomat"},
        {aspectname: "Nothing works like a rousing speech"},
        {aspectname: "We are all pieces in the Great Game"},
        {aspectname: "Kicking butts and making friends"},
        {aspectname: "Why shouldn’t I be in charge?"}
      ]},
      {name: "Clint", aspects: [
        {aspectname: "Ex-con Conspiracy Theorist"},
        {aspectname: "Unburdened by scruples"},
        {aspectname: "Gun-nut"},
        {aspectname: "DON’T LET THEM GET TAKEN"},
        {aspectname: "A danger to himself and others"}
      ]}
    ]
  });

  Template.dfrpg_npcs.helpers({
    characters: [
      {
        name: "Elder Gruff",
        aspects: [
          {aspectname: "Elder Gruff", type: 'highconcept'},
          {aspectname: "Sense of Honor", type: 'other'},
          {aspectname: "Sword as Long as a Car", type: 'other'}
        ], skills: [
        {
          skillname: "Alertness",
          skillrank: 2
        }
      ]}
    ],
    highconcept: function() {
      return this.aspects.filter(function(elem) {return elem.type==='highconcept'})[0].aspectname;
    },
    otheraspects: function() {
      var skills = this.aspects.filter(function(aspect) {return aspect.type!=='highconcept'});
      var skillnames = skills.map(function(aspect) {return aspect.aspectname});

      return skillnames.join(', ');
    }
  });

  Template.registerHelper('skilldisplay', function(rank) {
    var ranknum = rank.toString();
    if(rank >= 0) {
      ranknum = '+' + ranknum;
    }

    var rankname = SKILL_RANKS[rank.toString()];

    var out = rankname + ' (' + ranknum + ')';

    return new Handlebars.SafeString(out);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

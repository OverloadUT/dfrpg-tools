NPCs = new Mongo.Collection("npcs");
Powers = new Mongo.Collection("powers");

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
  Session.setDefault('editmode', false);

  EditableText.userCanEdit = function(doc,Collection) {
    return Session.get('editmode');
  };

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
    characters: function () {
      return NPCs.find({});
    },
    highconcept: function() {
      return this.aspects.filter(function(elem) {return elem.type==='highconcept'})[0].aspectname;
    },
    otheraspects: function() {
      var skills = this.aspects.filter(function(aspect) {return aspect.type!=='highconcept'});
      var skillnames = skills.map(function(aspect) {return aspect.aspectname});

      return skillnames.join(', ');
    }
  });

  Template.dfrpg_power.helpers({
    powerdata: function() {
      var power = Powers.findOne({name: this.powername}) || {};
      console.log(power);
      for (var attrname in this) {
        power[attrname] = this[attrname];
      }
      return power;
    }
  });

  Template.registerHelper('userCanEdit', function() {
    return Session.get('editmode');
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

  Template.registerHelper('stuntdisplay', function(stunt) {
    var out = stunt.stuntname;
    if(stunt.stuntskill) {
      out = out + " (" + stunt.stuntskill + ")";
    }

    return new Handlebars.SafeString(out);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Powers.remove({});
    Powers.insert({name: 'Claws', cost: -1, quickref: 'Fists gain **Weapon:2**'});

    // code to run on server at startup
    NPCs.remove({});
    NPCs.insert({
      name: "Elder Gruff",
      aspects: [
        {aspectname: "Elder Gruff", type: 'highconcept'},
        {aspectname: "Sense of Honor", type: 'other'},
        {aspectname: "Sword as Long as a Car", type: 'other'}
      ], skills: [
        {
          skillname: "Alertness",
          rank: 2
        },{
          skillname: "Athletics",
          rank: 3
        },
      ],
      skillnotes: "Most other physical skills default to Fair, the rest to Average.",
      stunts: [
        {
          stuntname: "Hunter",
          stuntskill: "Survival",
          description: "Use Survival instead of investigation when tracking prey."
        }
      ],
      powers: [
        {
          powername: "Claws",
        },
        {
          powername: "Echoes of the Beast",
          cost: -1,
          extra: "(Goat)"
        }
      ],
      notes: "Some notes"
    });
    NPCs.insert({
      name: "Goblin",
      aspects: [
        {aspectname: "Hunter Goblin", type: 'highconcept'}
      ], skills: [
        {
          skillname: "Alertness",
          rank: 2
        }
      ]
    });
  });
}

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.arrpg_characters.helpers({
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

  Template.arrpg_npcs.helpers({
    characters: [
      {name: "M12 Infantry (Nameless NPC)", aspects: [
        {aspectname: "Well-Armed Soldier"},
        {aspectname: "Tactical Maneuvers"}
      ], modes: [
        {
          modename: "Action",
          moderank: "Good",
          modevalue: "+3"
        }
      ]}
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

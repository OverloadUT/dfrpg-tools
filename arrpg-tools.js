if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.arrpg_characters.helpers({
    characters: [
      {name: "Alice", aspects: [
        {aspectname: "Cybernetic Adrenaline Junkie"},
        {aspectname: "I’m basically a tank"},
        {aspectname: "Subtlety is for bitches"},
        {aspectname: "But I’m street smart!"}
      ]},
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

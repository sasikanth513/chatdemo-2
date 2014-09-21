Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster%40sandbox00aadc4bba8c43fc98c1a7dbc6b14d06.mailgun.org:bd81c8853550817d56b2b4a1b9b8cf8e@smtp.mailgun.org:587';
    Accounts.emailTemplates.from = "Verfication Link";

    AllPosts.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        return (userId && doc.owner === userId);
    },
     update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        return doc.owner === userId;
      },
      remove: function (userId, doc) {
        // can only remove your own documents
        return doc.owner === userId;
      },
      fetch: ['owner']
  }); 

    ChatRooms.allow({
    insert: function (userId, doc) {
        return true;
    },
     update: function (userId, doc, fields, modifier) {
        return true;
      },
      remove: function (userId, doc) {
        return false;
      }
  }); //end of ChatRooms.allow code

});
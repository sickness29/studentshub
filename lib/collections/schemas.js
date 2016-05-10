var Schemas = {};

Schemas.Post = new SimpleSchema({
  author: {
    type: String,
    label: "Author"
  },
  created: {
    type: Date,
    label: "Created"
  },
  changed: {
    type: Date,
    label: "Changed"
  },
  text: {
    type: String,
    label: "Body"
  },
  likes: {
    type: Number,
    label: "Likes",
    min: 0
  }
});
Posts.attachSchema(Schemas.Post);

Schemas.UserProfile = new SimpleSchema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  birthday: {
    type: String
  },
  gender: {
    type: String,
    allowedValues: ['male', 'female']
  },
  bio: {
    type: String,
    optional: true
  }
});
Schemas.User = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schemas.UserProfile
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  heartbeat: {
    type: Date,
    optional: true
  }
});
Meteor.users.attachSchema(Schemas.User);

if (Meteor.isServer) {
  Accounts.validateNewUser(function (user) {
    Schemas.User.validate(user);
    return true;
  });
}

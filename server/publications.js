/**
 * Posts.
 */
Meteor.publish('timeline', function () {
  return Posts.find();
});
Meteor.publish('post', function (id) {
  check(id, String);
  return Posts.find({_id: id});
});
/**
 * Users.
 */
Meteor.publish('author', function (id) {
  check(id, String);
  var post = Posts.findOne({_id: id});
  return Meteor.users.find({_id: post.author});
});
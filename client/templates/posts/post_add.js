Template.postAdd.events({
  'submit form': function (e) {
    e.preventDefault();

    var post = {
      author: Meteor.userId(),
      created: Date.now() / 1000 | 0,
      changed: Date.now() / 1000 | 0,
      text: $(e.target).find('[name="text"]').val(),
      likes: 0
    };
    console.log(post);
    post._id = Posts.insert(post);
    Router.go('postView', post);
  }
});
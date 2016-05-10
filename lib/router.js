Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  accessDeniedTemplate: ''
});

Router.route('/', {
  name: 'homepage',
  waitOn: function () {
    return Meteor.subscribe('posts');
  }
});

/****************************************
 * User routes.
 */
Router.route('/user/sign-in', {
  action: function () {
    this.render('accessDenied');
    if (!Meteor.userId()) {
      this.render('signInUp');
    }
  },
  name: 'signInUp'
});

Router.route('/user/sign-out', {
  action: function () {
    Meteor.logout();
    Router.go('/');
  },
  name: 'signOut'
});

Router.route('/profile/:_id', {
  action: function () {
    this.render('accessDenied');
    if (Meteor.userId()) {
      this.render('profile');
    }
  },
  data: function () {
    var user = User.findOne(this.params._id),
        result = {};

    return result;
  },
  name: 'profile'
});

/****************************************
 * Post routes.
 */
Router.route('/post/add', {name: 'postAdd'});
Router.route('/post/:_id', {
  name: 'postView',
  data: function() {
    if (this.ready()) {
      var post = Posts.findOne({_id: this.params._id}),
          author = Meteor.users.findOne({_id: post.author}),
          result = {};

      result.authorName = author._id;
      result.context = 'all';
      result.text = post.text;

      return result;
    }
  },
  waitOn: function () {
    var params = this.params;
    return [
      Meteor.subscribe('post', params._id),
      Meteor.subscribe('author', params._id)
    ];
  }
});

/****************************************
 * Management routes.
 */
Router.route('/management', function () {
  this.render('managementPage');

  if (!Roles.userIsInRole(Meteor.user(), ['admin', 'management'])) {
    this.render('accessDenied');
  }
});

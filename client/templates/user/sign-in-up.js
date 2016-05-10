Template.signInUp.events({
  'submit form': function (e) {
    e.preventDefault();
    console.log('huhuhuh');

    if ($(e.target).hasClass('sign-in-form')) {
      var email = $(e.target).find('[name="email"]').val(),
          password = $(e.target).find('[name="password"]').val();

      Meteor.loginWithPassword(email, password, function() {
        Router.go('/');
      });
    }
    else if ($(e.target).hasClass('sign-up-form')) {
      console.log('huhuhuh');
      var password2 = $(e.target).find('[name="password2"]').val(),
          options = {
            email: $(e.target).find('[name="email"]').val(),
            password: $(e.target).find('[name="password"]').val(),
            profile: {
              firstName: $(e.target).find('[name="first_name"]').val(),
              lastName: $(e.target).find('[name="last_name"]').val(),
              birthday: $(e.target).find('[name="birthday"]').val(),
              gender: $(e.target).find('[name="gender"]').val()
            }
          };

      console.log(options);
      console.log(password2);
      if (options.password !== password2) {
        return false;
      }
      Accounts.createUser(options, function (e) {
        console.log(e);
      });
    }
  }
});

Template.signInUp.onRendered(function () {
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });
});
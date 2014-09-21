Meteor.startup(function(){
  Session.set('resetPass', false);
})

Template.signupForm.events({
  'submit #signup-form': function(e,t){
    e.preventDefault();

    Accounts.createUser({
      username: t.find('#signup-username').value,
      password: t.find('#signup-password').value,
      email: t.find('#signup-email').value,
      profile:{
        fullname: t.find('#signup-name').value
      }
    }, function(error){
      if(error){
        alert("Account is not created");
      }
    });
  }
});
Template.logoutForm.events({
  'submit #logout-form': function(e,t){
    e.preventDefault();

    Meteor.logout(function(error){
      if(error)
      {
        alert("unable to logout from the application");
      }
    })
  }
});
Template.loginForm.events({ //work on validations and setup inside server using metho/cal
  'submit #login-form': function(e,t){
    e.preventDefault();
    console.log('you clicked');

    var unam = t.find('#login-username').value;
    var password = t.find('#login-password').value;

    Meteor.loginWithPassword(unam,password, function(error){
      if(error)
      {
        alert("wrong credentials");
        return;
      } 
      if (Router.current().route.name === 'login') {
        // if we are on the login route, we want to redirect the user
        return Router.go('home');
      }
    });
  }
});
Template.recovery.helpers({
  'resetPassword': function(){
    if(Accounts._resetPasswordToken)
    {
      Session.set('resetToken', Accounts._resetPasswordToken);
      Session.set('resetPass', true);
    }
    return Session.get('resetPass');
  }
});
Template.recovery.events({
  'submit #recovery-form': function(e,t){
    e.preventDefault();
    var email = t.find('#recovery-email').value;
    Accounts.forgotPassword({email:email}, function(error){
      if(error){
        alert('unable to send Reset link');
      }
    });
  },
  'submit #new-password': function(e,t){
    e.preventDefault();

    var newPass = t.find('#new-password-password').value;
    Accounts.resetPassword(Session.get('resetToken'),newPass,function(error){
      if(error){
        alert('Password not changed');
      }
      else{
        console.log('Password Successfully Changed');
      }
    });
  }
})





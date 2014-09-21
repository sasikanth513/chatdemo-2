
Router.configure({
    layoutTemplate: 'layout',
    waitOn: function(){return Meteor.subscribe('allposts'); },
    loadingTemplate: 'loading',
});


var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {       
        this.render('login');
        return pause();
      }
    }
};
Router.onBeforeAction(OnBeforeActions.loginRequired, {
    except: ['login']
});


Router.map(function(){
    this.route('home', {path: '/'});
    this.route('chat', {path: '/chat'});
    this.route('login',{path: '/login'});
    });
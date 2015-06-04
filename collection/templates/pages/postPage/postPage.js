/**
 * Created by wesley on 6/2/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/<%= camelizedSingularName %>s',
        menuName: '<%= humanizedPluralName %>',
        menuOrientation: 'left',
        pageTemplateName: '<%= camelizedSingularName %>sPage'
    });

    Router.route('/<%= camelizedSingularName %>s/insert', function() {
       this.render('insert<%= humanizedSingularName %>Page');
    });

    Router.route('/<%= camelizedSingularName %>s/:_id', function() {

        //we must subscribe to the <%= camelizedSingularName %> we are showing!!!
        this.subscribe('<%= camelizedSingularName %>', this.params._id);

        //now let's query that <%= camelizedSingularName %>
        var <%= camelizedSingularName %> = <%= humanizedPluralName %>.findOne({_id: this.params._id});

        //then set it as the 'this' object on the page
        this.render('single<%= humanizedSingularName %>Page', {data: <%= camelizedSingularName %>});
    });

    Router.route('/<%= camelizedSingularName %>s/:_id/edit', function() {

        //we must subscribe to the <%= camelizedSingularName %> we are showing!!!
        this.subscribe('<%= camelizedSingularName %>', this.params._id);

        //now let's query that <%= camelizedSingularName %>
        var <%= camelizedSingularName %> = <%= humanizedPluralName %>.findOne({_id: this.params._id});

        //then set it as the 'this' object on the page
        this.render('update<%= humanizedSingularName %>Page', {data: <%= camelizedSingularName %>});
    });

    //after they insert a new <%= camelizedSingularName %>, redirect back to
    //list of <%= camelizedSingularName %>s

    //'insert<%= humanizedSingularName %>' is the id of the quickform we
    //and 'update<%= humanizedSingularName %>' are the id's of the quickforms
    //we want to listen to
    AutoForm.addHooks(['insert<%= humanizedSingularName %>', 'update<%= humanizedSingularName %>'], {

        //the onSuccess method gets called after
        //a successful submit on either of the forms
            onSuccess: function(formType, result) {

                //this.docId is the _id of the document
                //the form just changed, so we will
                //load the url of that item and show the user
                //the result
                Router.go('/<%= camelizedSingularName %>s/' + this.docId);
            }
    });

    //Here we define a helper on the single <%= camelizedSingularName %> page
    Template.single<%= humanizedSingularName %>Page.helpers({
        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        }
    });

    //This is how you display a modal
    //In this case, we are displaying a modal to
    //confirm that the user wants to delete a specific <%= camelizedSingularName %>
    Template.single<%= humanizedSingularName %>Page.events({
        'click #delete<%= humanizedSingularName %>Button': function() {
            Modal.show('confirm<%= humanizedSingularName %>DeleteModal', this);
        }
    });


    /*
    After they click the confirm delete button,
    we remove the <%= camelizedSingularName %> document, hide the modal,
    and re-direct them to the list of <%= camelizedSingularName %>s
     */
    Template.confirm<%= humanizedSingularName %>DeleteModal.events({
        'click #confirmDelete': function() {
            <%= humanizedPluralName %>.remove(this._id, function() {
                Modal.hide();
                Router.go('/<%= camelizedSingularName %>s');
            });

        }
    })

}


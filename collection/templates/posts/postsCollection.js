/**
 * Created by wesley on 5/31/15.
 */

<%= humanizedSingularName %>s = new orion.collection('<%= camelizedSingularName %>s');

var pages = new Meteor.Pagination(<%= humanizedSingularName %>s, {
    infinite: true,
    infiniteItemsLimit: 100,
    itemTemplate: '<%= camelizedSingularName %>InList',
    sort: {
        createdOn: -1
    }
});

/**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
<%= humanizedSingularName %>s.attachSchema(new SimpleSchema({
    title: {
        type: String
    },

    /**
     * The file attribute is a custom orion attribute
     * This is where orion does its magic. Just set
     * the attribute type and it will automatically
     * create the form for the file.
     * WARNING: the url of the image will not be saved in
     * .image, it will be saved in .image.url.
     */
    image: orion.attribute('file', {
        label: 'Image',
        optional: true
    }),

    /**
     * Here it's the same with an image attribute.
     * summernote is an html editor.
     */
    body: orion.attribute('summernote', {
        label: 'Body'
    }),

    /**
     * This attribute sets the user id to that of the user that created
     * this <%= camelizedSingularName %> automatically.
     */
    createdBy: orion.attribute('createdBy'),

    createdOn: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true
    }
}));

//<%= humanizedSingularName %>s.permit('insert').ifHasRole('derpy').apply();

/**
 *
 * Define your security permissions here
 *
 */

// Use the action
if (Meteor.isServer) {

    Meteor.publish('<%= camelizedSingularName %>', function(<%= camelizedSingularName %>Id) {
        return <%= humanizedSingularName %>s.find({_id: <%= camelizedSingularName %>Id});
    });

}


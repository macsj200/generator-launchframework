var yeoman = require('yeoman-generator');

var launchGenerator = yeoman.Base.extend({
    copyBoilerplate: function() {
        this.copy('readme.md','readme.md');
        this.directory('.meteor','.meteor');
        this.directory('collections','collections');
        this.directory('modules','modules');
        this.directory('packages','packages');
        this.directory('pages','pages');
    }
});

module.exports = launchGenerator;

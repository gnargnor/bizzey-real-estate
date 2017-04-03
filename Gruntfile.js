module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {

        src: 'client/scripts/client.js',
        dest: 'server/public/scripts/client.min.js'

      }
    },
    copy: {
      jquery: {

        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: 'jquery.js',
        dest: 'server/public/vendors/'

      },
      html: {

        expand: true,
        cwd: 'client/',
        src: 'index.html',
        dest: 'server/public/'

      },
      bootstrap: {

        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: ['fonts/*.*', 'css/bootstrap.css', 'js/bootstrap.js'],
        dest: 'server/public/vendors/'

      },
      css: {

        expand: true,
        cwd: 'client/css/',
        src: '*.css',
        dest: 'server/public/css/'

      }
    },
    watch: {

      options: {
        livereload: true,
      },

      files: ['client/*.html', 'client/css/*.css'],
      tasks: ['uglify', 'copy'],

      }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'copy', 'watch' ]);

};

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost' //默认就是这个值，可配置为本机某个 IP，localhost 或域名
      },

      server: {
        options: {
          open: true, //自动打开网页 http://
          base: [
            './' //主目录
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['react-temple/*.js', 'user/*.js'],
        tasks: ['react', 'webpack'],
        options: {
          livereload: true
        }
      }
    },
    react: {
      dynamic_mappings: {
        files: [{
          expand: true,
          cwd: 'react-temple',
          src: ['*.js'],
          dest: 'react-build',
          ext: '.js'
        }, {
          expand: true,
          cwd: 'user',
          src: ['*.js'],
          dest: 'user-build',
          ext: '.js'
        }]
      }
    },
    webpack: {
      pack: {
        entry: './react-build/main.js',
        output: {
          filename: './react-build/build.js'
        },
        externals: {
          'React': 'window.React'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('server', ['connect', 'watch']);
  grunt.registerTask('build', ['react', 'webpack']);
  grunt.registerTask('start', ['react', 'webpack', 'connect', 'watch']);
};
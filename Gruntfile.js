module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
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
                files: ['react-temple/*.js'],
                tasks: ['react'],
                options: {
                    livereload: true
                }
            }
        },
        react: {
            files: {
                expand: true,
                cwd: 'react-temple',
                src: ['*.js'],
                dest: 'react-build',
                ext: '.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('server', ['connect']);
    grunt.registerTask('build', ['react']);
    grunt.registerTask('listener', ['watch']);
    grunt.registerTask('start', ['react', 'connect', 'watch']);
};
/**
 * Created by chenqb on 2015/7/4.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            devPortal: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['**/*.css','!**/*.min.css'],
                    dest: 'cssNew',
                    ext: '.css'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 只需在命令行上输入"grunt"，就会执行default task
    grunt.registerTask('default', ['cssmin']);
};

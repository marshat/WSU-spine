var version="0.5";
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			styles: {
		      src: ['styles/skeleton.css','styles/colors.css','styles/spine.css','styles/respond.css'],
		      dest: 'build/spine.css',
		    },
		    scripts: {
		      src: [ 'scripts/debug.js','scripts/wsu_autocomplete.js','scripts/ui.spine.js','scripts/ui.spine.framework.js','scripts/ui.spine.search.js','scripts/spine.js'],
			  dest: 'build/spine.js',
			  },
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
					'/*  See https://github.com/washingtonstateuniversity/WSU-spine/ for full source.*/\n'
			},
			build: {
				src: 'build/spine.js',
				dest: 'build/spine.min.js'
			}
		},
		cssmin: {
		  combine: {
		    files: {
		    // Hmmm, in reverse order
		      'build/spine.min.css': ['build/spine.css']
		    }
		  }
		},
		copy: {
		  main: {
		    files: [
		      {expand: true, src: ['fonts/*'], dest: 'build/'+version+'/'},
		      {expand: true, src: ['html/*'], dest: 'build/'+version+'/'},
		      {expand: true, src: ['icons/*'], dest: 'build/'+version+'/'},
		      {expand: true, src: ['images/*'], dest: 'build/'+version+'/'},
		      {expand: true, src: ['marks/*'], dest: 'build/'+version+'/'},
		      {expand: true, src: ['scripts/*'], dest: 'build/'+version+'/'},
		      {expand: true, src: ['styles/*'], dest: 'build/'+version+'/'},
		      {expand: true, src: ['spine.html','spine.min.html','authors.txt','favicon.ico'], dest: 'build/'},
		    ]
		  }
		},
		jshint: {
			files: ['Gruntfile.js', 'scripts/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
        preprocess : {
            options: {
                inline: true,
                context : {
                    DEBUG: true
                }
            },
            js : {
                src: 'build/spine.js'
            }
        }
	});
	

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-preprocess');
        
	// Default task(s).
	grunt.registerTask('default', ['concat','preprocess:js','cssmin','uglify','copy']);

};
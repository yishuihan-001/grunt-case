module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// 合并
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %>-<%= pkg.version %>-<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			cssConcat: {
				src: ['src/css/**/*.css'],
				dest: 'src/css/concat/<%= pkg.name %>-<%= pkg.version %>.css'
			},
			jsConcat: {
				src: ['src/js/**/*.js'],
				dest: 'src/js/concat/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},

		// 压缩
		cssmin: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %>-<%= pkg.version %>-<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/css/concat/<%= pkg.name %>-<%= pkg.version %>.css',
				dest: 'dist/css/<%= pkg.name %> - <%= pkg.version %>.min.css'
			}
		},

		// 压缩js
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %>-<%= pkg.version %>-<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/js/concat/<%= pkg.name %>-<%= pkg.version %>.js',
				dest: 'dist/js/concat/<%= pkg.name %>-<%= pkg.version %>.min.js'
			}
		},

		// js语法检查
		jshint: {
			options: {
				jshintrc: '.jshint'
			},
			build:['Gruntfile.js','src/js/*js']
		},

		// css语法检查
		csslint: {
			options: {
				csslintrc: '.csslint'
			},
			build: ['src/css/**/*.css']
		},

		// watch自动化
		watch: {
			build: {
				files:['src/js/**/*.js','src/css/**/*.css'],
        tasks:['jshint','csslint','concat','cssmin','uglify'],
				options:{spawn:false}
			}
		}

	});

	//告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//告诉grunt当我们在终端输入grunt时需要做些什么
	grunt.registerInitTask('default',['jshint','csslint','concat','cssmin','uglify','watch']);//先进行语法检查，如果没有问题，再合并，再压缩

};
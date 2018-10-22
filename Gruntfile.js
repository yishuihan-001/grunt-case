module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        static: 'build/static',
        jsUrl: '<%= static %>/js',
        cssUrl: '<%= static %>/css',

        jshint: {
            options: {
                /*jshintrc:'.jshint',*/
                //大括号包裹
                curly: true,
                //对于简单类型，使用===和!==，而不是==和!=
                eqeqeq: true,
                //对于首字母大写的函数（声明的类），强制使用new
                newcap: true,
                //禁用arguments.caller和arguments.callee
                noarg: true,
                //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: true,
                //查找所有未定义变量
                undef: true,
                //查找类似与if(a = 0)这样的代码
                boss: true,
                //指定运行环境为node.js
								node: true,
								// 允许省略分号
								// asi: true
            },
            // 具体任务配置
            files: {
                src: ['Gruntfile.js', 'dev/static/js/**/*.js']
            }
        },

        csslint: {
            options: {
                /*csslintrc:'.csslint',*/
                "adjoining-classes":false,
                "box-sizing":false,
                "box-model" : false,
                "compatible-vendor-prefixes": false,
                "floats":false,
                "font-sizes":false,
                "gradients":false,
                "important":false,
                "known-properties":false,
                "outline-none":false,
                "qualified-headings":false,
                "regex-selectors":false,
                "shorthand":false,
                "text-indent":false,
                "unique-headings":false,
                "universal-selector":false,
                "unqualified-attributes":false
            },
            files: ['dev/static/css/**/*.css']
        },

        concat: {
            options: {
                 //文件内容的分隔符
                 separator: ';',
                 stripBanners: true,
                 banner: '/*! <%= pkg.name %> - v<%= pkg.version %> -' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
						},
						// fail:不能直接合并
            css: {
                crc: ['dev/static/css/*.common.css'],
                dest: 'build/static/css/common.css'
            },
            js: {
                src: ['dev/static/js/*.common.js'],
                dest: 'build/static/js/common.js'
            }
        },

        uglify: {
            options: {
                sourceMap: false,
                stripBanners: true,
                banner: '/*! <%= pkg.name %>-<%= pkg.version %>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                footer: '\n/*! 修改于<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            combine: {
                files: {
                    'build/static/js/compress-<%= pkg.name %>-<%= pkg.version %>.min.js': ['dev/static/js/*.common.js'],
                    'build/static/js/compress.common.min.js': ['dev/static/js/*/*.common.js']
                }
						},
						compress: {
							options: {
								report: 'min',
								sourceMap: false,
								stripBanners: true,
								banner: '/*! <%= pkg.name %>-<%= pkg.version %>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
								footer: '/*! 修改于<%= grunt.template.today("yyyy-mm-dd") %> */'
							},
							files: [
								{
									expand: true,
									cwd: 'dev/static/js',
									src: ['*.js', '!*.min.js', '!*.common.js'],
									dest: 'build/static/js',
									ext: '.min.js'
								}
							]
						},
						fileCompress: {
							options: {
								sourceMap: false,
								stripBanners: true,
								stripBanners: '/*! <%= pkg.name %>-<%= pkg.version %>.min.js <%= grunt.template.today("yyyy-mm-dd") %> */'
							},
							files: [
								{
									expand: true,
									cwd: 'dev/static/js',
									src: ['**/*.js', '!**/*.min.js', '!**/*.common.js'],
									dest: 'build/static/js/',
									ext: '.min.js'
								}
							]
						}
				},

				cssmin: {
					combine: {
						files: {
							'build/static/css/compress.min.css': ['dev/static/css/*.common.css'],
							'build/static/css/compressByFile.css': ['dev/static/css/*/*.common.css'],
							'build/static/css/compressAll.css': ['dev/static/css/**/*.common.css']
						}
					},
					compress: {
						options: {
							report: 'gzip',
							separator: '',
							banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
							beautify: {
								//中文ascii化，非常有用！防止中文乱码的神配置
								ascii_only: true
							},
							// 删除所有注释
							keepSpecialCommemts: 0
						},
						files: [
							{
								expand: true,
								cwd: 'dev/static/css',
								src: ['*.css', '!*.common.css'],
								dest: 'build/static/css',
								ext: '.min.css'
							}
						]
					},
					fileCompress: {
						options: {
							banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
							beautify: {
								ascii_only: true,
							},
							keepSpecialCommemts: 0
						},
						files: [
							{
								expand: true,
								cwd: 'dev/static/css',
								src: ['**/*.css', '!**/*.common.css'],
								dest: 'build/static/css',
								ext: '.min.css'
							}
						]
					}
				},

				imagemin: {
					compress: {
						options: {
							optimizationLevel: 7
						},
						files: [
							{
								expand: true,
								cwd: 'dev/static/img',
								src: ['**/*.{png,jpg,gif}'],
								dest: 'build/static/img'
							}
						]
					}
				},

				htmlmin: {
					compress: {
						options: {
							removeComments: true,
							removeCommentsFromCDATA: true,
							collapseWhitespace: true,
							collapseBooleanAttributes: true,
							removeAttributeQuotes: true,
							removeRedundantAttributes: true,
							useShortDoctype: true,
							removeEmptyAttributes: true,
							removeOptionalTags: true,
							keepClosingSlash:true,
							removeEmptyElements:true,
							removeScriptTypeAttributes:true,
							removeStyleLinkTypeAttributes:true
						},
						files: [
							{
								expand: true,
								cwd: 'dev/templates/view',
								src: ['**/*.html'],
								dest: 'build/templates/view'
							}
						]
					}
				},

				uncss: {
					dist: {
						options: {
							ignore: [/js-.+/, '.special-class'],	//允许我们忽略指定样式
							ignoreSheets: [/fonts.googleapis/],		//允许我们忽略指定样式表
						},
						files: {
							'build/static/css/unused-removed.css': ['dev/templates/view/index.html', 'dev/templates/view/about/about.html']
						}
					}
				},

				// fail 没有安装sass
				sass: {
					dist: {
						options: {
							sourceMap: false,
							style: 'expanded'
						},
						files: [
							{
								expand: true,
								cwd: 'dev/static/sass',
								src: ['**/*.sass', '**/*.scss'],
								dest: 'build/static/scss',
								ext: '.css'
							}
						]
					}
				},

				less: {
					dist: {
						options: {
							style: 'expanded'
						},
						files: [
							{
								expand: true,
								cwd: 'dev/static/less',
								src: ['**/*.less'],
								dest: 'build/static/lcss',
								ext: '.css'
							}
						]
					}
				},

				// watch: {
				// 	build: {
				// 		files: ['dev/static/js/*.js', 'dev/static/css/*.css'],
				// 		tasks: ['jshint', 'csslint', 'concat', 'uglify', 'cssmin'],
				// 		options: {
				// 			spawn: false
				// 		}
				// 	},
				// 	img: {
				// 		options: {
				// 			livereload: true
				// 		},
				// 		files: ['img/*.{jpg,png,jpeg}']
				// 	},
				// 	css: {
				// 		options: {
				// 			livereload: true,
				// 			event: ['changed', 'added']
				// 		},
				// 		files: ['css/*.css']
				// 	},
				// 	js: {
				// 		options: {
				// 			livereload: true
				// 		},
				// 		files: ['js/*.js']
				// 	},
				// 	html: {
				// 		options: {
				// 			livereload: true
				// 		},
				// 		files: ['html/*.html']
				// 	}
				// },

				//注解：
        //cwd: '', 指向的目录是相对的,全称Change Working Directory更改工作目录
        //src: ['**'], 指向源文件，**是一个通配符，用来匹配Grunt任何文件
        //dest: 'images', 用来输出结果任务
				//expand: true expand参数为true来启用动态扩展，涉及到多个文件处理需要开启




				// // 静态文件服务器1
				// // 需安装Chrome LiveReload插件 当前fail
				// watch: {
				// 	client: {
				// 		files: ['dev/templates/view/*.html', 'dev/static/css/*', 'dev/static/js/*', 'dev/static/img/*'],
				// 		options: {
				// 			livereload: true
				// 		}
				// 	}
				// },


				// //静态文件服务器2
				// connect: {
				// 	options: {
				// 		port: 8000,
				// 		hostname: 'localhost',
				// 		base: 'dev/'
				// 	},
				// 	livereload: {
				// 		options: {
				// 			middleware: function(connect, options){
				// 				return [
				// 					// 把脚本，注入到静态文件中
				// 					require('connect-livereload')({ port: 35729 }),
				// 					// 静态文件服务器的路径
				// 					require('serve-static')(options.base[0]),
				// 					// 启用目录浏览(相当于IIS中的目录浏览)
				// 					require('serve-index')(options.base[0])
				// 				]
				// 			}
				// 		}
				// 	}
				// },

				// watch: {
				// 	client: {
				// 		options: {
				// 			livereload: 35729
				// 		},
				// 		files: ['<%= connect.options.base %>templates/view/*.html', '<%= connect.options.base %>static/css/*', '<%= connect.options.base %>static/js/*', '<%= connect.options.base %>static/img/*']
				// 	}
				// }



		});


		// 加载任务插件
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-csslint');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.loadNpmTasks('grunt-contrib-imagemin');
		grunt.loadNpmTasks('grunt-contrib-htmlmin');
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-uncss');										//从一个项目中删除未使用的CSS
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-watch');

		// grunt.registerTask('default', ['uncss', 'htmlmin']);

		// grunt.registerTask('default', 'Log some stuff.', function() {
		// 	grunt.log.write('Logging some stuff...').ok();
		// });

		// // 静态文件服务器1
		// grunt.registerTask('live', ['watch']);
		// 静态文件服务器2
		grunt.registerTask('live', ['connect', 'watch']);


};
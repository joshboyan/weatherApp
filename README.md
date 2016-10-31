#**min**imal responsive front-end **frame**work

minframe is a modern HTML5, mobile-first framework built with Sass and Gulp on a 12 column responsive grid. The framework boasts all of the modern accessiblility features and tools developers use in builds but none of the style bloat. The only boilerplate styling is normalize.scss, our 12 column responsive grid and basic HTML5 Sass nesting. Javascript is only required during the build process, not in the browser. 

##Automated Development Tools

-Gulp.js task runner to streamline and automate your workflow.

-Panini templating ensures you _don't repeat yourself_ by creating reusable head, header and footer layouts templates to combine with the pages unique body content.

-BrowserSync Live Reload and device testing built right in.

-Use the latest ES6 syntax with Babeljs, automatically check quality with jshint then compile, concatenate and minify with uglifyjs.

-Responsive grid built on Sass preprocessor is automatically compiled, concatenated, minified and auto-prefixed along with your custom styles to support legacy browsers.

-Server side PHP5 form validation, sanitation and email processing.

-Automatically generate and update sitemaps.

-.htaccess file fine-tuned by the pros at Google.

-No redundant styles that have to overwritten.

-__Minimal file bloat, maximum development power.__

##Get Started

###Git CLI

 1. Open your terminal and navigate to where you would like to dowlad the package.
 'cd desktop'

 2. Clone the repo to your local machine from your terminal.
 `git clone https://github.com/joshboyan/minframe.git`

 3. Change directories into the repo you just cloned.
 `cd minframe`

 4. Change the GitHub remote repository to one you own.
 `git remote set-url origin https://github.com/USERNAME/OTHERREPOSITORY.git`

 5. Verify the remote URL has changed.
 `git remote -v`

 6. Install the node_module dependencies.
 `npm install`

 7. Install the gulp-cli globally.
 `npm install -g gulp-cli`

 8. Start up the automated build and open chrome with Live Reload.
 `gulp`

 9. Open _components_ folder with your favorite text editor and create HTML markup in _layouts_ and _pages_, add your Sass styles to _scss_ and JavaScript to _js_.

 10. To stop automated workflow tools.
 `ctr c OR cmd c`

 ##Tutorial
 [minframe tutorial](http://joshboyan.com/minframe/tutorial.html)





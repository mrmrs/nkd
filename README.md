Checkout [nkd.cc](http://nkd.cc "NKD")

# NKD

#### Light-weight template for a responsive HTML5/SCSS Jekyll project 

NKD just works.
Start developing your prototype in [jekyll](http://jekyllrb.com "Jekyll - Simple, blog-aware, static sites") 
without any of the boring setup.

# Features

* Modular file structure, easy to extend or get rid of existing code.
* Mobile friendly responsive type scale
* A light-weight SCSS base that starts with Normalize.css - 1.2KB minified / 214B gzipped.
* Thoroughly commented code (Easy to get going if it's your first jekyll project)
* Two media queries for tablet and desktop size screens. Lends itself to mobile-first design.

# Getting started

* Create a new repo for your project on Github
* In terminal run 
```bash
    git clone git@github.com:mrmrs/nkd.git [yourNewRepoName]
    cd [yourNewRepoName]
    git remote rm origin
    git remote add origin git@github.com:[yourUserName]/[yourNewRepoName].git
    git remote -v
```

* git remote -v will allow you to check that you have changed the remote origin correctly. The output should look like:
```bash
    origin git@github.com:[yourUserName]/[yourNewRepoName].git (fetch)
    origin  git@github.com:[yourUserName]/[yourNewRepoName].git (push)
```
  
* Once you add & commit files you are ready to publish run:
```bash
git push -u origin master
```

# Batteries Not Included

File structure is as follows:

```
nkd                                 [ Site root ] 
  ├── README.md                     [ You are here ]
  ├── Procfile                      [ Run everything ]
  ├── Rakefile                      [ Rake tasks! ]
  ├── _config.yml                   [ Site options ]
  ├── _includes
  │   ├── _footer.html
  │   ├── _head.html
  │   ├── _js_includes.html
  │   └── _navigation_main.html
  ├── _layouts
  │   ├── default.html
  │   └── post.html
  ├── _posts
  │   └── 2020-01-01-example.html
  ├── _resources
  │   └── favicons.ai
  ├── _sass
  │   ├── _grid.scss
  │   ├── _normalize.scss           [http://necolas.github.io/normalize.css/]
  │   ├── _queries.scss             [Configurable media queries]
  │   ├── _styles.scss
  │   ├── _type.scss
  │   ├── _variables.scss
  │   └── i.scss                    [Imports .scss files, compiles to css/i.css]
  ├── css
  │   └── i.css                     [1.8KB minified / 214B gzipped - includes normalize.css]
  ├── favicon.icns
  ├── favicon.ico
  ├── index.html                    [index file that's served up at root. The "homepage" if you will.]
  ├── touch-icon-ipad-precomposed.png
  ├── touch-icon-ipad-retina-precomposed.png
  ├── touch-icon-iphone-precomposed.png
  └── touch-icon-iphone-retina-precomposed.png
```

# Running

In terminal run:

```bash
gem install foreman
foreman start
```

Now go to http://localhost:4000 and see Hello World.

What this did:

* Started up jekyll in a way that will automatically rebuild your site as you work
* Started up a SASS command that will automatically rebuild your CSS as you work

# Rake Tasks


Probably you don't need these for regular work, but they can be handy at times.  
Don't worry, these "tasks" are just easier ways of running annoyingly-complex UNIX commands.

### Work with minified CSS

Run this to start the sass autocompiler with minified output. Outputs to /nkd/css/i.css.

```
rake minify
```


### Remove all generated files

Run this to delete the _site directory. Use if you don't want to keep generated site locally unless actively developing or if
you want to force jekyll to rebuild everything from scratch (sometimes can solve weird issues)

```
rake clean
```

# Resources

There is an included Adobe Illustrator file that has artboards for every favicon size you'll need.
If you're into that sort of thing. There are premade favicons you will want to replace or remove
reference to.

# Author
[MRMRS](http://mrmrs.cc "Adam Morse - Designer Developer")

# License
This work is licensed under a [Creative Commons Attribution 3.0 Unported
License](http://creativecommons.org/licenses/by/3.0/ "Creative Commons
License").

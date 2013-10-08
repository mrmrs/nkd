require "rubygems"
require 'rake'

desc "Start Sass so that is minifies and compiles to nkd/css/i.css upon file save"
task :minify do
  system "sass --watch _sass:css --style compressed"
end # task :minify

desc "Remove _site from directory before committing"
task :clean do
  system "rm -rf _site"
end # task :clean

task :default do
  abort "use foreman start to run the project"
end

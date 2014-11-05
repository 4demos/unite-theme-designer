# Unite Theme Designer

A stand-alone app for testing themes made for Unite.

### Requirements

 - [Node.JS](http://nodejs.org/)

### Getting Started

```
git clone git@github.com:concordia-publishing-house/unite-theme-designer.git
cd unite-theme-designer
npm install
npm start
```

### Using the Theme Designer

The Theme Designer provides a mock Unite Web Site.

The site can be styled with any of the themes found in the `./themes` directory of the project. You can select between Unite's existing themes using the black bar at the bottom of the page. You can make changes to an existing theme by editing the files in any of the theme directories. Just refresh your browser to see the changes. You can create new themes by creating new directories.

### The contents of a Unite Theme

All of the information about a Unite Theme is contained in directory with the theme's name.

Every theme must have three files:

  1. `default.theme` — The theme applied to the Unite Web Site.
  2. `email.theme` — The theme applied to _emails_ sent from the Unite Web Site.
  3. `theme.description` — Metadata about the theme including its name, options, and presets.

Themes can also contain any number of stylesheets, images, javascript files, or other assets.

### .theme Files

Files ending in the extension `.theme` are Unite theme files. These are parsed with [Handlebars](http://handlebarsjs.com/).

Unite provides these files with a [context](http://handlebarsjs.com/execution.html) that consists of the following properties:

  - `unite/head` — **required** Every theme must put this within the document's `<head>` tag for Unite to work.
  - `unite/scripts` — **required**Every theme must put this within the document (toward the end of the `<body>` tag) for Unite to work.
  - `navigation/searchBox` — A search box for searching the site
  - `navigation/currentUser` — **required** The currently logged-in user and a link to sign in or sign out
  - `navigation/menuItems` — (array) An array of objects describing the site's navigation
  - `navigation/currentCategory`
  - `church/name`
  - `church/address`
  - `church/phone`
  - `church/email`
  - `page/type`
  - `page/breadcrumbs` — (array)
  - `page/alerts`
  - `page/body` — **required** The content of the current page
  - `page/title`
  - `page/heading`
  - `theme/path` — The path to the currently-selected theme. Prefix paths to your theme's assets with this.
  - `theme/*` — Any options you've defined for you theme.

### .description Files

...


### Using Theme Options

...

### Using Theme Presets

...

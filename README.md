# <img width="250px" src="docs/logo.png" title="Poodle Search" alt="Poodle Search">

A demo site to show off some features of Lunr 2... ...or more than that coming!

<img width="250px" src="docs/icon.png" title="Poodle Search" alt="Poodle Search">

Data of every IPFS/.eth site shall be indexed and made searchable by Lunr.

## Features

* Search term highlighting
* More advances query capabilities
* Improved searching performance
* Smaller index size

## Usage

This is intended as a demo only for now, and the site itself is quite basic. The source should give some pointers in using Lunr 2, more comprehensive documentation and guides will be made available before the full release of Lunr 2.

This is based in the [moonwalkers](https://github.com/olivernn/moonwalkers/) sample, made by the same creator of [Lunr 2](https://github.com/olivernn/lunr.js).

### Building an Index

In Lunr 2 all search indexes are static and immutable. In this site the index is built ahead of time using the script in `build-index`.

### Searching the Index

The basic search interface is largely unchanged from previous versions of Lunr, the details of searching can be seen in `src/main.js`.

### Highlighting Results

The index includes the positions of all terms, and this data is used by `src/wrapper.js` to highlight search results.

## Building

First, to init/setup, run `npm install` and `sudo apt install rake`.

The build is automated using rake. To re-create the site run `rake` from the project directory, every time you make a modification and want to deploy it.

<img src="docs/logo_full.png" title="Poodle Search" alt="Poodle Search">

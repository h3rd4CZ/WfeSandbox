## About

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Simple FE sandbox / starter solution built originally as helper for MS SharePoint script assets placed on sharepoint pages w/ use of modern web technologies.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Sass][Sass-url]
* [Webpack][Webpack-url]
* [![React][React.js]][React-url]
* [![JQuery][JQuery.com]][JQuery-url]


<!-- GETTING STARTED -->
## Minimal path to awesome

### Prerequisites

Docker OR Local environment with

* npm
  ```sh
  npm install npm@latest -g
  ```
* node
  ```sh
  14.x
  ```
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/h3rd4CZ/WfeSandbox.git
   ```
2. Install NPM packages locally
   ```sh
   npm install
   ```
   OR <br /><br />
3. Use docker file to run in docker
   ```sh
   docker build -t sandbox-app .
   docker run -it --rm --name sandbox-app -v ${pwd}:/usr/src/app -p 3000:3000 sanbox-app  
   ```
4. Build and produce js bundle to dist folder
   ```sh
   npm run build
   ```
5. Start webpack dev server and play
   ```sh
   npm run start
   ```

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Sass]: https://sass-lang.com/assets/img/logos/logo.svg
[React-url]: https://reactjs.org/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Sass-url]: https://sass-lang.com/
[Webpack-url]: https://webpack.js.org/


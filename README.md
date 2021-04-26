# USM Stats UI

Stats UI for USM, FUM and protocol health.

Support for several ecosystems.

[Visit Website](https://usmfum.github.io/USM-Stats/)

## How to deploy

Install dependencies:

`yarn`

Edit the `homepage` key in `package.json` to the url where the project will be hosted:

`"homepage": "https://spicedao.github.io/USM-Stats",`

`"homepage": "https://somestatichost.org/thepath",`

Build the site:

`yarn build`

Then you can simply deploy the files under `build/` to whatever http file host you like:

`scp build/* host:/var/www/scifi-frontend`


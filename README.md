# DA Lab - IC Tool mit React

- [Install Node JS](https://nodejs.org/en/download/)
- npx create-react-app my-react-app
- npm start
- super Page für JavaScript map, reduce, filter https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d

# backend

- für das Applikation wird das db.js file importiert. Dies enthält alle einzelnen .json files als JavaScript Objekt.
- das test_db.js ist eine verkleinerte db mit nur vier texten, wobei auch die texte auf ca. 400 Zeichen gekürzt wurden. Um effiziente Tests durchführen und aufbauen zu können.

# Testing / Unittests mit JEST

- bereits vorinstalliert mit react
- Test files in ../src/tests ablegen
- Bennenung blablabla.test.js dann werden sie erkannt
- Bei Debug Mode create a launch.json file den Debug Jest tests using vscode-jest auswählen

Bei Problemen mit JEST oder JEST auto run (Ampeln werden nicht angezeigt).

- Manueller Start über RUN, DEBUG oder Debug Mode "vscode-jest-tests"
- Neustart von VSCode
- ev. launch.json file löschen und neu erstellen.

# React Components

- in components folder
- rafce --> reactArrowFunctionExportComponent verwenden
- verwendung von material-ui v4 components
- useState mit mobX State Management

# MobX State Management

- in model folder
- ein model für alle Variablen welche geändert werden.

# Funktionen

- function folder
- kleinere Funktionen in helper_function.js
- für grössere Funktionen ein eigenes File erstellen

# index.js

- der <React.StrictMode> wurde aufgrund "findDOMNode is deprecated in StrictMode" Problemen deaktiviert.

# Json Server (nicht verwendet)

npm install -g json-server
json-server --watch _pfad des jsonfiles_ --port 8000

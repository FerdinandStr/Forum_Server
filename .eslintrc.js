//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//INFO: Um EsLint (und Prettier) korrekt einzurichten,
//      müssen nur die entsprechenden Abhängigkeiten installiert werden => npm i
//      VSCode Plugins werden keine benötigt, außer ESLint (solange nicht local auf der Maschine vorhanden)
//
//      Danach werden nur noch, falls erwünscht, die entsprechenen VSCode Settings zum automatischen speichern benötigt:
//      =>  strg+shift+p => nach "settings" suchen => "Preferences: Open Settings (JSON)" auswählen => folgende Config hinzufügen:
//
//      "editor.formatOnSave": true,
//      "eslint.autoFixOnSave": true,
//      "eslint.alwaysShowStatus": true,
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: "@babel/eslint-parser",
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    rules: {
        "no-unused-vars": ["warn"],
        "prettier/prettier": [
            "warn",
            {
                trailingComma: "es5",
                endOfLine: "auto",
            },
        ],
    },
}

# How create a Angular multi-project scaffolding whith workspace, application, library, PWA, SSR, ESLint, Prettier, GIT and IDE (Visual Studio Code) configurtation

by [Marcos Cazaux](https://marcoscazaux.com) · 2023

<br/>
<br/>

## 1 - Pre-requirements

Is mandatory to have installed [Node JS](https://nodejs.org) (recommended >= 16.0.0).

<br/>
<br/>

## 2 - Create a workspace

This guide is valid for a modular Angular project and a standalone Angular project. For a standalone Angular project, is mandatory Angular v16 or later.

<br/>

### 2.a - Options:

"[AngularVersion]" = "14", "15" or "16".

Example= `... @angular/cli@angular/cli@16 ng new ...`

"[DirectoryName]" = "angular-multi-project-scaffolding" or other directory name that you prefer.

Example= `...  --directory=angular-multi-project`

"[StandaloneOption]" = "--standalone" or empty.

Example= `... my-application --standalone`

<br/>

### 2.b - Creating the workspace

Run each of the following commands in a new Terminal window, overriding the options detailed above.

`npx -p @angular/cli@[AngularVersion] ng new my-workspace --no-create-application --directory=[DirectoryName]`

`cd [DirectoryName]`

`ng generate application my-application [StandaloneOption]`

`ng generate library my-library`

<br/>
<br/>

## 3 - Adding PWA to application proyect

In the same Terminal window, run this command:

`ng add @angular/pwa --project my-application`

<br/>
<br/>

## 4 - Adding SSR to application proyect

In the same Terminal window, run this command:

`ng add @nguniversal/express-engine --project my-application`

<br/>
<br/>

## 5 - Adding ESLint to workspace and proyects (application and library)

In the same Terminal window, run this command:

`ng add @angular-eslint/schematics`

`ng g @angular-eslint/schematics:add-eslint-to-project my-application`

`ng g @angular-eslint/schematics:add-eslint-to-project my-library`

<br/>
<br/>

## 6 - Adding Prettier to workspace

<br/>

### 6.1 - Installing Prettier

In the same Terminal window, run this command:

`npm install --save-dev --save-exact prettier`

<br/>

### 6.2 - Setup Prettier

In to workspace root, create a file named `.prettierrc` with this content:

    {
        "arrowParens": "avoid",
        "bracketSameLine": true,
        "bracketSpacing": true,
        "printWidth": 80,
        "semi": true,
        "singleQuote": true,
        "tabWidth": 2,
        "trailingComma": "es5",
        "useTabs": false
    }

<br/>
<br/>

## 7 - GIT attributes setup

In to workspace root, create a file named `.gitattributes` with this content:

    # Auto detect text files and perform LF normalization
    * text=auto eol=lf

<br/>
<br/>

## 8 - IDE (Visual Studio Code) setup

<br/>

### 8.1 - Configuration setup

In workspace root, replace all the content of the `.editorconfig` file with this lines:

    # Editor configuration, see https://editorconfig.org
    root = true

    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    end_of_line = lf
    insert_final_newline = true
    trim_trailing_whitespace = true

    [*.ts]
    quote_type = single

    [*.md]
    insert_final_newline = false
    max_line_length = off
    trim_trailing_whitespace = false

<br/>

### 8.2 - Extensions recommendations

In workspace root, in `.vscode` directory, in `extensions.json` file, add this lines:

    {
    	...,
    	"recommendations": [
    		...,
    		"dbaeumer.vscode-eslint",
    		"deque-systems.vscode-axe-linter",
    		"esbenp.prettier-vscode",
    		"github.vscode-github-actions",
    		"redhat.vscode-xml",
    		"redhat.vscode-yaml",
    		"stylelint.vscode-stylelint",
    		"williamragstad.wr-docthis"
    	]
    }

<br/>

### 8.3 - IDE Settings

In workspace root, in `.vscode` directory, add a file named `settings.json` with this content:

    {
        "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        },
        "editor.formatOnSave": true
        },
        "[typescript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.codeActionsOnSave": [
                "source.organizeImports",
                "source.fixAll.eslint"
                ],
            "editor.formatOnSave": true
        },
        "[json]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": false
            },
            "editor.formatOnSave": true
            },
        "[xml]": {
            "editor.defaultFormatter": "redhat.vscode-xml",
            "editor.formatOnSave": true
            },
        "[yaml]": {
            "editor.defaultFormatter": "redhat.vscode-xml",
            "editor.formatOnSave": true
            },
        "[scss]": {
            "editor.defaultFormatter": "vscode.css-language-features",
            "editor.formatOnSave": true
            },
        "[markdown]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.formatOnSave": true
            },
        "docthis.includeDescriptionTag": true,
        "docthis.inferTypesFromNames": true,
        "docthis.returnsTag": true
    }

<br/>
<br/>

## 9 - Adding formating NPM script

In workspace root, add this line in your `package.json` file:

    "scripts": {
    	...,
    	"format:all": "prettier --write ."
    },

<br/>
<br/>

## 10 - Executing NPM scripts

<br/>

### 10.1 - Formatting all workspace with Prettier

In workspace root, run this command:

`npm run format:all`

<br/>

### 10.2 - Linting all workspace with ESLint

In workspace root, run this command:

`ng lint`

<br/>
<br/>

## 11 - Enjoy! 🥳

---

by [Marcos Cazaux](https://marcoscazaux.com) · 2023

# How create a multi-project scaffolding with your workspace, application, library, PWA, SSR, ESLint, Prettier, GIT and IDE (Visual Studio Code) configuration in Angular 13, 14 or 15

by [Marcos Cazaux](https://marcoscazaux.com) · 2023

<br/>
<br/>

## 1 - Pre-requirements

Is mandatory to have installed [Node JS](https://nodejs.org/en/download/releases). I recommend ^16.14.0 <17.

No need to have Angular CLI and/or TypeScript globally installed, in fact, I do not recommend it.

<br/>
<br/>

## 2 - Creating the workspace

This guide is valid for a modular Angular project. For a standalone Angular project, is mandatory Angular 16 or later.

<br/>

### 2.1 - Options:

"[AngularVersion]" = "13", "14" or "15".

Example= `... @angular/cli@angular/cli@15 ng new ...`

"[DirectoryName]" = "angular-multi-project-scaffolding" or other directory name that you prefer.

Example= `...  --directory=angular-multi-project`

<br/>

### 2.2 - Creating the workspace

Run each of the following commands in a new Terminal window, overriding the options listed above.

`npx -p @angular/cli@[AngularVersion] ng new my-workspace --no-create-application --directory=[DirectoryName]`

`cd [DirectoryName]`

`ng generate application my-application`

`ng generate library my-library`

<br/>
<br/>

## 3 - Adding PWA to application project

In the same Terminal window, run this command:

`ng add @angular/pwa --project my-application`

<br/>
<br/>

## 4 - Adding SSR to application project

In the same Terminal window, run this command:

`ng add @nguniversal/express-engine --project my-application`

<br/>
<br/>

## 5 - Adding ESLint to the entire workspace

<br/>

### 5.1 - Installing ESLint

In the same Terminal window, run this command:

`ng add @angular-eslint/schematics`

`ng g @angular-eslint/schematics:add-eslint-to-project my-application`

`ng g @angular-eslint/schematics:add-eslint-to-project my-library`

<br/>

### 5.2 - Adapting the ESLint setting

In your workspace, you have three `.eslintrc.json` files, one in to workspace directory, the second in to application project directory and the latest, in to library project directory.

This architecture is based in the extension of rules and properties. I recommend change the standard content following this examples:

- [Workspace ESLint rules](.eslintrc.json)

- [Application project ESLint rules](projects\my-application.eslintrc.json)

- [Library project ESLint rules](projects\my-library.eslintrc.json)

<br/>
<br/>

## 6 - Adding Prettier to workspace

<br/>

### 6.1 - Installing Prettier

In the same Terminal window, run this command:

`npm install --save-dev --save-exact prettier`

<br/>

### 6.2 - Setting up Prettier

In to workspace root directory, create a file named `.prettierrc` with this content:

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

## 7 - Setting up GIT attributes

In to workspace root directory, create a file named `.gitattributes` with this content:

    # Auto detect text files and perform LF normalization
    * text=auto eol=lf

<br/>
<br/>

## 8 - Setting up IDE (Visual Studio Code)

<br/>

### 8.1 - Setting up editor

In to workspace root directory, replace all the content of the `.editorconfig` file with this lines:

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

### 8.2 - Setting up extensions recommendations

In to `.vscode` directory, in to `extensions.json` file, add this recommendations:

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

### 8.3 - Setting up IDE settings

In to `.vscode` directory, add a file named `settings.json` with this content:

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

## 9 - Adding an NPM script for workspace formatting

In to workspace root directory, add this line in your `package.json` file:

    ...
    "scripts": {
        ...,
        "formatting:workspace": "prettier --write ."
    },
    ...

<br/>
<br/>

## 10 - Running the NPM scripts

<br/>

### 10.1 - Format the entire workspace with Prettier

In to workspace root directory, run this command:

`npm run formatting:workspace`

<br/>

### 10.2 - Lint the entire workspace with ESLint

In to workspace root directory, run this command:

`ng lint`

<br/>
<br/>

## 11 - Enjoy! 🥳

<br/>
<br/>

> <br/>
>
> NOTES:
>
> You can check and copy the content
>
> of all files in this
>
> [repository](./)
>
> <br/>

<br/>
<br/>

---

by [Marcos Cazaux](https://marcoscazaux.com) · 2023

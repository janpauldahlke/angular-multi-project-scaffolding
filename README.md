# How create an Angular Multi-Project scaffolding with the workspace, your application, library, PWA, SSR, ESLint, Stylelint, Prettier, GIT and IDE (Visual Studio Code) configuration in Angular 12, 13, 14, 15 or 16.

by [Marcos Cazaux](https://marcoscazaux.com) · JUN 2023

<br/>
<br/>

## 1. Pre-requirements

See the following list of recommended by me of Node JS versions for the version of Angular you decide to use in your workspace:

- Angular >=12 <=13
  - NodeJS ^14.15.0

<br/>

- Angular >=14 <=15
  - NodeJS ^16.14.0

<br/>

- Angular >=16 <17
  - NodeJS ^18.10.0

<br/>

Install the correct [Node JS](https://nodejs.org/en/download/releases) version.

<br/>

> No need to have Angular CLI and/or TypeScript globally installed, in fact, I don't recommend it.

<br/>
<br/>

## 2. Creating the workspace

> You can change the Angular version (12, 13, 14, 15 or 16) and the directory name that you prefer.
>
> - Options:
>
>   - AngularCLI version: "12", "13", "14", "15" or "16".
>     - Example= `npx -p @angular/cli@15 ...`
>   - Styles: "css", "scss", "sass"or "less".
>     - Example= `... --style=scss ...`
>   - Directory name: "angular-multi-project-scaffolding" or other directory name that you prefer to create the workspace.
>     - Example= `...  --directory=angular-multi-project-scaffolding`

<br/>

Run this commands in a Terminal window opened in the directory that you prefer to create the workspace:

`npx -p @angular/cli@16 ng new my-workspace --no-create-application --directory=angular-multi-project-scaffolding`

`cd angular-multi-project-scaffolding`

<br/>
<br/>

## 3. Setting up GIT attributes

GIT Attributes is a configuration that allows you to assign attributes to other files and directories in your repository, thus telling Git how to treat them.

In to workspace root directory, create a file named [.gitattributes](.gitattributes) with this content:

```
# Auto detect text files and perform LF normalization
* text=auto eol=lf
```

<br/>
<br/>

## 4. Setting up generic IDEs

Editor Config is a configuration file compatible with several IDEs (development environments) which allows us to share the project configuration between team members with different editors.

In to workspace root directory, replace all the content of the [.editorconfig](.editorconfig) file with this lines:

```
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

<br/>
<br/>

## 5. Adding ESLint to workspace

### 5.1 - Installing ESLint NPM dependences

In a Terminal window, in the workspace root directory, run this command:

`ng add @angular-eslint/schematics`

This command does three things, it installs all dependencies, creates a [.eslintrc.json](.eslintrc.json) file with the **Global ESLint properties and rules** for the entire workspace in the root directory and add the next property to the [.angular.json](.angular.json) file.

```
{
  ...
  "cli": {
    "schematicCollections": [
      "@angular-eslint/schematics"
    ]
  }
}
```

This last action sets ESLint as the default linter of the workspace. When we will create a new project, application or library type, this will have ESLint configured too and a **Specific ESLint properties and rules** file will be create in your root directory.

<br/>

### 5.2 Adding an NPM script to lint entire workspace

In to workspace root directory, add this line in your [package.json](package.json) file:

```
{
  ...
  "scripts": {
    ...
    "eslint:fix": "ng lint --fix"
  },
}
```

<br/>
<br/>

## 6. Adding Stylelint to workspace

### 6.1 - Installing Stylelint NPM dependences

In a Terminal window, in the workspace root directory, run this command:

`npm install stylelint stylelint-config-standard-scss --save-dev`

<br/>

### 6.2 - Setting up Stylelint

In to workspace root directory, create a new file named [.stylelintrc.json](.stylelintrc.json) with the this content:

```
{
  "extends": ["stylelint-config-standard-scss"]
}
```

<br/>

### 6.3 - Adding an NPM script to lint entire workspace

In to workspace root directory, add this line in your [package.json](package.json) file:

```
{
  ...
  "scripts": {
    ...
    "stylelint:fix": "stylelint \"**/*.scss\" --fix"
  },
}
```

<br/>
<br/>

## 7. Adding Prettier to workspace

### 7.1 - Installing Prettier

In a Terminal window, in the workspace root directory, run this command:

`npm install prettier --save-dev`

<br/>

### 7.2 - Setting up Prettier

In to workspace root directory, create two new files. The first named [.prettierignore](.prettierignore) with the same content of [.gitignore](.gitignore). The second file, name it [.prettierrc](.prettierrc) with the next content:

```
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
```

<br/>

### 7.3 - Setting up Prettier as an ESLint plugin

Prettier and ESLint have different opinions about style and code formatting. For fix this situation, we need to run Prettier as an ESLint plugin installing three dependencies. This way we can run `ng lint --fix` command and ESLint will fix bugs but also format the code.

In a Terminal window, in the workspace root directory, run this commands:

`npm install prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev`

Change the [.eslintrc.json](.eslintrc.json) file content to include Prettier Plugin `plugin:prettier/recommended` in TS and HTML file types, for example:

```
{
  ...
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "extends": [
        ...
        "plugin:prettier/recommended"
      ],
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        ...
        "plugin:prettier/recommended"
      ],
      "rules": {
        ...
        "prettier/prettier": [
          "error",
          { "parser": "angular" }
        ]
      }
    }
  ]
}
```

<br/>

### 7.4 - Adding an NPM script to format entire workspace

In to workspace root directory, add this line in your [package.json](package.json) file:

```
{
  ...
  "scripts": {
    ...
    "prettier:fix": "prettier --write ."
  },
}
```

<br/>
<br/>

## 8. Setting up Visual Studio Code (VSC)

When we edit a file, we want to format it before saving it. To do this, we will configure Visual Studio Code (VSC).

<br/>

### 8.1 - Install Visual Studio Code (VSC) extensions

Install this pair of extensions, [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

<br/>

### 8.2 - Adding extensions recommendations

In to `.vscode` directory, in to [extensions.json](.vscode/extensions.json) file, add as extensions recommended the extensions previously installed:

```
{
  ...
  "recommendations": [
    ...
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint"
  ]
}
```

<br/>

### 8.3 - Setting up Visual Studio Code (VSC) configuration

In to `.vscode` directory, add a file named [settings.json](.vscode/settings.json) with this content:

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
}
```

<br/>
<br/>

## 9. Creating an application project

> - Options:
>
>   - Styles: "css", "scss", "sass"or "less".
>     - Example= `... --style=scss ...`
>   - Standalone default (Angular 16 workspace, only): "--standalone" or nothing.
>     - Example= `...  --standalone`

<br/>

In a Terminal window, in the workspace root directory, run this command:

`ng generate application my-application --style=scss --standalone`

<br/>

> You can add one or more application projects to your workspace by running the above command for each app project you want to have, renaming the project (`my-application`).

<br/>
<br/>

## 10. Creating a library project

In a Terminal window, in the workspace root directory, run this command:

`ng generate library my-library`

<br/>

> You can add one or more library projects to your workspace by running the above command for each app project you want to have, renaming the project (`my-library`).

<br/>
<br/>

## 11. Adding PWA to application project

In a Terminal window, in the workspace root directory, run this command:

`ng add @angular/pwa --project my-application`

<br/>

> You can add PWA to each application project you want by running the above command, changing the project name (`my-application`).

<br/>
<br/>

## 12. Adding SSR to application project

In a Terminal window, in the workspace root directory, run this command:

`ng add @nguniversal/express-engine --project my-application`

<br/>

> You can add SSR to each application project you want by running the above command, changing the project name (`my-application`).

<br/>
<br/>

## 13. Adding an NPM script to lint and format (ESLint, Prettier and Stylelint) entire workspace

In to workspace root directory, add this line in your [package.json](package.json) file:

```
{
  ...
  "scripts": {
    ...
    "cleancode": "npm run prettier:fix && npm run stylelint:fix && npm run eslint:fix"
  },
}
```

In to workspace root directory, run this command:

`npm run cleancode`

If you get an error like this or similar:

```
stylelint "**/*.scss" --fix


projects/my-application/src/app/app.component.scss
 1:1  ✖  Unexpected empty source  no-empty-source

1 problem (1 error, 0 warnings)


Linting "my-library"...

...angular-multi-project-scaffolding\projects\my-library\src\lib\my-library.service.ts
  7:17  error  Unexpected empty constructor  @typescript-eslint/no-empty-function

✖ 1 problem (1 error, 0 warnings)

Lint errors found in the listed files.

```

Don't worry, everything is fine!

Now, you have to manually fix this error because Stylelint, EsLint or Prettier can't do it automatically, but it notifies to you.

<br/>
<br/>

## 14 - Enjoy! 🥳

> NOTES:
>
> You can check and copy the content of all files in this [repository](./)

<br/>
<br/>

---

by [Marcos Cazaux](https://marcoscazaux.com) · 2023

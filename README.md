# OriCommJS_Components

![Static Badge](https://img.shields.io/badge/License-Mulan_PSL_v2-_)
![Static Badge](https://img.shields.io/badge/Framework-OriCommJS_1.1.2-_)
![GitHub Release](https://img.shields.io/github/v/release/wkloh76/oricommjs_components)

This is a user playground for users to design web servers, desktop applications, and non-GUI applications. It is a sub-framework of the OriCommJS framework and must work with OriCommJS.

## Objective

- Splitly project repository, allowing users to easily clone and apply to the OriCommJS framework.
- The OriCommJS framework allows multiple OriCommJS_Components project folders to exist within framework components. Meaning the user can choose to combine several OriCommJS_Components projects into a single service within a framework, or combine a single OriCommJS_Components project with a single framework.
- Not encourge direcly import third party node module such from npm,yarn npx and etc to this components. User should build their modules which allow import the third party node modules.
- Mainly the concept of modular design management, which is the responsibility of Atomic Domain. The main task of the component side is to call functions directly from atomic and engine.

## Startup

### Setup

1. Download the project and copy to oricommjs->components folder.
2. Rename the project and add prefix show as below:

   - `app_` for non-GUI application.
   - `web_` for web application.
   - `desktop_` for desktop application.

3. For web server design,copy [web.toml.example][coresetting-web] file and rename to `coresetting.toml`.

4. For desktop application design,copy [desktop.toml.example][coresetting-desktop] file and rename to `coresetting.toml`.

### Start coding

1. Web server and desktop coding, please start your into startup,common,api,gui,rules folders.
   - startup - Initialize such as db connection,data import/export,backend service.
   - common/models - The code in here allow to directlly apply from gui,api and rules.
   - api - Handle all web api request and will render data in text,json and etc.
   - gui - Handle browser request and will render html statement if success.
   - rules - Define for pre and post process for api and gui.

# Notice

- All url name will start from components naming,second from folder naming (inside gui and api folder) and continue with controller naming. Example: gui/testapi/index.js the url should be `/oricommjs_components/testapi/test`.

# Status

- Web server -- tested with webnodejs.
- Desktop Application -- not finish yet

# License

OriCommJS_Components is freely distributable under the terms of the [Mulan PSL v2 license][license-url].

[license-url]: License
[coresetting-web]: web.toml.example
[coresetting-desktop]: desktop.toml.example

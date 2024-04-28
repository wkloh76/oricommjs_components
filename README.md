# OriCommJS_Components

![Static Badge](https://img.shields.io/badge/License-Mulan_PSL_v2-_)
![Static Badge](https://img.shields.io/badge/Framework-OriCommJS_1.0.1-_)
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

3. copy `default.json.example` file and rename to `default.json` and enter the default url.

4. For web server design,copy `coresetting.toml.example.web` file and rename to `coresetting.toml` The content show as below:

```
[webnodejs]
[webnodejs.parser]
json = { limit = "1mb" }
urlencoded = { limit = "1mb", extended = true, parameterLimit = 2000 }
raw = { limit = "10mb" }
text = { limit = "1mb" }

[webnodejs.session]
secret = "WKLOH"
path = "/index"
httpOnly = true
resave = false
saveUninitialized = false
cookie = { secure = false, maxAge = 1800000 }

[webnodejs.helmet]
contentSecurityPolicy = { directives = { "script-src" = [
  "'self'",
  "example.com",
] } }

[production]
remote = { cdn = "" }
[debug]
remote = { cdn = "" }
```

5. For desktop application design,copy `coresetting.toml.example.desktop` file and rename to `coresetting.toml` The content show as below:

```
[window]
title = ""
icon = "link.png"
toolbar = true
frame = true
width = 1280
height = 720
fullscreen = false
resizetomonitor = false
resizemonitorwidth = 50
resizemonitorheight = 100
resizable = true
min_width = 800
min_height = 640
max_width = 1366
max_height = 2160
openDevTools = true
position = "center"
autoHideMenuBar = false
useContentSize = true
nodeIntegration = false
contextIsolation = true
webSecurity = true
enableRemoteModule = false
show = false
url = ""
page = ""
el = "localapi"

[production]
remote = { cdn = "" }
[debug]
remote = { cdn = "" }

```

# Status

- Web server -- tested with webnodejs.
- Desktop Application -- not finish yet

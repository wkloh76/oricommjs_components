# OriCommJS_Components

- This is a user playground for users to design web servers, desktop applications and system back-end services.

## Objective

- Splitly project repository, allowing users to easily clone and apply to the OriCommJS framework.
- The OriCommJS framework allows multiple OriCommJS_Components project folders to exist within framework components. Meaning the user can choose to combine several OriCommJS_Components projects into a single service within a framework, or combine a single OriCommJS_Components project with a single framework.
- Not encourge direcly import third party node module such from npm,yarn npx and etc to this components. User should build their modules which allow import the third party node modules.
- Mainly the concept of modular design management, which is the responsibility of Atomic Domain. The main task of the component side is to call functions directly from atomic and engine.

## Reference

- `Electron handle cors` - https://pratikpc.medium.com/bypassing-cors-with-electron-ab7eaf331605

## Startup

1. For web server design,copy data as below and paste to your local coresetting.toml.

```
  [webbackend]
[webbackend.parser]
json = { limit = "1mb" }
urlencoded = { limit = "1mb", extended = true, parameterLimit = 2000 }
raw = { limit = "10mb" }
text = { limit = "1mb" }

[webbackend.session]
secret = "testing"
path = "/index"
httpOnly = true
resave = false
saveUninitialized = false
cookie = { secure = false, maxAge = 1800000 }

[webbackend.helmet]
contentSecurityPolicy = { directives = { "script-src" = [
  "'self'",
  "example.com",
] } }
```

2. For desktop application design,copy data as below and paste to your local coresetting.toml.

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
```

2. Set the first url show to the application, rename `src/default.json.example` to `src/default.json` and enter the url.

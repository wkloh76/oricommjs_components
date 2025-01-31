# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.5] - 2024-12-09

### Summary

- Work with framework OriCommJS 1.1.7 and above.

### Added

### Changed

### Deprecated

### Removed
- Remove examples code from the project. Completed on 2025-01-14
### Fixed

### Security

[1.1.5]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.1.5


## [1.1.4] - 2024-08-26

### Summary

- Work with framework OriCommJS 1.1.6 and above.

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

[1.1.4]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.1.4

## [1.1.3] - 2024-07-26

### Summary

- Work with framework OriCommJS 1.1.4 and above.

### Added

- Redefine atomic frontend share and pulbic assets share and keeping method. Completed on 2024-07-30
- Add checkpoint, content,filepath properties to setting share for less external file in `index.js`. Completed on 2024-07-30

### Changed

- Update both `desktop.toml.exmaple` and `web.toml.example` setting. Completed on 2024-07-26
- Update example which support guimaker module in atomic/atom. Completed on 2024-08-26

### Deprecated

### Removed

### Fixed

### Security

[1.1.3]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.1.3

## [1.1.2] - 2024-07-23

### Summary

- Work with framework OriCommJS 1.1.3 and above.

### Added

- Redefine coresetting.ongoing which will independently base on it own toml file. Completed on 2024-07-24

### Changed

- Change the `coresetting.toml` no longer to use for components project setting. It will base on the engine type name. Example: `web_testing`, the setting filename will be `web.toml` and `desktop_test` the setting file will be `desktop.toml`. Completed on 2024-07-24

### Deprecated

### Removed

### Fixed

### Security

[1.1.2]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.1.2

## [1.1.1] - 2024-07-02

### Summary

- Work with framework OriCommJS 1.1.2 and above.
- Target work with deskelectronJS engine

### Added

### Changed

- Update example in startup/sqlite. Completed on 2024-07-02

### Deprecated

### Removed

### Fixed

### Security

[1.1.1]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.1.1

## [1.1.0] - 2024-06-10

### Summary

- Work with framework OriCommJS 1.1.1 and above.

### Added

- Add new key `viewspath` into `components[name].common` when import common module to components global variable at `index.js`. Completed on 2024-06-27
- Implement new method to declare controller in strict,nostrict or none rule for both gui and api. The involve change `src/gui/index.js`,`src/api/index.js` and `src/rules/index.js`. Completed on 2024-06-27

### Changed

- Update example in startup/sqlite. Completed on 2024-06-10
- Change public file share defination method in array type which will support multi components defination. Completed on 2024-07-22

### Deprecated

### Removed

### Fixed

### Security

[1.1.0]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.1.0

## [1.0.9] - 2024-05-27

### Summary

- Work with framework OriCommJS 1.1.0 and above.
- Add new rule properties suitable for webnodejs engine in api/index.js and gui/index.js to provide robust handling in rule checking. Complete on 2024-06-06

### Added

### Changed

- Chnage load module sequence to rules, api, gui in in `index.js`. Completed on 2024-06-06

### Deprecated

### Removed

### Fixed

- Fix bug in `index.js` when common/models import modules unrecognized files cause system crash. Completed on 2024-05-27

### Security

[1.0.9]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.9

## [1.0.8] - 2024-05-25

### Summary

- Work with framework OriCommJS 1.0.9 and above.

### Added

### Changed

- Update example and encourage apply await response.inspector function into the gui,api,app and common/model. Completed on 2024-05-25
- Update example and show how to call function from `common/models`. Completed on 2024-05-25

### Deprecated

### Removed

### Fixed

- Fix bug in `index.js` where is the common modules be empty object issue. Completed on 2024-05-25

### Security

[1.0.8]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.8

## [1.0.7] - 2024-05-16

### Summary

- Work with framework OriCommJS 1.0.8 and above.

### Added

- Add `defaulturl` into both example `coreseeting.toml` at production and debug area. Completed on 2024-05-16
- Create startup module to src the job scope is initial something im components side before the entire system ready. Completed on 2024-05-24

### Changed

- Rename the `src/services` folder name to `src/app` and the modules inside only can proceed with app engine. Completed on 2024-05-24
- Alter `index.js` init load `src` modules method base on engine defination. Completed on 2024-05-24

### Deprecated

### Removed

- Remove `default.json` file and the oricommjs engine will get `defaulturl` from `coreseeting.toml`. Completed on 2024-05-16

### Fixed

### Security

[1.0.7]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.7

## [1.0.6] - 2024-05-09

### Summary

- Work with framework OriCommJS 1.0.7 and above.

### Added

- Update example with file upload from client and save to locally. Completed on 2024-05-11
- Update both example `coreseeting.toml`. Completed on 2024-05-11

### Changed

### Deprecated

### Removed

### Fixed

### Security

[1.0.6]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.6

## [1.0.5] - 2024-05-06

### Summary

- Work with framework OriCommJS 1.0.5 and above.

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

[1.0.5]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.5

## [1.0.4] - 2024-05-04

### Summary

- Work with framework OriCommJS 1.0.5 and above.

### Added

- Add new example. Completed on 2024-05-06

### Changed

- Update example. Completed on 2024-05-04

### Deprecated

### Removed

- Remove unused comment from `index.js`. Completed on 2024-05-06

### Fixed

### Security

[1.0.4]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.4

## [1.0.3] - 2024-05-02

### Summary

- Work with framework OriCommJS 1.0.4 and above. Completed on 2024-05-02

### Added

- Add a render main page if `default.json` assign the url. Completed on 2024-05-02

### Changed

### Deprecated

### Removed

### Fixed

### Security

[1.0.3]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.3

## [1.0.2] - 2024-04-28

### Summary

### Added

### Changed

- Update example and only can apply to OriCommJS 1.0.1 and 1.0.2. Completed on 2024-04-29
- Update example only can apply to OriCommJS 1.0.3 and above. Completed on 2024-05-01

### Deprecated

### Removed

- Remove `preload.js` from public->assets>js folder. Completed on 2024-04-28

### Fixed

### Security

[1.0.2]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.2

## [1.0.1] - 2024-04-27

### Summary

- Only can apply to OriCommJS/components 1.0.1 and above.

### Added

- Add `rule.json` file to rules folder. Completed on 2024-04-27

### Changed

- Update the example code. Completed on 2024-04-27
- Update `coresetting.toml.example.web`. Completed on 2024-04-27
- Update `coresetting.toml.example.desktop`. Completed on 2024-04-27

### Deprecated

### Removed

- Remove some file from common vies folder. Completed on 2024-04-27

### Fixed

- Fix bug `pattern` function at `index.js`. Completed on 2024-04-27

### Security

[1.0.1]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.1

## [1.0.0] - 2024-04-14

### Summary

- Only can apply to OriCommJS/components 1.0.0 and above.

### Added

- Create sample package.json.example which allow user self install node modules to components. Completed on 2024-04-22
- Return coresetting after init from index.js done. Completed on 2024-04-25

### Changed

- Move code from `src/index.js` to `index.js` to reduce a js file. Completed on 2024-04-22
- Move `src/coresetting.toml.example` to parent folder. Completed on 2024-04-22
- Change `src/coresetting.toml.example` to parent folder. Completed on 2024-04-22
- Change the design in `init,prepare_rules` functions in `index.js`. Completed on 2024-04-22
- Apply newer `mergeDeep` function into `init` functions in `index.js`. Completed on 2024-04-23

### Deprecated

### Removed

- Delete `src/index.js`. Completed on 2024-04-23

### Fixed

### Security

[1.0.0]: https://github.com/wkloh76/oricommjs_components/releases/tag/1.0.0

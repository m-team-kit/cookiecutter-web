# Changelog

## [1.2.0] - 2024-12-09

### Added
- Ability to create github issue report for a particulare template via frontend
- Disable input fields if not logged in
- Frontend: build with pnpm
- Backend Docker warning

### Changed
- README is updated
- Rename docker-compose.yml to compose.yml

### Fixed
- improve error legibility and reporting
- URL color for creating a github issue

### Removed

## [1.0.2] - 2024-09-26

### Changed
- Actualize EC logo and the funding message
- Upgrade backend version to 1.0.2
- Use cookiecuter fork which implements [PR#1829](https://github.com/cookiecutter/cookiecutter/pull/1829) to propagate errors from pre/post-gen hook(s) to the FailedHookException message

### Fixed
- Exclude trailing dot from URL

## [1.0.1] - 2024-07-16

### Added
- Installation of DVC via backend requirements

### Changed
- Update backend to latest version

### Fixed
- Handle axioserror response data being blob
- Make error messages scroll horizontally if too long

## [1.0.0] - 2024-02-22

### Added
- Show template tags
- Filtering templates by tags
- Templates sorting
- Allow to rate templates
- Display basic star rating
- URLs in templates are shown as clickable links
- Temlates are now added via dedicated GitHub repository
- Link to the templates repo
- Ability to provide an icon/image to represent template
- Accepted updates in the templates GitHub repository are automatically propagated to the running service
- Ability to deploy only Frontend
- Option to deploy with a subset of templates based on tags

### Changed
- Refactor frontend
- New page design
- Update AUP, Privacy policy, SCC name
- Backend is completely re-written and hosted in another repository
- Backend version is X.Y.Z

### Fixed
- Names of docker-compose files in README
- Replace old react-query with tanstack query
- Replace old index with templates page
- lint config

### Removed
- credentials for nginx as we use traefik
- DEEP-HDC links
- webpage top banner

## [0.5.0] - 2023-06-28

_Initial release._

Initial release of the templates service with only DEEP/AI4EOSC templates (no option to easily add new templates, as what and how templates are loaded, is configured in the code).

### Added
- Frontend in next.js
- Backend in python
- Deployed via docker-compose
- Reverse proxy is traefik
- Only DEEP/AI4EOSC templates are added

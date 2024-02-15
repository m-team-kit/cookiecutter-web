# Changelog

## [1.0.0] - 2024-02-15

### Added
- Tags to select templates
- Display basic star rating
- Allow to rate templates
- Templates sorting
- Ability to deploy only Frontend
- Option to deploy with a subset of templates based on the tag

### Changed
- Refactor frontend
- New page design
- Temlates are now added via dedicated GitHub repository
- Link to the templates repo
- Update AUP, Privacy policy, SCC name
- Backend is completely re-written and hosted in another repository

### Fixed
- Names of docker-compose files in README
- Replace old react-query with tanstack query
- Replace old index with templates page
- lint config

### Removed
- credentials for nginx as we use traefik

## [0.5.0] - 2023-06-28

_Initial release._

Initial release of the templates service with only DEEP/AI4EOSC templates (no option to easily add new templates, as what and how templates are loaded, is configured in the code).

### Added:
- Frontend in next.js
- Backend in python
- Deployed via docker-compose
- Reverse proxy is traefik
- Only DEEP/AI4EOSC templates are added

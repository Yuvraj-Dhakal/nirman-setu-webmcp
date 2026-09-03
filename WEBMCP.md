# NirmanSetu — WebMCP Challenge Implementation

## What was added for the WebMCP Challenge

NirmanSetu is an existing public-infrastructure monitoring frontend. The WebMCP challenge extension adds agent-native, read-only access to project information through the WebMCP Imperative API.

### Registered tools

- `search_projects` — search projects by text, status, location, or type.
- `get_project_details` — retrieve detailed project information by project ID.
- `find_delayed_projects` — identify delayed projects, optionally by location.
- `get_project_risk` — retrieve AI-monitoring risk indicators for a project.

The implementation is in:

`src/webmcp/projectTools.js`

Tools are registered from `src/main.jsx` using:

`document.modelContext.registerTool(...)`

## Human + agent workflow

A WebMCP-aware agent can ask:

> Find all delayed infrastructure projects.

The agent can call `find_delayed_projects`.

It can then ask:

> Give me the details and risk assessment for project 3.

The agent can call `get_project_details` and `get_project_risk`.

All challenge tools are read-only. They do not create, update, or delete project records.

## Testing

Run:

```bash
npm install
npm run dev
```

Then open the site in a WebMCP-capable environment. Chrome's WebMCP documentation describes the Imperative API and the supported testing environments.

## Pre-existing vs challenge work

The NirmanSetu dashboard, project management UI, AI Monitor UI, reports UI, routing, and initial Spring Boot integration existed before the WebMCP challenge work.

The WebMCP registration layer and the four agent-facing project tools are the challenge-specific extension.

Use the repository's timestamped Git history to document the actual dates of these changes. Do not alter historical timestamps.

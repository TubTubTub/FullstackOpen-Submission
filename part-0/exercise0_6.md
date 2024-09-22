```mermaid
sequenceDiagram
  participant browser
  participant server
  
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_app
  activate server
  server-->>browser: 201 created
  deactivate server
```
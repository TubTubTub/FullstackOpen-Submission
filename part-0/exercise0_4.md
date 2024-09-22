```mermaid
sequenceDiagram
  participant browser
  participant server
  
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes 
  activate server
  server-->>browser: [{ "data": (new note data...) }]
  deactivate server
```
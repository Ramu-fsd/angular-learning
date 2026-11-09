# File upload and download

Multipart upload with Angular:

```ts
const formData = new FormData();
formData.append('document', file);

this.http.post('/api/documents', formData);
```

Do not manually set the multipart `Content-Type`; the browser supplies the boundary.

Spring Boot endpoint shape:

```java
@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<?> upload(@RequestPart("document") MultipartFile document) {
    // Validate size, type, authorization, and content before storage.
    return ResponseEntity.accepted().build();
}
```

Production checklist:
- Enforce maximum size at gateway and application layers.
- Validate content signatures, not only filename extensions or browser MIME values.
- Generate server-side storage names.
- Store outside executable web roots.
- Scan files where required.
- Authorize upload and download independently.
- Avoid exposing internal storage paths.

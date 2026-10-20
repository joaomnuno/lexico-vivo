# Hosted pronunciation clips

The optional Azure Speech integration generates a short MP3 when an expression is played for the first time. Subsequent plays reuse the saved clip. It uses the native REST API and browser audio player; no SDK or new runtime package is required.

## Enable

Create an Azure Speech resource, then set these **server-side** environment variables in Coolify:

```dotenv
AZURE_SPEECH_KEY=your-resource-key
AZURE_SPEECH_REGION=westeurope
```

Use the region of your own resource, which may differ from the example. Keep the key out of browser variables and Git. The Compose file forwards these variables to the application. Restart/redeploy after setting them; no source changes are needed. Azure may charge for synthesis according to your resource's plan; no account, resource or billable request was created during implementation.

Voices are explicitly selected: `pt-PT-RaquelNeural` for Portugal and `pt-BR-FranciscaNeural` for Brazil. See Microsoft's [voice support](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=text-to-speech) and [REST API](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-text-to-speech).

## Storage and requests

- Clips default to `audio/` beside the SQLite database: `/app/storage/audio` in the container, already covered by the persistent volume. `AUDIO_CACHE_DIR` can override this directory.
- The cache key includes the exact text, voice and format. Corrections to a headword generate a new clip. Identical headwords share a clip.
- `GET /api/audio/SLUG?variant=pt-PT` serves MP3 for an existing dictionary entry only. There is no endpoint that synthesizes arbitrary visitor text.
- Concurrent requests for the same clip share one generation. At most two different clips are generated concurrently; extra uncached requests return HTTP 429. Cached clips do not consume generation slots.
- Provider calls time out after 15 seconds. Errors are not cached as audio. Keys and provider error bodies are not returned to visitors.
- With no key configured, the interface retains exact-variant browser speech synthesis. With hosted audio configured, playback uses the server's clips, regardless of installed browser voices.

Automated tests mock the provider to verify the exact voice, SSML escaping, concurrent request deduplication, durable caching, and provider failure handling. Live generation and pronunciation quality still need checking with your resource key.

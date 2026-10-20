# Deploy to Coolify

The project uses vinext's Node production server, not a Cloudflare target. This follows the [vinext Node deployment documentation](https://github.com/cloudflare/vinext). Coolship was inspected locally with `--help`, `init --help`, and `doctor --format json`; the installed CLI is authenticated, but this repository has no application binding. No remote resources were created or deployed.

## Recommended: Docker Compose

The checked-in `compose.yaml` builds the Dockerfile and persists SQLite in `lexico-data`. In Coolify, use the Docker Compose build pack, select `compose.yaml`, and assign a domain to the `lexico` service on port **3000**.

Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin, for example `https://lexico.example.com`. This value is read on the server at runtime for metadata and sitemap URLs. Keep `DATABASE_URL=file:/app/storage/lexico.db`.

If creating the Coolify app with [Coolship](https://coolship.itrocas.com/docs/commands/init), the concrete command is:

```sh
coolship init \
  --build-pack dockercompose \
  --compose-file compose.yaml \
  --compose-domain lexico=https://YOUR_DOMAIN \
  --name lexico-vivo
```

Coolship reads the Git origin and current branch, checks the source, and asks for the server/project/environment and source credentials where needed. For a private repository, select the GitHub App or deploy key that has access. Push the application commit to the configured remote before deployment. `coolship init` creates and links an application; it does not deploy without `--deploy`.

After creation:

```sh
coolship env diff --help
coolship domain
coolship deploy
coolship status
coolship logs
```

Set the canonical origin in Coolify's environment settings before the first deployment, or use `coolship env push` after inspecting its help and checking the diff. Keep credentials in Coolship's credential store, never in the repository. Coolship writes the real identifiers to `coolship.toml`; no placeholder binding is committed.

## Alternative: Dockerfile build pack

Choose the root Dockerfile, set the application port to 3000, and add persistent storage mounted at `/app/storage`. Mount storage before the first boot. Set `NEXT_PUBLIC_SITE_URL` to the public origin.

```sh
coolship init --build-pack dockerfile --dockerfile Dockerfile --port 3000 --name lexico-vivo
```

Do not use a static build pack: dictionary queries, contributions and votes need the Node server.

## Startup and health

The image starts as an unprivileged `node` user. The application startup applies `prisma migrate deploy`, imports 7,241 records if the database is empty, then starts vinext. Normal redeployments preserve editorial changes and do not reimport the original data.

`GET /api/health` checks the database and returns `{"status":"ok","entries":7241}` on a fresh import. Docker's health check waits up to 90 seconds for first-start migrations/import and then runs every 30 seconds. Configure the same health endpoint in Coolify.

SQLite supports this small reference corpus in a single container. Run one application replica and use local persistent storage. A multi-replica deployment would need a shared database and a corresponding Prisma adapter change.

## Backups and updates

Back up the database volume with SQLite's online backup mechanism or stop the application briefly and copy the full volume. Copying only the live `.db` file can miss WAL transactions. Store backups outside the container and test restore procedures. Never delete the volume as part of a redeployment.

To moderate inside a container:

```sh
docker compose exec lexico npm run moderate -- list
docker compose exec lexico npm run moderate -- approve CONTRIBUTION_ID
```

For upgrades, build a new image, keep the volume, and let startup apply new committed migrations. Review the dependency findings documented in the root README when updating vinext.

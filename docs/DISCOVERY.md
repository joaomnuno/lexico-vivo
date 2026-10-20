# Discovery sections

“Vale a pena conhecer” selects entries from the database rather than a fixed list of headwords. The selection changes daily (UTC) and stays stable across refreshes for the same corpus and options. Entries need a nonblank definition; duplicate normalized headwords and the daily highlight's variants are excluded.

Use the server component `components/discovery-section.tsx` to add a module:

```tsx
<DiscoverySection count={3} excludeIds={[day.id]} />

<DiscoverySection
  id="regional-discoveries"
  title="Expressões do Norte"
  count={6}
  region="norte"
  kind="expression"
/>
```

Use a unique `id` when rendering multiple sections. `title`, `count`, `region`, `kind`, and `excludeIds` are optional. Region IDs and kinds must match the dictionary data. The dictionary link retains the module's region/type filters. Smaller eligible pools produce fewer cards; empty pools hide the section. The optional `date` seed supports reproducible previews and tests.

Selection lives in the pure `selectDiscovery` function in `lib/discovery.ts`; `featured(options)` in `lib/dictionary.ts` loads the corpus. The selector ranks eligible entries by a hash of date and slug, then selects distinct headwords. This is automatic discovery, not editorial endorsement or a popularity ranking. Adjacent days may share individual entries. Source changes can change the selection during the day.

Configuration is currently through component props in code, not an administration UI.

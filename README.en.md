# dsh-model-modalities

简体中文 | [English](README.en.md)

A browser-only DSH plugin that adds a "Model input modalities" section to the settings page, letting you **declare per-model input modalities (text / image)** across every provider route. Checking "image input" lets that model receive screenshot and image attachments. Removable, no official file is modified.

## The problem it solves

Whether a model in DSH can receive images depends on its `input` field declaring `image`. Models under custom (openai-completions-style) routes default to `text` only — hence "this model clearly supports multimodal, yet sending an image fails".

This plugin turns that into a row of checkboxes in the settings page:

- Lists every model grouped by provider route (both the user-layer custom list and the catalog-inherited list are shown);
- One row per model: model id, source badge (custom / catalog-inherited), current modality badge (text only / image + text), and an "image input" checkbox;
- Checking a box writes `input: ["text","image"]` into that model's user-layer config through the official settings write path (a catalog-inherited model first materializes its user-layer list, then the write lands);
- Read-only sessions (non-writable) are disabled and say so.

## Install

```bash
dsh plugin --profile web add -w dsh-model-modalities
```

Manual equivalent: place the package at `<DSH_HOME>/profiles/node_modules/dsh-model-modalities/` and add a row to `cordis.patch.yml`:

```yaml
- insert:
    - id: model-modalities
      name: 'dsh-model-modalities'
```

## Uninstall

Delete the insert row. Browser-only: a hard refresh removes the section.

## Implementation notes

- Zero-render host carrier + browser `lib/client.js` registering an additive settings section (`settings.section` slot);
- Reads the official shared settings mirror (`settingsScope.describe()`); writes go through `ctx.remote.settings.mutate` path ops with revision conflict handling (`settings/conflict` → retry prompt);
- **Compatibility shim**: `api.settings.mutate` had a single-object signature on 0.1.1 and positional arguments on 0.1.5 — the plugin calls with 0.1.5 positional arguments first and only falls back to the object form when the error looks like an arity/validation mismatch, so a genuine write failure is never misjudged and double-written;
- The modality vocabulary is `text` and `image` only (current engine scope); audio/video need upstream engine support;
- Client-side requires: `react` / `react/jsx-runtime` / `@deepseek-ai/dsh-client-store` (all within the platform baseline table).

## Known boundaries

- Only the user-layer `input` declaration is written; the provider route itself is untouched, and the catalog layer (the model list declared by official packages) is shown read-only.
- Relies on the official settings service namespace `llm-pi-ai` and the describe/mutate contracts; after a DSH upgrade, check those first if the settings page misbehaves.

## Compatibility

- DeepSeek Harness `0.1.5-rc.1` (web profile, browser side; includes the 0.1.1→0.1.5 signature shim)

## License

MIT

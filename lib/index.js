// dsh-model-modalities: host-side no-op carrier.
// The capability is browser-only; the loader row must exist host-side for the
// client-modules scan to pick up the package's `dsh.client` declaration, so
// this file is intentionally empty of behavior.
export const name = "dsh-model-modalities";
export function apply() {
  // no host behavior
}

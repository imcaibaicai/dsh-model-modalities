window.__ModuleLoader__.load({
	id: "dsh-model-modalities",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		// Peer modules resolved through the browser module table (all shipped by the web profile).
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let createSnapshotStore = require("@deepseek-ai/dsh-client-store").createSnapshotStore;
		// #region styles
		// Package-owned stylesheet: one <style> tag, keyed by package+module so a
		// hot reload replaces rather than duplicates it. Class names are prefixed
		// (dmm-) so they can never collide with shipped CSS-module hashes.
		const css = `
.dmm-section{max-width:760px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:12px;display:flex}
.dmm-title{color:var(--dsw-alias-label-primary);margin:0;font-size:16px;font-weight:500;line-height:24px}
.dmm-intro{color:var(--dsw-alias-label-tertiary);margin:0;font-size:14px;line-height:22px}
.dmm-notice{color:var(--dsw-alias-state-warn-label);margin:0;font-size:12px;line-height:18px}
.dmm-error{color:var(--dsw-alias-state-error-primary);margin:0;font-size:13px;line-height:20px}
.dmm-saved{color:var(--dsw-alias-state-success-primary);margin:0;font-size:12px;line-height:18px}
.dmm-loading{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;margin:0}
.dmm-rows{flex-direction:column;gap:8px;margin:12px 0 0;padding:0;list-style:none;display:flex}
.dmm-routeName{color:var(--dsw-alias-label-secondary);margin:0;font-size:12px;font-weight:600;line-height:18px}
.dmm-routeMeta{color:var(--dsw-alias-label-tertiary);margin:0 0 4px;font-size:12px;line-height:18px}
.dmm-card{border:1px solid var(--dsw-alias-border-l2);border-radius:12px;flex-direction:column;gap:8px;padding:10px 14px;display:flex}
.dmm-row{align-items:center;gap:10px;display:flex}
.dmm-modelId{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--dsw-font-family)}
.dmm-modelName{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--dsw-font-family)}
.dmm-field{margin-left:auto;flex:none;align-items:center;gap:6px;display:inline-flex;cursor:pointer}
.dmm-field input{accent-color:var(--dsw-alias-accent-primary,var(--dsw-alias-button-primary-fill));cursor:pointer}
.dmm-fieldText{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}
.dmm-badge{flex:none;border-radius:999px;padding:0 8px;font-size:11px;line-height:18px;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary)}
.dmm-badge-custom{color:var(--dsw-alias-state-success-primary);border-color:currentColor}
.dmm-badge-inherit{color:var(--dsw-alias-label-tertiary)}
.dmm-empty{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;margin:0}
.dmm-button{box-sizing:border-box;height:32px;font:inherit;cursor:pointer;border:none;border-radius:16px;justify-content:center;align-items:center;gap:4px;padding:0 12px;font-size:13px;line-height:20px;display:inline-flex;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}
.dmm-button:disabled{opacity:.6;cursor:default}
.dmm-button-secondary{background:transparent;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary)}
.dmm-toolbar{align-items:center;gap:10px;margin:4px 0 0;display:flex}
.dmm-hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
`;
		const styleTagId = "dsh-model-modalities/styles";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(styleTagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-model-modalities";
			tag.dataset.pluginCss = styleTagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		// #endregion
		// #region locale
		const NS = "modelModalities";
		const zh = {
			"nav": "模型输入能力",
			"title": "模型输入能力",
			"intro": "逐模型声明该模型接受哪些输入模态。当前引擎（DSH 0.1.5）的模态词表为 text 与 image；勾选「图片输入」后该模型即可接收截图/图片附件。音频与视频输入需要上游引擎扩展，本版本暂不可用。",
			"sourceCustom": "自定义",
			"sourceInherit": "目录继承",
			"inheritHint": "以下提供方的模型清单来自安装目录；在此勾选会自动把该提供方的模型列表自定义化，再写入所选模态。",
			"readOnly": "当前为只读会话，无法保存。",
			"empty": "没有可配置的模型。请在「模型」页添加自定义模型，或在配置文件声明 models 后回到这里。",
			"image": "图片输入",
			"textOnlyBadge": "纯文本",
			"imageBadge": "图片+文本",
			"saveFailed": "保存失败：{message}",
			"saved": "已保存：{provider} / {model}",
			"conflict": "设置已被其它窗口修改，已重新载入，请重试。",
			"loadFailed": "载入失败：{message}",
			"retry": "重试",
			"current": "当前：{m}"
		};
		const en = {
			"nav": "Model Input",
			"title": "Model input modalities",
			"intro": "Declare which input modalities each model accepts. The current engine (DSH 0.1.5) supports text and image only; enabling “image input” lets that model receive screenshots and image attachments. Audio and video input need upstream engine support and are unavailable in this release.",
			"sourceCustom": "custom",
			"sourceInherit": "catalog",
			"inheritHint": "Providers below serve their model list from the installed catalog. Checking here will materialize that provider's model list, then write the chosen modality.",
			"readOnly": "This session is read-only; changes cannot be saved.",
			"empty": "Nothing configurable yet. Add a custom provider on the Models page, or declare models in your config, then return here.",
			"image": "Image input",
			"textOnlyBadge": "text only",
			"imageBadge": "image + text",
			"saveFailed": "Failed to save: {message}",
			"saved": "Saved: {provider} / {model}",
			"conflict": "Settings changed in another window; reloaded — please retry.",
			"loadFailed": "Failed to load: {message}",
			"retry": "Retry",
			"current": "current: {m}"
		};
		// #endregion
		// #region helpers
		function messageOf(error) {
			return error instanceof Error ? error.message : String(error);
		}
		/** The stored user-layer model list for a route, or undefined when the user has not overridden it. */
		function storedModelsOf(namespaceRow, route) {
			const user = namespaceRow === void 0 ? void 0 : namespaceRow.user;
			if (typeof user !== "object" || user === null) return void 0;
			const providers = user.providers;
			if (typeof providers !== "object" || providers === null) return void 0;
			const profile = providers[route];
			if (typeof profile !== "object" || profile === null) return void 0;
			const models = profile.models;
			return Array.isArray(models) ? models : void 0;
		}
		/** The effective (value-layer) model list for a route, or undefined when the route is inert. */
		function valueModelsOf(namespaceRow, route) {
			const value = namespaceRow === void 0 ? void 0 : namespaceRow.value;
			if (typeof value !== "object" || value === null) return void 0;
			const providers = value.providers;
			if (typeof providers !== "object" || providers === null) return void 0;
			const profile = providers[route];
			if (typeof profile !== "object" || profile === null) return void 0;
			const models = profile.models;
			return Array.isArray(models) ? models : void 0;
		}
		/** The catalog (base-layer) model list for a route, or undefined when the catalog has no list. */
		function catalogModelsOf(namespaceRow, route) {
			const base = namespaceRow === void 0 ? void 0 : namespaceRow.base;
			if (typeof base !== "object" || base === null) return void 0;
			const providers = base.providers;
			if (typeof providers !== "object" || providers === null) return void 0;
			const profile = providers[route];
			if (typeof profile !== "object" || profile === null) return void 0;
			const models = profile.models;
			return Array.isArray(models) ? models : void 0;
		}
		/** Normalize a declared `input` array to the modal names it names (text/image only). */
		function normInput(input) {
			if (!Array.isArray(input)) return null;
			const set = [];
			for (const m of input) {
				if (typeof m !== "string") continue;
				if (m === "text" || m === "image") set.push(m);
			}
			return set.length > 0 ? set : null;
		}
		/** True when the declared input names image. */
		function hasImage(input) {
			const n = normInput(input);
			return n !== null && n.indexOf("image") !== -1;
		}
		/** Resolve a route's model list by id across layers, returning the first that declares `input`. */
		function resolveModelInput(route, id, namespaceRow) {
			const catalog = catalogModelsOf(namespaceRow, route);
			if (Array.isArray(catalog)) {
				for (const m of catalog) {
					if (m !== null && typeof m === "object" && m.id === id) {
						const n = normInput(m.input);
						if (n !== null) return { input: n, from: "catalog" };
					}
				}
			}
			const value = valueModelsOf(namespaceRow, route);
			if (Array.isArray(value)) {
				for (const m of value) {
					if (m !== null && typeof m === "object" && m.id === id) {
						const n = normInput(m.input);
						if (n !== null) return { input: n, from: "value" };
					}
				}
			}
			return null;
		}
		// #endregion
		// #region store
		/**
		* Minimal controller mirroring the shipped Models page: read the shared
		* settings mirror, subscribe to its pushes, and expose a uSES-safe snapshot
		* of editable rows. Unlike the original, it surfaces EVERY provider route
		* that the schema knows, and marks each model as user-customized (its input
		* can be toggled) or catalog-inherited (base layer, shown but only editable
		* once materialized). Writes go through api.settings.mutate path ops.
		*/
		/**
		 * 设置写入兼容垫片（签名在 0.1.1 → 0.1.5 之间变过）：
		 *   对象形式: mutate({ ns, ops, expectedRevision })
		 *   位置参数: mutate(ns, ops, expectedRevision)   （0.1.5 现行，remote.settings）
		 * 策略：先按 0.1.5 的位置参数调用；仅当报错看起来是「参数/校验不匹配」时
		 * 才回退对象形式（避免真实写入失败被误判重试而双写）。其余错误原样返回。
		 * 返回统一为 { ok: true, value } 或 { ok: false, error: { code, message } }。
		 */
		async function settingsMutateCompat(api, ns, ops, expectedRevision) {
			const looksLikeArityError = (err) => {
				const m = String((err && err.message) || err);
				return /parameter|argument|schema|expected|not a string|must be|invalid/i.test(m);
			};
			let raw;
			try {
				raw = await api.settings.mutate(ns, ops, expectedRevision);
			} catch (e1) {
				if (!looksLikeArityError(e1)) {
					return { ok: false, error: { code: "error", message: String((e1 && e1.message) || e1) } };
				}
				try {
					raw = await api.settings.mutate({ ns, ops, expectedRevision });
				} catch (e2) {
					return { ok: false, error: { code: "error", message: String((e2 && e2.message) || e2) } };
				}
			}
			// 归一化：0.1.5 的 { ok, value } / { ok, error } 直通；
			// 0.1.1 的 { result: { ok, error } } 信封拆封；其余视为成功快照。
			if (raw && typeof raw.ok === "boolean") return raw;
			if (raw && raw.result && typeof raw.result.ok === "boolean") return raw.result;
			if (raw && raw.error && typeof raw.error === "object" && raw.error.code) return { ok: false, error: raw.error };
			return { ok: true, value: raw };
		}
		var ModalityController = class {
			api;
			describeFace;
			following;
			store = createSnapshotStore({
				status: "idle",
				writable: false,
				rows: [],
				revision: 0,
				error: null
			});
			constructor(api, describeFace) {
				this.api = api;
				this.describeFace = describeFace;
			}
			async load() {
				this.following ??= this.describeFace.subscribe(() => {
					this.derive();
				});
				this.store.update((state) => {
					state.status = "loading";
					state.error = null;
				});
				await this.describeFace.ensure();
				this.derive();
			}
			derive() {
				const mirrored = this.describeFace.getSnapshot();
				if (mirrored.view === void 0) {
					if (mirrored.error !== null) this.store.update((state) => {
						state.status = "error";
						state.error = mirrored.error;
					});
					return;
				}
				const view = mirrored.view;
				const namespace = (view.namespaces ?? []).find((row) => row.ns === "llm-pi-ai");
				const rows = [];
				if (namespace !== void 0) {
					const effective = namespace.value;
					const providers = (typeof effective === "object" && effective !== null && typeof effective.providers === "object" && effective.providers !== null) ? effective.providers : {};
					for (const [route, profile] of Object.entries(providers)) {
						if (typeof profile !== "object" || profile === null) continue;
						const stored = storedModelsOf(namespace, route);
						const valueModels = valueModelsOf(namespace, route);
						const catalogModels = catalogModelsOf(namespace, route);
						// The set of model ids to show: value layer (user materialized) if present,
						// else catalog layer. When the user has overridden, use their list; else use the
						// catalog so inherited models are visible and editable-then-materialized.
						let modelCandidate = stored;
						if (modelCandidate === void 0 && valueModels !== void 0 && valueModels.length > 0) modelCandidate = valueModels;
						if (modelCandidate === void 0) modelCandidate = catalogModels;
						if (!Array.isArray(modelCandidate)) continue;
						modelCandidate.forEach((model, index) => {
							if (typeof model !== "object" || model === null) return;
							const id = typeof model.id === "string" ? model.id : "";
							if (id.length === 0) return;
							const inherited = stored === void 0;
							const resolved = resolveModelInput(route, id, namespace);
							const current = resolved !== null ? resolved.input : (inherited && catalogModels !== void 0 ? ["text"] : ["text"]);
							const name = typeof model.name === "string" && model.name.length > 0 ? model.name : id;
							rows.push({
								route,
								index,
								id,
								name,
								image: hasImage(current),
								current: current,
								inherited
							});
						});
					}
				}
				this.store.update((state) => {
					state.status = "ready";
					state.writable = view.writable === true;
					state.rows = rows;
					state.revision = namespace === void 0 ? 0 : namespace.revision;
					state.error = null;
				});
			}
			/**
			* Flip one model's image input and write the explicit input array through
			* the settings wire. Materializes the provider's models list when the
			* model was catalog-inherited, so the write lands in the user layer.
			* @param route - provider route key.
			* @param index - model index inside the target models array.
			* @param image - desired image support.
			* @returns success, or an error string for the UI.
			*/
			async toggle(route, index, image) {
				const current = this.store.getSnapshot();
				if (current.status !== "ready" || !current.writable) return "readOnly";
				try {
					const value = image ? ["text", "image"] : ["text"];
					const result = await settingsMutateCompat(this.api, "llm-pi-ai", [{
						op: "set",
						path: ["providers", route, "models", String(index), "input"],
						value
					}], current.revision);
					if (!result.ok) {
						if (result.error && (result.error.code === "settings/conflict" || result.error.code === "settings-conflict")) return "conflict";
						return (result.error && result.error.message) || "unknown";
					}
					await this.load();
					return void 0;
				} catch (error) {
					return messageOf(error);
				}
			}
			dispose() {
				this.following?.();
				this.following = void 0;
			}
		};
		// #endregion
		// #region component
		function ModalitiesSection(props) {
			const { controller, useSnapshot, api, t } = props;
			if (controller === void 0 || useSnapshot === void 0 || api === void 0 || t === void 0) return null;
			return (0, react_jsx_runtime.jsx)(Loaded, { injected: {
				controller,
				useSnapshot,
				api,
				t
			} });
		}
		function Loaded({ injected }) {
			const { controller, api, t } = injected;
			const state = injected.useSnapshot((snapshot) => snapshot);
			const [busyKey, setBusyKey] = (0, react.useState)(void 0);
			const [failure, setFailure] = (0, react.useState)(void 0);
			const [saved, setSaved] = (0, react.useState)(void 0);
			if (state.status === "idle") controller.load();
			if (state.status === "loading" || state.status === "idle") return (0, react_jsx_runtime.jsx)("div", {
				className: "dmm-section",
				children: (0, react_jsx_runtime.jsx)("p", {
					className: "dmm-loading",
					children: "…"
				})
			});
			if (state.status === "error") {
				const text = (state.error ?? "").toString();
				return (0, react_jsx_runtime.jsxs)("div", {
					className: "dmm-section",
					children: [(0, react_jsx_runtime.jsx)("h2", {
						className: "dmm-title",
						children: t("title")
					}), (0, react_jsx_runtime.jsx)("p", {
						className: "dmm-error",
						children: t("loadFailed", { message: text })
					}), (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: "dmm-button",
						onClick: () => {
							controller.load();
						},
						children: t("retry")
					})]
				});
			}
			const toggle = async (route, index) => {
				const key = `${route}:${String(index)}`;
				setBusyKey(key);
				setFailure(void 0);
				setSaved(void 0);
				const row = state.rows.find((candidate) => candidate.route === route && candidate.index === index);
				const error = await controller.toggle(route, index, row !== void 0 ? !row.image : true);
				if (error !== void 0) setFailure(t(error === "conflict" ? "conflict" : "saveFailed", { message: error === "conflict" ? "" : error }));
				else if (row !== void 0) setSaved(t("saved", { provider: route, model: row.name }));
				setBusyKey(void 0);
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: "dmm-section",
				children: [
					(0, react_jsx_runtime.jsx)("h2", {
						className: "dmm-title",
						children: t("title")
					}),
					(0, react_jsx_runtime.jsx)("p", {
						className: "dmm-intro",
						children: t("intro")
					}),
					!state.writable ? (0, react_jsx_runtime.jsx)("p", {
						className: "dmm-notice",
						children: t("readOnly")
					}) : null,
					failure !== void 0 ? (0, react_jsx_runtime.jsx)("p", {
						className: "dmm-error",
						role: "alert",
						children: failure
					}) : null,
					saved !== void 0 ? (0, react_jsx_runtime.jsx)("p", {
						className: "dmm-saved",
						role: "status",
						"aria-live": "polite",
						children: saved
					}) : null,
					state.rows.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
						className: "dmm-empty",
						children: t("empty")
					}) : (0, react_jsx_runtime.jsxs)("ul", {
						className: "dmm-rows",
						children: groupByRoute(state.rows).map((group) => (0, react_jsx_runtime.jsxs)("li", {
							children: [
								(0, react_jsx_runtime.jsx)("p", {
									className: "dmm-routeName",
									children: group.route
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: "dmm-card",
									children: group.models.map((row) => {
										const key = `${row.route}:${String(row.index)}`;
										const busy = busyKey === key;
										return (0, react_jsx_runtime.jsxs)("div", {
											className: "dmm-row",
											children: [
												(0, react_jsx_runtime.jsxs)("div", {
													style: { minWidth: 0, flex: 1 },
													children: [
														(0, react_jsx_runtime.jsxs)("div", {
															style: { display: "flex", alignItems: "center", gap: 8 },
															children: [
																(0, react_jsx_runtime.jsx)("span", {
																	className: "dmm-modelId",
																	children: row.id
																}),
																(0, react_jsx_runtime.jsx)("span", {
																	className: "dmm-badge " + (row.inherited ? "dmm-badge-inherit" : "dmm-badge-custom"),
																	children: row.inherited ? t("sourceInherit") : t("sourceCustom")
																})
															]
														}),
														(0, react_jsx_runtime.jsx)("div", {
															className: "dmm-modelName",
															children: row.name !== row.id ? row.name : t("current", { m: row.image ? t("imageBadge") : t("textOnlyBadge") })
														})
													]
												}),
												(0, react_jsx_runtime.jsxs)("label", {
													className: "dmm-field",
													children: [
														(0, react_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: row.image,
															disabled: !state.writable || busy,
															onChange: () => {
																toggle(row.route, row.index);
															}
														}),
														(0, react_jsx_runtime.jsx)("span", {
															className: "dmm-fieldText",
															children: t("image")
														})
													]
												})
											]
										}, key);
									})
								})
							]
						}, group.route))
					}),
				]
			});
		}
		/** Group editable rows by provider route, preserving stored order. */
		function groupByRoute(rows) {
			const groups = [];
			const byRoute = /* @__PURE__ */ new Map();
			for (const row of rows) {
				let group = byRoute.get(row.route);
				if (group === void 0) {
					group = { route: row.route, models: [] };
					byRoute.set(row.route, group);
					groups.push(group);
				}
				group.models.push(row);
			}
			return groups;
		}
		// #endregion
		// #region plugin
		const inject = [
			"slots",
			"locale",
			"remote.settings",
			"settingsScope"
		];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "model-modalities: dictionaries");
		// 0.1.5 settings write face: ctx.remote.settings.mutate(ns, ops, expectedRevision).
		// (0.1.1 exposed the same calls under connection.api; that face is gone.)
		const settingsApi = {
			settings: {
				mutate: (ns, ops, expectedRevision) => ctx.remote.settings.mutate(ns, ops, expectedRevision)
			}
		};
		const controller = new ModalityController(settingsApi, ctx.settingsScope.describe());
			const t = ctx.locale.bind(NS);
			const injected = () => ({
				controller,
				hooks: { snapshot: controller.store },
			api: settingsApi,
				t
			});
			ctx.effect(() => () => {
				controller.dispose();
			}, "model-modalities: disposal");
			controller.load();
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "model-modalities",
				order: 20,
				label: () => t("nav"),
				locale: NS,
				inject: injected
			}, ModalitiesSection));
		}
		exports.ModalitiesSection = ModalitiesSection;
		exports.ModalityController = ModalityController;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

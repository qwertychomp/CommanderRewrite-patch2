import storage from "./localStorage";
import rammerheadSearch from "./rammerheadEncode";
import Proxies from "./swProxyEncode";
import RegisterSW from "./swRegister";

export default function () {
	window.onload = async () => {
		await RegisterSW();

		const parent = document.getElementById("selectables-parent");
		const selectableDivs = parent.querySelectorAll("#selectable");
		const input = document.querySelector("input");
		let selectedDiv = null;

		selectableDivs.forEach(div => {
			div.addEventListener("click", () => {
				selectableDivs.forEach(otherDiv => {
					otherDiv.classList.remove("selected");
				});
				div.classList.add("selected");
				selectedDiv = div;
				if (
					selectedDiv
						.querySelector("div")
						.classList.toString()
						.includes("ultraviolet")
				) {
					storage.set("proxy", "ultraviolet");
				} else if (
					selectedDiv
						.querySelector("div")
						.classList.toString()
						.includes("rammerhead")
				) {
					storage.set("proxy", "rammerhead");
				} else if (
					selectedDiv
						.querySelector("div")
						.classList.toString()
						.includes("meteor")
				) {
					storage.set("proxy", "meteor");
				}
			});
		});

		document.addEventListener("click", e => {
			// @ts-ignore
			if (e.target !== parent && !parent.contains(e.target)) {
				if (selectedDiv) {
					selectedDiv.classList.remove("selected");
					selectedDiv = null;
				}
			}
		});

		if (storage.get("proxy") === "rammerhead") {
			// @ts-ignore
			document
				.querySelector("div[class^=\"bg-[url('/img/rammerhead.png')]\"]")
				// @ts-expect-error
				.click();
		} else if (storage.get("proxy") === "ultraviolet") {
			// @ts-ignore
			document
				.querySelector("div[class^=\"bg-[url('/img/ultraviolet.png')]\"]")
				// @ts-expect-error
				.click();
		} else if (storage.get("proxy") === "meteor") {
			document
				.querySelector("div[class^=\"bg-[url('/img/meteor.png')]\"]")
				// @ts-expect-error
				.click();
		} else {
			// @ts-ignore
			document
				.querySelector("div[class^=\"bg-[url('/img/ultraviolet.png')]\"]")
				// @ts-expect-error
				.click();
		}

		input.oninput = () => {
			const sw = new Proxies();

			input.onkeydown = async e => {
				if (e.key === "Enter") {
					if (!input.value) alert("Please provide a valid URL or search term");

					const bottom = document.getElementById("bottom-container");
					const nav = document.getElementById("top");

					const iframe = document.createElement("iframe");
					iframe.src = "about:blank";
					iframe.style.setProperty("display", "none");
					iframe.style.width = "100%";
					iframe.style.height = "100%";
					bottom.appendChild(iframe);

					const proxy = storage.get("proxy");
					input.parentElement.style.display = "none";
					iframe.style.setProperty("display", "inline");

					if (
						// @ts-ignore
						input.value.trim().startsWith("http://") ||
						// @ts-ignore
						input.value
							.trim()
							.startsWith("https://")
					) {
						if (proxy === "rammerhead") {
							// @ts-ignore
							iframe.contentWindow.location.href =
								// @ts-ignore
								origin + (await rammerheadSearch(input.value));
						} else if (proxy === "ultraviolet") {
							// @ts-ignore
							iframe.contentWindow.location.href =
								// @ts-ignore
								origin + (await sw.encodeUltraviolet(input.value));
						} else if (proxy === "meteor") {
							// @ts-ignore
							iframe.contentWindow.location.href =
								// @ts-ignore
								origin + (await sw.encodeMeteor(input.value));
						} else {
							// @ts-ignore
							iframe.contentWindow.location.href =
								// @ts-ignore
								origin + (await sw.encodeScramjet(input.value));
						}
					} else {
						if (proxy === "rammerhead") {
							// @ts-ignore
							iframe.contentWindow.location.href =
								origin +
								(await rammerheadSearch(
									"https://duckduckgo.com/?q=%s"
										// @ts-ignore
										.replace("%s", input.value),
								));
						} else if (proxy === "ultraviolet") {
							// @ts-ignore
							iframe.contentWindow.location.href =
								origin +
								(await sw.encodeUltraviolet(
									"https://duckduckgo.com/?q=%s"
										// @ts-ignore
										.replace("%s", input.value),
								));
						} else if (proxy === "meteor") {
							// @ts-ignore
							iframe.contentWindow.location.href =
								origin +
								(await sw.encodeMeteor(
									"https://duckduckgo.com/?q=%s"
										// @ts-ignore
										.replace("%s", input.value),
								));
						} else {
							// @ts-ignore
							iframe.contentWindow.location.href =
								origin +
								(await sw.encodeScramjet(
									"https://duckduckgo.com/?q=%s"
										// @ts-ignore
										.replace("%s", input.value),
								));
						}
					}
				}
			};
		};
	};
}
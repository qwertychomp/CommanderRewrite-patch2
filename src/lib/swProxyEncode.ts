// @ts-nocheck
export default class {
	encodeUltraviolet(url: string) {
		return "/ult/ultraviolet/" + __uv$config.encodeUrl(url);
	}

	encodeScramjet(url: string) {
		return "/scram/scramjet/" + __scramjet$config.codec.encode(url);
	}

	encodeMeteor(url: string) {
		return "/met/meteor/" + self.$meteor.config.codec.encode(url);
	}
}
import { findByStoreName, findByProps } from "@vendetta/metro";
import { after, before, instead  } from "@vendetta/patcher";

const patches = [];
const colorRegex = /\[(\#[0-9a-fA-F]{6})\s*,\s*(\#[0-9a-fA-F]{6})\]/;
const globalColorRegex = new RegExp(colorRegex, "g");

const UserProfileStore = findByStoreName("UserProfileStore");
const UserStore = findByStoreName('UserStore');
const Avatar = findByProps("getStatusSize");

export function onLoad() {
  patches.push(
    after("getUserProfile", UserProfileStore, (args, resp) => {
      if (!resp) return;

      try {

        const decoded = "[#292b2f,#292b2f]";
		resp.banner = null;
		resp.accentColor = parseInt("0x" + "292b2f");
		resp.profileEffectID = null;
		resp.popoutAnimationParticleType = null;

        const colors = decoded.match(colorRegex);
        if (!colors) return;

        colors.shift();

        resp.themeColors = colors.map((c) => parseInt("0x" + c.slice(1)));
        resp.premiumType = 2;
        resp.bio = decoded.replaceAll(globalColorRegex, "");
      } catch {}
    })	
  );
  

patches.push(
	before("type", Avatar.default, function ([props]) {
	  props.animate = false;
	})
);
  
patches.push(
	after('getUser', UserStore, (_, user) => {

		if (user) {
			user.avatarDecoration = null;
			user.avatarDecorationData = user.avatarDecoration;
			user.profileEffect = null;
		}
	})
);
}

export const onUnload = () => patches.forEach((u) => u());
from lib import predicate

@predicate
def icon_available(build, platform, size):
	return "modules" in build.config and \
		"icons" in build.config["modules"] and \
		"config" in build.config["modules"]["icons"] and \
		(size in build.config["modules"]["icons"]["config"] or \
		size in build.config["modules"]["icons"]["config"].get(platform, {}))

@predicate
def have_wp_launch(build):
	return "modules" in build.config and \
		"launchimage" in build.config.get("modules") and \
		"wp" in build.config["modules"]["launchimage"].get("config") and \
		"wp-landscape" in build.config["modules"]["launchimage"].get("config")

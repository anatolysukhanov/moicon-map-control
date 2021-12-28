<?php

namespace app\config;


/**
 * The security configuration.
 */
abstract class security
{
	public static function get($projectRootDir, $environment)
	{
		return [
			/**
			 * Blocks direct access to the given page regexes.
			 *
			 * A page for example is /test or /errors/404.
			 *
			 * It is important that you don't run any unescaped _param values in any exposed pages.
			 * If you do, an attacker could create a URL with <script></script> in the parameter, which will run javascript code, which will have access to the user's cookies and such.
			 * This means that a simple link could have devastating results for the user that clicks on it.
			 * Because of that, you have to blacklist every page that doesn't have every single printed _param value escaped (escaped like "{{_param.test|e}}" for example) (pages such as templates, widgets, etc).
			 */
			'url_blacklist' => [
			]
		];
	}
}

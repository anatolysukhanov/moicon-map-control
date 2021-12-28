<?php

namespace app\config;


/**
 * The URLs of error pages.
 *
 * Error pages '401', '404' and '500' are required, adding custom error pages is possible as well.
 *
 * Error pages can be used with framework.parseErrorPage(), framework.renderErrorPage() and framework.openErrorPage().
 *
 * This data can be accessed in javascript and twig as: framework.errorpages
 */
abstract class errorpages
{
	public static function get($projectRootDir, $environment)
	{
		return [
			'401' => '/errors/401',
			'404' => '/errors/404',
			'500' => '/errors/500'
		];
	}
}

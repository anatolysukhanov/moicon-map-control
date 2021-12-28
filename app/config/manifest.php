<?php

namespace app\config;


/**
 * The manifest for the website, used to make your website a Progressive Web App.
 *
 * Can also be used to add your own configuration keys/values.
 *
 * This data can be accessed in javascript and twig as: framework.config
 */
abstract class manifest
{
	public static function get($projectRootDir, $environment)
	{
		return [
			'short_name' => 'Map Control',
			'name' => 'Moicon Map Control',
			
			'display' => 'fullscreen', // 'standalone' is also possible, that will show the battery, the time, etc at the top of the screen
			'orientation' => 'portrait',
			
			'background_color' => '#FFFFFF',
			'theme_color' => '#FFFFFF',
			
			'start_url' => './' . (($environment === 'prod') ? '?' : 'index_dev.php?') . '/', // you might want to change '/' to a path that skips your landing page
			'scope' => './',
			
			'icons' => [
				[
					'src' => 'resources/img/favicon/android-chrome-192x192.png',
					'type' => 'image/png',
					'sizes' => '192x192',
				],
				[
					'src' => 'resources/img/favicon/android-chrome-512x512.png',
					'type' => 'image/png',
					'sizes' => '512x512',
				],
			],
		];
	}
}

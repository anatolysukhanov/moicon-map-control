<?php

namespace app\config;


/**
 * Additional assets you want to include in your website.
 *
 * Can be used to add assets from plugins, libraries, etc.
 *
 * The assets will be treated as if they are actually physically there.
 */
abstract class assets
{
	public static function get($projectRootDir, $environment)
	{
		return [
			'resources' => [
				'/libs/js/reactgooglemaps-api.js' => $projectRootDir . '/vendor/npm-asset/react-google-maps--api/dist/reactgooglemapsapi.umd.production.min.js',
				'/libs/js/reactgooglemaps-infobox.js' => $projectRootDir . '/vendor/npm-asset/react-google-maps--infobox/dist/infobox.umd.production.min.js',
				'/libs/js/reactgooglemaps-clusterer.js' => $projectRootDir . '/vendor/npm-asset/react-google-maps--marker-clusterer/dist/markerclusterer.umd.production.min.js',
			],
			'serviceworker' => [
				// '/some-serviceworker-library.js' => $projectRootDir . '/vendor/library/js/abc.js',
			],
			'tests' => [
				// '/test-abc.js' => $projectRootDir . '/vendor/library/test/abc.js',
			],
			'views' => [
				// '/library/index.html.twig' => $projectRootDir . '/vendor/library/test.html.twig',
			],
			'web' => [
				'/favicon.ico' => $projectRootDir . '/app/resources/img/favicon/favicon.ico',
			],
		];
	}
}

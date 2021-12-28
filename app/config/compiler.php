<?php

namespace app\config;


/**
 * These are the compiler settings.
 */
abstract class compiler
{
	public static function get($projectRootDir, $environment)
	{
		return [
			'index_dev_updater' => [
				// executes a request every [interval] milliseconds to see if any CSS/image/translation changed, and if it did, it will automatically be redownload and injected without refreshing the page
				'enabled' => true,
				'interval' => 1000
			],
			'typescript' => [
				// merges with the typescript config that will be used to generate tsconfig.json, paths are relative to the project root dir
				'compilerOptions' => [
					'lib' => [
						'es2015',
						'dom'
					]
				]
			],
			'version' => [
				// allows you to retrieve the current git commit hash and date in javascript and twig (with framework.version.[key].hash and framework.version.[key].date) from the given git repo's
				// examples:
				//  'app' => $projectRootDir,
				//  'core' => $projectRootDir . '/vendor/lowentry/javascript-framework-core/',
				//  'lebackend' => $projectRootDir . '/vendor/lowentry/backend-javascript/',
			]
		];
	}
}

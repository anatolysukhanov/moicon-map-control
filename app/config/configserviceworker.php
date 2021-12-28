<?php

namespace app\config;


/**
 * The configuration for the service worker.
 *
 * Can also be used to add your own configuration keys/values.
 *
 * This data can be accessed in the service worker as: framework.config
 */
abstract class configserviceworker
{
	public static function get($projectRootDir, $environment)
	{
		return [
//			'something' => 'abc',
//			'etc' => 123,
		];
	}
}

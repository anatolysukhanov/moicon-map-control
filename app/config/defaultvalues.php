<?php

namespace app\config;


/**
 * The default values set in javascript/twig.
 *
 * These values will be used if a value hasn't been set yet or if it has been reset.
 *
 * You can access values with:
 *   Javascript:  framework.values['test']
 *   Javascript:  framework.html.value('test') // returns HTML, similar to the Twig function
 *   Twig:        {{ value('test') }}  or  {% value 'test' %}{{ _value }}{% endvalue %}
 *
 * You can set a value with:
 *   Javascript:  framework.values['test'] = 'value';
 *
 * You can set reset a value back to the default value with:
 *   Javascript:  delete framework.values['test'];
 *
 * You can set a default value with:
 *   Javascript:  framework.defaultvalues['test'
 */
abstract class defaultvalues
{
	public static function get($projectRootDir, $environment)
	{
		return [
			//'test' => 'abcde',
			//'test2' => array('a'=>1, 'b'=>2)
		];
	}
}

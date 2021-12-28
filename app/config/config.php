<?php

namespace app\config;

use LowEntryJavascriptFrameworkCore\System;


/**
 * The configuration of the website.
 *
 * Can also be used to add your own configuration keys/values.
 *
 * This data can be accessed as: framework.config
 */
abstract class config
{
    public static function get($projectRootDir, $environment)
    {
        try {
            $configProd = config_prod::get($projectRootDir, $environment);
        } catch (\Throwable $e) {
            $configProd = [];
        }

        $config = [
            'debug' => false,
            'lebackend' => [
                'serverurl' => LowEntryBackend::PRODUCTION_SERVER,
                'serverid' => '12',
                'servertoken' => 'Id2HHuutpQTNN8w244MXW5ewI9JhdU6dHeellxV8Jf90rzj4VkM9fClhIgMRU6OO',
            ],
            'app' => [
                'pointVisitedDistanceInMeters' => 100,
                'sendingDriverPositionIntervalInSeconds' => 150,
                'sendingDriverPositionClientIntervalInSeconds' => 3,
                'checkingInactiveDriversIntervalInSeconds' => 10,
                'checkingExpiredNotesIntervalInSeconds' => 60,
                'driverPositionIconSize' => 94,
                'headingAnimationSmoothingPerSecond' => 0.3,
                'headingAnimationMaxDegreesPerSecond' => 100,
                'headingAnimationDegreeSteps' => 1,
                'minimumSpeedForHeading' => 3, // meters per second,
                'clickedDriverRouteAnimationStep' => 40,
                'driversPositionAnimationSmoothing' => 1,
                'devicePositionAnimationSmoothing' => 0.2
            ],
            'companyId' => 2,
        ];

        return System::array_merge_recursive_distinct($config, $configProd);
    }
}
